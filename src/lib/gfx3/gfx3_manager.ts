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
 * The `Gfx3Manager` class is a singleton responsible for render all graphics stuff in a 3D graphics system.
 */
class Gfx3Manager {
  adapter: GPUAdapter;
  device: GPUDevice;
  canvas: HTMLCanvasElement;
  ctx: GPUCanvasContext;
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

  /**
   * The constructor.
   */
  constructor() {
    this.adapter = {} as GPUAdapter;
    this.device = {} as GPUDevice;
    this.canvas = {} as HTMLCanvasElement;
    this.ctx = {} as GPUCanvasContext;
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
   * The "initialize" function initializes the WebGPU rendering context, checks for browser support,
   * requests the adapter and device, configures the canvas, creates a depth texture and vertex buffer,
   * and subscribes to a window resize event.
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

    eventManager.subscribe(coreManager, 'E_RESIZE', this, this.handleWindowResize);
  }

  /**
   * The "beginDrawing" function prepare the rendering environment for a specific view.
   * Warning: You need to call this method before your draw calls.
   * @param {number} viewIndex - The `viewIndex` parameter is the index of the view that you want to
   * begin drawing. It is used to retrieve the corresponding view object from the `views` array.
   */
  beginDrawing(viewIndex: number): void {
    const view = this.views[viewIndex];
    const viewport = view.getViewport();
    const viewportX = this.canvas.width * viewport.xFactor;
    const viewportY = this.canvas.height * viewport.yFactor;
    const viewportWidth = this.canvas.width * viewport.widthFactor;
    const viewportHeight = this.canvas.height * viewport.heightFactor;
    const viewBgColor = view.getBgColor();

    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: this.ctx.getCurrentTexture().createView(),
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

    passEncoder.setViewport(viewportX, viewportY, viewportWidth, viewportHeight, 0, 1);
    passEncoder.setScissorRect(viewportX, viewportY, viewportWidth, viewportHeight);

    this.currentView = view;
    this.commandEncoder = commandEncoder;
    this.passEncoder = passEncoder;
  }

  /**
   * The "endDrawing" function close the drawing phase.
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
   * The "beginRender" function prepare the rendering phase.
   * Warning: You need to call this method before your render calls.
   */
  beginRender(): void {
    this.lastRenderStart = Date.now();
  }

  /**
   * The "endRender" function ends the rendering process, submits the command encoder to the device
   * queue, and calculates the time taken for the rendering.
   * Warning: You need to call this method after your render calls.
   */
  endRender(): void {
    this.passEncoder.end();
    this.device.queue.submit([this.commandEncoder.finish()]);
    this.lastRenderTime = Date.now() - this.lastRenderStart;
  }

  /**
   * The "loadPipeline" function creates and returns a GPU render pipeline using the provided vertex and
   * fragment shaders, and caches it for future use.
   * @param {string} id - A unique identifier for the render pipeline.
   * @param {string} vertexShader - The `vertexShader` parameter is a string that represents the code for
   * the vertex shader.
   * @param {string} fragmentShader - The `fragmentShader` parameter is a string that represents the code
   * for the fragment shader.
   * @param {GPURenderPipelineDescriptor} pipelineDesc - The `pipelineDesc` parameter is of type
   * `GPURenderPipelineDescriptor` and it represents the description of the render pipeline that you want
   * to create. It contains various properties that define the configuration of the pipeline, such as the
   * vertex and fragment shaders, the color and depth formats, the primitive topology
   * @returns The GPU render pipeline.
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
   * The "getPipeline" function returns a GPU render pipeline based on the provided ID, throwing an error
   * if the pipeline is not found.
   * @param {string} id - A string representing the ID of the pipeline to retrieve.
   * @returns The GPU render pipeline.
   */
  getPipeline(id: string): GPURenderPipeline {
    if (!this.pipelines.has(id)) {
      throw new Error('Gfx3Manager::getPipeline(): pipeline not found !');
    }

    return this.pipelines.get(id)!;
  }

  /**
   * The "createVertexBuffer" function creates a vertex sub-buffer of a specified size and returns it.
   * Nota bene: A sub-buffer is just a reference offset/size pointing to the big one vertex buffer.
   * @param {number} size - The `size` parameter represents the number of vertices that will be stored
   * in the vertex sub-buffer.
   * @returns The vertex sub-buffer.
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
   * The "destroyVertexBuffer" function removes a given vertex sub-buffer.
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
   * The "writeVertexBuffer" function takes a vertex sub-buffer and write on it.
   * @param {VertexSubBuffer} sub - The vertex sub-buffer.
   * @param vertices - The `vertices` parameter is an array of numbers representing the vertex data.
   */
  writeVertexBuffer(sub: VertexSubBuffer, vertices: Array<number>): void {
    sub.vertices = new Float32Array(vertices);
    sub.changed = true;
  }

  /**
   * The "createStaticGroup" function creates a static group for a given pipeline and group index.
   * @param {string} pipelineId - The pipelineId is a string that represents the unique identifier of
   * a pipeline.
   * @param {number} groupIndex - The `groupIndex` parameter is the index of the uniform group in the shader.
   * @returns A new instance of Gfx3StaticGroup.
   */
  createStaticGroup(pipelineId: string, groupIndex: number): Gfx3StaticGroup {
    return new Gfx3StaticGroup(this.device, this.getPipeline(pipelineId), groupIndex);
  }

  /**
   * The "createDynamicGroup" function creates a dynamic group for a given pipeline and group index.
   * @param {string} pipelineId - The pipelineId is a string that represents the unique identifier of
   * a pipeline.
   * @param {number} groupIndex - The `groupIndex` parameter is the index of the uniform group in the shader.
   * @returns A new instance of Gfx3DynamicGroup.
   */
  createDynamicGroup(pipelineId: string, groupIndex: number): Gfx3DynamicGroup {
    return new Gfx3DynamicGroup(this.device, this.getPipeline(pipelineId), groupIndex);
  }

  /**
   * The "createTextureFromBitmap" function creates a GPU texture from a given bitmap image or canvas element.
   * @param {ImageBitmap | HTMLCanvasElement} [bitmap] - The `bitmap` parameter can be either an
   * `ImageBitmap` or an `HTMLCanvasElement`. It represents the source image from which the texture will
   * be created.
   * @param {boolean} [is8bit=false] - The `is8bit` parameter is a boolean flag that indicates whether
   * the texture should be treated as an 8-bit texture or not.
   * @param {GPUSamplerDescriptor} [samplerDescriptor] - The sampler texture configuration, see https://www.w3.org/TR/webgpu/#GPUSamplerDescriptor.
   * @returns The Gfx3Texture.
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
      format: is8bit ? "r8unorm" : 'rgba8unorm',
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
   * The "createCubeMapFromBitmap" function creates a cube map texture from an array of bitmaps or canvas
   * elements.
   * @param [bitmaps] - The `bitmaps` parameter is an array of `ImageBitmap` or `HTMLCanvasElement`
   * objects. These objects represent the six faces of a cube map texture. Each face should have the same
   * size.
   * @returns The Gfx3Texture.
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
   * The "getClientWidth" function returns the client width of the canvas.
   * @returns The client width of the canvas.
   */
  getClientWidth(): number {
    return this.canvas.clientWidth;
  }

  /**
   * The "getClientHeight" function returns the client height of the canvas.
   * @returns The client height of the canvas.
   */
  getClientHeight(): number {
    return this.canvas.clientHeight;
  }

  /**
   * The "getWidth" function returns the width of the canvas.
   * @returns The width of the canvas.
   */
  getWidth(): number {
    return this.canvas.width;
  }

  /**
   * The "getHeight" function returns the height of the canvas.
   * @returns The height of the canvas.
   */
  getHeight(): number {
    return this.canvas.height;
  }

  /**
   * The "getContext" function returns the GPUCanvasContext object.
   * @returns The WebGPU canvas context.
   */
  getContext(): GPUCanvasContext {
    return this.ctx;
  }

  /**
   * The "getDevice" function returns the GPU device.
   * @returns The WebGPU device.
   */
  getDevice(): GPUDevice {
    return this.device;
  }

  /**
   * The "getPassEncoder" function returns the GPURenderPassEncoder.
   * @returns The WebGPU render pass encoder.
   */
  getPassEncoder(): GPURenderPassEncoder {
    return this.passEncoder;
  }

  /**
   * The "getView" function returns the Gfx3View at the specified index.
   * @param {number} index - The position of the view in views array.
   * @returns The Gfx3View.
   */
  getView(index: number): Gfx3View {
    return this.views[index];
  }

  /**
   * The "getNumViews" function returns the number of views.
   * @returns The number of views.
   */
  getNumViews(): number {
    return this.views.length;
  }

  /**
   * The "createView" function creates a new `Gfx3View` object.
   * @returns A new instance of `Gfx3View`.
   */
  createView(): Gfx3View {
    const view = new Gfx3View();
    view.setScreenSize(this.canvas.width, this.canvas.height);
    this.views.push(view);
    return view;
  }

  /**
   * The "changeView" function change the view at a specified index in views array.
   * @param {number} index - The position in the views array where the view should be changed.
   * @param {Gfx3View} view - The view.
   */
  changeView(index: number, view: Gfx3View): void {
    this.views[index] = view;
  }

  /**
   * The "removeView" function removes a specified view in views array.
   * @param {Gfx3View} view - The view.
   */
  removeView(view: Gfx3View): void {
    this.views.splice(this.views.indexOf(view), 1);
  }

  /**
   * The "releaseViews" function delete all views.
   */
  releaseViews(): void {
    this.views = [];
  }

  /**
   * The "getCurrentView" function returns the current view.
   * Nota bene: current view is set by the "beginDraw" function. 
   * @returns The current view.
   */
  getCurrentView(): Gfx3View {
    return this.currentView;
  }

  /**
   * The "getVertexBuffer" function returns the big one vertex buffer.
   * @returns The global vertex buffer.
   */
  getVertexBuffer(): GPUBuffer {
    return this.vertexBuffer;
  }

  /**
   * The "getLastRenderTime" function returns the last render time.
   * @returns The last render time.
   */
  getLastRenderTime() {
    return this.lastRenderTime;
  }

  /**
   * The "handleWindowResize" function resizes the canvas, recreates the depth texture and view, and
   * updates the screen size for each view.
   */
  handleWindowResize(): void {
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