import { coreManager } from '../core/core_manager';
import { eventManager } from '../core/event_manager';
import { UT } from '../core/utils';
import { Gfx3View } from './gfx3_view';
import { Gfx3Texture } from './gfx3_texture';
import { Gfx3StaticGroup, Gfx3DynamicGroup } from './gfx3_group';

export interface VertexSubBuffer {
  vertices: Float32Array;
  offset: number;
  changed: boolean;
};

/**
 * Singleton 3D graphics manager.
 */
class Gfx3Manager {
  adapter: GPUAdapter;
  device: GPUDevice;
  canvas: HTMLCanvasElement;
  ctx: GPUCanvasContext;
  destinationTexture: GPUTexture | null;
  depthTexture: GPUTexture;
  depthView: GPUTextureView;
  commandEncoder: GPUCommandEncoder;
  passEncoder: GPURenderPassEncoder;
  pipelines: Map<string, GPURenderPipeline>;
  vertexBuffer: GPUBuffer;
  vertexSubBuffers: Array<VertexSubBuffer>;
  vertexSubBuffersSize: number;
  views: Array<Gfx3View>;
  currentView: Gfx3View;
  lastRenderStart: number;
  lastRenderTime: number;

  constructor() {
    this.adapter = {} as GPUAdapter;
    this.device = {} as GPUDevice;
    this.canvas = {} as HTMLCanvasElement;
    this.ctx = {} as GPUCanvasContext;
    this.destinationTexture = null;
    this.depthTexture = {} as GPUTexture;
    this.depthView = {} as GPUTextureView;
    this.commandEncoder = {} as GPUCommandEncoder;
    this.passEncoder = {} as GPURenderPassEncoder;
    this.pipelines = new Map<string, GPURenderPipeline>();
    this.vertexBuffer = {} as GPUBuffer;
    this.vertexSubBuffers = [];
    this.vertexSubBuffersSize = 0;
    this.views = [];
    this.currentView = new Gfx3View();
    this.lastRenderStart = 0;
    this.lastRenderTime = 0;
  }

  /**
   * Initializes the WebGPU rendering context (internal use only).
   */
  async initialize() {
    if (!navigator.gpu) {
      UT.FAIL('This browser does not support webgpu');
      throw new Error('Gfx3Manager::Gfx3Manager: WebGPU cannot be initialized - navigator.gpu not found');
    }

    this.adapter = (await navigator.gpu.requestAdapter())!;
    if (!this.adapter) {
      UT.FAIL('This browser appears to support WebGPU but it\'s disabled');
      throw new Error('Gfx3Manager::Gfx3Manager: WebGPU cannot be initialized - Adapter not found');
    }

    this.device = await this.adapter.requestDevice();
    this.device.lost.then(() => {
      throw new Error('Gfx3Manager::Gfx3Manager: WebGPU cannot be initialized - Device has been lost');
    });

    this.canvas = <HTMLCanvasElement>document.getElementById('CANVAS_3D')!;
    if (!this.canvas) {
      throw new Error('Gfx3Manager::Gfx3Manager: CANVAS_3D not found');
    }

    this.ctx = this.canvas.getContext('webgpu')!;
    if (!this.ctx) {
      throw new Error('Gfx3Manager::Gfx3Manager: WebGPU cannot be initialized - Canvas does not support WebGPU');
    }

    this.ctx.configure({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: 'opaque'
    });

    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
    this.currentView = this.createView();

    this.depthTexture = this.device.createTexture({
      size: [this.canvas.width, this.canvas.height],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT
    });

    this.depthView = this.depthTexture.createView();
    this.vertexBuffer = this.device.createBuffer({ size: 0, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });

    eventManager.subscribe(coreManager, 'E_RESIZE', this, this.$handleWindowResize);
  }

  /**
   * Prepare the draw process.
   * Warning: You need to call this method before your draw calls.
   */
  beginDrawing(): void {}

  /**
   * Close the draw process.
   * Warning: You need to call this method after your draw calls.
   */
  endDrawing() {
    if (this.vertexSubBuffersSize > 0 && this.vertexSubBuffersSize != this.vertexBuffer.size) {
      this.vertexBuffer.destroy();
      this.vertexBuffer = this.device.createBuffer({ size: this.vertexSubBuffersSize, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST });

      for (const sub of this.vertexSubBuffers) {
        this.device.queue.writeBuffer(this.vertexBuffer, sub.offset, sub.vertices);
        sub.changed = false;
      }

      return;
    }

    for (const sub of this.vertexSubBuffers) {
      if (sub.changed) {
        this.device.queue.writeBuffer(this.vertexBuffer, sub.offset, sub.vertices);
        sub.changed = false;
      }
    }
  }

  /**
   * Prepare the render process.
   * Warning: You need to call this method before your render calls.
   */
  beginRender(): void {
    this.commandEncoder = this.device.createCommandEncoder();
    this.lastRenderStart = Date.now();
  }

  /**
   * Prepare a render pass.
   * Warning: You need to call this method before the render calls you want include in this pass.
   */
  beginPassRender(viewIndex: number): void {
    const view = this.views[viewIndex];
    const viewport = view.getViewport();
    const viewportX = this.canvas.width * viewport.xFactor;
    const viewportY = this.canvas.height * viewport.yFactor;
    const viewportWidth = this.canvas.width * viewport.widthFactor;
    const viewportHeight = this.canvas.height * viewport.heightFactor;
    const viewBgColor = view.getBgColor();
    const textureView = this.destinationTexture ? this.destinationTexture.createView() : this.ctx.getCurrentTexture().createView();

    this.passEncoder = this.commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: viewBgColor[0], g: viewBgColor[1], b: viewBgColor[2], a: viewBgColor[3] },
        loadOp: 'clear',
        storeOp: 'store'
      }],
      depthStencilAttachment: {
        view: this.depthView,
        depthClearValue: 1.0,
        depthLoadOp: 'clear',
        depthStoreOp: 'store'
      }
    });

    this.currentView = view;
    this.passEncoder.setViewport(viewportX, viewportY, viewportWidth, viewportHeight, 0, 1);
    this.passEncoder.setScissorRect(viewportX, viewportY, viewportWidth, viewportHeight);
  }

  /**
   * Close a render pass.
   * Warning: You need to call this method after the render calls you want include in this pass.
   */
  endPassRender(): void {
    this.passEncoder.end();
  }

  /**
   * Close the render process.
   * Warning: You need to call this method after your render calls.
   */
  endRender(): void {
    this.device.queue.submit([this.commandEncoder.finish()]);
    this.lastRenderTime = Date.now() - this.lastRenderStart;
  }

  /**
   * Creates and returns a GPU render pipeline using the provided vertex and fragment shaders, and caches it for future use.
   * 
   * @param {string} id - A unique identifier for the render pipeline.
   * @param {string} vertexShader - The code for the vertex shader.
   * @param {string} fragmentShader - The code for the fragment shader.
   * @param {GPURenderPipelineDescriptor} pipelineDesc - The configuration of the pipeline, such as the vertex and fragment shaders, the color and depth formats, the primitive topology
   */
  loadPipeline(id: string, vertexShader: string, fragmentShader: string, pipelineDesc: GPURenderPipelineDescriptor): GPURenderPipeline {
    if (this.pipelines.has(id)) {
      return this.pipelines.get(id)!;
    }

    if (pipelineDesc.vertex) {
      pipelineDesc.vertex.module = this.device.createShaderModule({
        code: vertexShader
      });
    }

    if (pipelineDesc.fragment) {
      pipelineDesc.fragment.module = this.device.createShaderModule({
        code: fragmentShader
      });
    }

    const pipeline = this.device.createRenderPipeline(pipelineDesc);
    this.pipelines.set(id, pipeline);
    return pipeline;
  }

  /**
   * Returns a GPU render pipeline.
   * 
   * @param {string} id - The identifier of the pipeline.
   */
  getPipeline(id: string): GPURenderPipeline {
    if (!this.pipelines.has(id)) {
      throw new Error('Gfx3Manager::getPipeline(): pipeline not found !');
    }

    return this.pipelines.get(id)!;
  }

  /**
   * Creates a vertex sub-buffer and returns it.
   * Note: A sub-buffer is just a reference offset/size pointing to the big one vertex buffer.
   * 
   * @param {number} size - The number of vertices.
   */
  createVertexBuffer(size: number): VertexSubBuffer {
    const sub: VertexSubBuffer = {
      vertices: new Float32Array(size),
      offset: this.vertexSubBuffersSize,
      changed: false
    };

    this.vertexSubBuffers.push(sub);
    this.vertexSubBuffersSize += size;
    return sub;
  }

  /**
   * Removes a vertex sub-buffer.
   * 
   * @param {VertexSubBuffer} sub - The vertex sub-buffer.
   */
  destroyVertexBuffer(sub: VertexSubBuffer): void {
    const index = this.vertexSubBuffers.indexOf(sub);
    this.vertexSubBuffers.splice(index, 1);

    for (const item of this.vertexSubBuffers) {
      if (item.offset > sub.offset) {
        item.offset -= sub.vertices.byteLength;
      }
    }

    this.vertexSubBuffersSize -= sub.vertices.byteLength;
  }

  /**
   * Write data on vertex sub-buffer.
   * 
   * @param {VertexSubBuffer} sub - The vertex sub-buffer.
   * @param vertices - The vertex data.
   */
  writeVertexBuffer(sub: VertexSubBuffer, vertices: Array<number>): void {
    sub.vertices = new Float32Array(vertices);
    sub.changed = true;
  }

  /**
   * Creates a static group for a given pipeline and group index.
   * 
   * @param {string} pipelineId - The unique identifier of a pipeline.
   * @param {number} groupIndex - The uniform group index in the shader.
   */
  createStaticGroup(pipelineId: string, groupIndex: number): Gfx3StaticGroup {
    return new Gfx3StaticGroup(this.device, this.getPipeline(pipelineId), groupIndex);
  }

  /**
   * Creates a dynamic group for a given pipeline and group index.
   * 
   * @param {string} pipelineId - The unique identifier of a pipeline.
   * @param {number} groupIndex - The uniform group index in the shader.
   */
  createDynamicGroup(pipelineId: string, groupIndex: number): Gfx3DynamicGroup {
    return new Gfx3DynamicGroup(this.device, this.getPipeline(pipelineId), groupIndex);
  }

  /**
   * Creates a default rendering texture.
   */
  createRenderingTexture(): Gfx3Texture {
    return this.createEmptyTexture(this.getWidth(), this.getHeight(), navigator.gpu.getPreferredCanvasFormat(), { magFilter: 'nearest', minFilter: 'nearest' });
  }

  /**
   * Creates an empty GPU texture with the given size.
   * 
   * @param {number} width - The texture width.
   * @param {number} height - The texture height.
   * @param {boolean} [is8bit=false] - Indicates whether the texture should be treated as an 8-bit texture or not.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   */
  createEmptyTexture(width: number, height: number, format: GPUTextureFormat, samplerDescriptor: GPUSamplerDescriptor = {}): Gfx3Texture {
    const gpuTexture = this.device.createTexture({
      size: [width, height],
      format: format,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    });

    const gpuSampler = this.device.createSampler({
      magFilter: samplerDescriptor.magFilter ?? 'linear',
      minFilter: samplerDescriptor.minFilter ?? 'linear',
      addressModeU: samplerDescriptor.addressModeU ?? 'repeat',
      addressModeV: samplerDescriptor.addressModeV ?? 'repeat'
    });

    return { gpuTexture: gpuTexture, gpuSampler: gpuSampler };
  }

  /**
   * Creates a GPU texture from a given bitmap image or canvas element.
   * 
   * @param {ImageBitmap | HTMLCanvasElement} [bitmap] - The source image.
   * @param {boolean} [is8bit=false] - Indicates whether the texture should be treated as an 8-bit texture or not.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   */
  createTextureFromBitmap(bitmap?: ImageBitmap | HTMLCanvasElement, is8bit: boolean = false, samplerDescriptor: GPUSamplerDescriptor = {}): Gfx3Texture {
    if (!bitmap) {
      const canvas = document.createElement('canvas');
      canvas.getContext('2d');
      canvas.width = 1;
      canvas.height = 1;
      bitmap = canvas;
    }

    const gpuTexture = this.device.createTexture({
      size: [bitmap.width, bitmap.height],
      format: is8bit ? 'r8unorm' : 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    });

    this.device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: gpuTexture }, [bitmap.width, bitmap.height]);

    const gpuSampler = this.device.createSampler({
      magFilter: samplerDescriptor.magFilter ?? 'linear',
      minFilter: samplerDescriptor.minFilter ?? 'linear',
      addressModeU: samplerDescriptor.addressModeU ?? 'repeat',
      addressModeV: samplerDescriptor.addressModeV ?? 'repeat'
    });

    return { gpuTexture: gpuTexture, gpuSampler: gpuSampler };
  }

  /**
   * Creates a cubemap texture from a list of bitmaps or canvas elements.
   * 
   * @param [bitmaps] - The list of six bitmaps.
   */
  createCubeMapFromBitmap(bitmaps?: Array<ImageBitmap | HTMLCanvasElement>): Gfx3Texture {
    if (!bitmaps || bitmaps.length == 0) {
      const canvas = document.createElement('canvas');
      canvas.getContext('2d');
      canvas.width = 1;
      canvas.height = 1;
      bitmaps = [];
      for (let i = 0; i < 6; i++) {
        bitmaps.push(canvas);
      }
    }

    const cubemapTexture = this.device.createTexture({
      dimension: '2d',
      // Create a 2d array texture.
      // Assume each image has the same size.
      size: [bitmaps[0].width, bitmaps[0].height, 6],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    });

    for (let i = 0; i < bitmaps.length; i++) {
      const imageBitmap = bitmaps[i];
      this.device.queue.copyExternalImageToTexture(
        { source: imageBitmap },
        { texture: cubemapTexture, origin: [0, 0, i] },
        [imageBitmap.width, imageBitmap.height]
      );
    }

    const gpuSampler = this.device.createSampler({
      magFilter: 'linear',
      minFilter: 'linear'
    });

    return { gpuTexture: cubemapTexture, gpuSampler: gpuSampler };
  }

  /**
   * Sets the css filter property of the canvas.
   * 
   * @param {string} filter - The filter parameter is a string that represents the CSS filter property's value.
   * It can be used to apply various visual effects to an element, such as blur, brightness, contrast,
   * grayscale, etc.
   */
  setFilter(filter: string): void {
    this.canvas.style.filter = filter;
  }

  /**
   * Checks if the canvas element has an active filter.
   */
  hasFilter(): boolean {
    return this.canvas.style.filter != '' && this.canvas.style.filter != 'none';
  }

  /**
   * Returns the client width of the canvas.
   */
  getClientWidth(): number {
    return this.canvas.clientWidth;
  }

  /**
   * Returns the client height of the canvas.
   */
  getClientHeight(): number {
    return this.canvas.clientHeight;
  }

  /**
   * Returns the resolution width of the canvas.
   */
  getWidth(): number {
    const devicePixelRatio = window.devicePixelRatio || 1;
    return this.canvas.clientWidth * devicePixelRatio;
  }

  /**
   * Returns the resolution height of the canvas.
   */
  getHeight(): number {
    const devicePixelRatio = window.devicePixelRatio || 1;
    return this.canvas.clientHeight * devicePixelRatio;
  }

  /**
   * Returns the GPUCanvasContext object.
   */
  getContext(): GPUCanvasContext {
    return this.ctx;
  }

  /**
   * Returns the GPU device.
   */
  getDevice(): GPUDevice {
    return this.device;
  }

  /**
   * The destination texture is used for multi-pass rendering.
   * Note: If destination texture is set, we render to the destination texture and let post-processing effect renderers used it.
   * otherwise we are rendering to the screen directly.
   * 
   * @param {GPUTexture | null} destinationTexture - The destination texture.
   */
  setDestinationTexture(destinationTexture: GPUTexture | null): void {
    this.destinationTexture = destinationTexture;
  }

  /**
   * Returns the depth texture.
   */
  getDepthTexture(): GPUTexture {
    return this.depthTexture;
  }

  /**
   * Returns the current rendering texture.
   * Note: Is the texture used for final rendering.
   */
  getCurrentRenderingTexture(): GPUTexture {
    return this.ctx.getCurrentTexture();
  }

  /**
   * Returns the GPUCommandEncoder.
   */
  getCommandEncoder(): GPUCommandEncoder {
    return this.commandEncoder;
  }

  /**
   * Returns the current WebGPU render pass encoder.
   */
  getPassEncoder(): GPURenderPassEncoder {
    return this.passEncoder;
  }

  /**
   * Returns the view at the specified index.
   * 
   * @param {number} index - The index.
   */
  getView(index: number): Gfx3View {
    return this.views[index];
  }

  /**
   * Returns the number of views.
   */
  getNumViews(): number {
    return this.views.length;
  }

  /**
   * Create a new view and return it.
   */
  createView(): Gfx3View {
    const view = new Gfx3View();
    view.setScreenSize(this.canvas.width, this.canvas.height);
    this.views.push(view);
    return view;
  }

  /**
   * Change the view at a specified index.
   * 
   * @param {number} index - The index of the view should be changed.
   * @param {Gfx3View} view - The view.
   */
  changeView(index: number, view: Gfx3View): void {
    this.views[index] = view;
  }

  /**
   * Removes a view.
   * 
   * @param {Gfx3View} view - The view.
   */
  removeView(view: Gfx3View): void {
    this.views.splice(this.views.indexOf(view), 1);
  }

  /**
   * Removes a view at specified index.
   * 
   * @param {number} index - The index of the view.
   */
  removeViewAt(index: number): void {
    this.views.splice(index, 1);
  }

  /**
   * Returns the current view.
   * Note: Current view is set by the "begin" function.
   */
  getCurrentView(): Gfx3View {
    return this.currentView;
  }

  /**
   * Returns the big one vertex buffer.
   */
  getVertexBuffer(): GPUBuffer {
    return this.vertexBuffer;
  }

  /**
   * Returns the last render time.
   */
  getLastRenderTime() {
    return this.lastRenderTime;
  }

  /**
   * Resizes the canvas, recreates the depth texture and view, and updates the screen size for each view.
   */
  $handleWindowResize(): void {
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;

    this.depthTexture.destroy();
    this.depthTexture = this.device.createTexture({
      size: [this.canvas.width, this.canvas.height],
      format: 'depth24plus',
      usage: GPUTextureUsage.RENDER_ATTACHMENT
    });

    this.depthView = this.depthTexture.createView();

    for (const view of this.views) {
      view.setScreenSize(this.canvas.width, this.canvas.height);
    }
  }
}

const gfx3Manager = new Gfx3Manager();
await gfx3Manager.initialize();

export { Gfx3Manager };
export { gfx3Manager };