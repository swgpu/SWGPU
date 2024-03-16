export const SHADER_VERTEX_ATTR_COUNT = 2;

export const PIPELINE_DESC: any = {
  label: 'PPE pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /*position*/
        offset: 0,
        format: 'float32x2'
      }, {
        shaderLocation: 1, /*uv*/
        offset: 3 * 4,
        format: 'float32x2'
      }]
    }]
  },
  fragment: {
    entryPoint: 'main',
    targets: [{
      format: navigator.gpu.getPreferredCanvasFormat(),
      blend: {
        color: {
          srcFactor: 'src-alpha',
          dstFactor: 'one-minus-src-alpha',
          operation: 'add'
        },
        alpha: {
          srcFactor: 'one',
          dstFactor: 'one-minus-src-alpha',
          operation: 'add'
        }
      }
    }]
  },
  primitive: {
    topology: 'triangle-list',
    cullMode: 'back',
    frontFace: 'ccw'
  },
  depthStencil: {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth24plus'
  }
};

export const VERTEX_SHADER = /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec2<f32>,
  @location(0) FragUV: vec2<f32>
};

@vertex
fn main(
  @location(0) Position : vec2<f32>,
  @location(1) TexUV : vec2<f32>
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = vec4(Position, 0.0, 1.0);
  output.FragUV = TexUV;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
@group(0) @binding(0) var TEXTURE: texture_2d<f32>;
@group(0) @binding(1) var SAMPLER: sampler;

@fragment
fn main(
  @location(0) FragUV: vec2<f32>
) -> @location(0) vec4<f32> {
  var screenTexel:vec4<f32> = textureSample(TEXTURE, SAMPLER, FragUV);

  screenTexel.r *= 1.2;
  screenTexel.g *= 0.8;
  screenTexel.b *= 0.8;

  return screenTexel;
}`;