import { gfx3Manager } from './gfx3_manager';
import { Gfx3Texture } from './gfx3_texture';
import { SHADER_CODE } from './gfx3_mipmap_shader';

class Gfx3MipmapManager {
  device: GPUDevice;
  sampler: GPUSampler;
  pipelines: Map<string, GPURenderPipeline>;
  shaderModule: GPUShaderModule;

  constructor() {
    this.device = gfx3Manager.getDevice();
    this.sampler = this.device.createSampler({ minFilter: 'linear' });
    this.pipelines = new Map<string, GPURenderPipeline>();
    this.shaderModule = this.device.createShaderModule({ code: SHADER_CODE });
  }

  createTextureFromBitmap(bitmap: ImageBitmap | HTMLCanvasElement, is8bit: boolean = false, samplerDescriptor: GPUSamplerDescriptor = {}): Gfx3Texture {
    const gpuTexture = this.device.createTexture({
      format: is8bit ? 'r8unorm' : 'rgba8unorm',
      mipLevelCount: NUM_MIP_LEVELS(bitmap.width, bitmap.height),
      size: [bitmap.width, bitmap.height],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
    });

    this.device.queue.copyExternalImageToTexture({ source: bitmap, flipY: true, }, { texture: gpuTexture }, [bitmap.width, bitmap.height]);
 
    const gpuSampler = this.device.createSampler(Object.assign(samplerDescriptor, {
      magFilter: samplerDescriptor.magFilter ?? 'linear',
      minFilter: samplerDescriptor.minFilter ?? 'linear',
      addressModeU: samplerDescriptor.addressModeU ?? 'repeat',
      addressModeV: samplerDescriptor.addressModeV ?? 'repeat'
    }));

    if (gpuTexture.mipLevelCount > 1) {
      this.generateMipmap(gpuTexture);
    }

    return { gpuTexture: gpuTexture, gpuSampler: gpuSampler };
  }

  /**
   * Generates mipmaps for the given GPUTexture from the data in level 0.
   *
   * @param {GPUTexture} texture - Texture to generate mipmaps for.
   */
  generateMipmap(texture: GPUTexture) {
    if (texture.dimension == '3d' || texture.dimension == '1d') {
      throw new Error('Gfx3MipmapManager::generateMipmap(): Generating mipmaps for non-2d textures is currently unsupported!');
    }

    const pipeline = this.$getMipmapPipeline(texture.format);
    const encoder = this.device.createCommandEncoder();

    let width = texture.width;
    let height = texture.height;
    let baseMipLevel = 0;

    while (width > 1 || height > 1) {
      width = Math.max(1, width / 2 | 0);
      height = Math.max(1, height / 2 | 0);

      const bindGroup = this.device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: this.sampler },
          { binding: 1, resource: texture.createView({ baseMipLevel, mipLevelCount: 1 }) }
        ]
      });

      ++baseMipLevel;

      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view: texture.createView({ baseMipLevel, mipLevelCount: 1 }),
          loadOp: 'clear',
          storeOp: 'store',
        }]
      });

      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.draw(6);
      pass.end();
    }

    const commandBuffer = encoder.finish();
    this.device.queue.submit([commandBuffer]);
  }

  $getMipmapPipeline(format: GPUTextureFormat) {
    const found = this.pipelines.get(format);
    if (found) {
      return found;
    }

    const pipeline = this.device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: this.shaderModule,
        entryPoint: 'vs'
      },
      fragment: {
        module: this.shaderModule,
        entryPoint: 'fs',
        targets: [{ format }]
      }
    });

    this.pipelines.set(format, pipeline);
    return pipeline;
  }
}

export { Gfx3MipmapManager };
export const gfx3MipmapManager = new Gfx3MipmapManager();

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function NUM_MIP_LEVELS(...sizes: Array<number>): number {
  const maxSize = Math.max(...sizes);
  return 1 + Math.log2(maxSize) | 0;
}