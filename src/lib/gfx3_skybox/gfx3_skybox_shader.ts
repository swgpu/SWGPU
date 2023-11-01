export const SHADER_VERTEX_ATTR_COUNT = 6;

export const PIPELINE_DESC: any = {
  label: 'Skybox pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /*position*/
        offset: 0,
        format: 'float32x3'
      }, {
        shaderLocation: 1, /*normal*/
        offset: 3 * 4,
        format: 'float32x3'
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
    depthWriteEnabled: false,
    depthCompare: 'always',
    format: 'depth24plus'
  }
};

export const VERTEX_SHADER = /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) ClipPos: vec4<f32>
};

@vertex
fn main(
  @location(0) Position: vec4<f32>,
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = Position;
  output.Position.z = 1;
  output.ClipPos = Position;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
@group(0) @binding(0) var<uniform> VPC_INVERSE_MATRIX: mat4x4<f32>;
@group(1) @binding(0) var CUBEMAP_TEXTURE: texture_cube<f32>;
@group(1) @binding(1) var CUBEMAP_SAMPLER: sampler;

@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) ClipPos: vec4<f32>
) -> @location(0) vec4<f32> {
  var t = VPC_INVERSE_MATRIX * ClipPos;
  return textureSample(CUBEMAP_TEXTURE, CUBEMAP_SAMPLER, normalize(t.xyz / t.w));
}`;