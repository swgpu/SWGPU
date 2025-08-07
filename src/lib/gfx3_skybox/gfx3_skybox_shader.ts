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
    },
    { format: 'rgba16float' }, // normals
    { format: 'rgba16float' }, // ids
    { format: 'rgba16float' }, // ch1
    { format: 'rgba16float' }, // ch2
  ]},
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

export const VERTEX_SHADER = (data: any) => /* wgsl */`
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

export const FRAGMENT_SHADER = (data: any) => /* wgsl */`
struct FragOutput {
  @location(0) Base: vec4f,
  @location(1) Normal: vec4f,
  @location(2) Id: vec4f,
  @location(3) Ch1: vec4f,
  @location(4) Ch2: vec4f
};

@group(0) @binding(0) var<uniform> VPC_INVERSE_MATRIX: mat4x4<f32>;
@group(0) @binding(1) var<uniform> ID: vec4<f32>;
@group(1) @binding(0) var CUBEMAP_TEXTURE: texture_cube<f32>;
@group(1) @binding(1) var CUBEMAP_SAMPLER: sampler;

@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) ClipPos: vec4<f32>
) -> FragOutput {
  var t = VPC_INVERSE_MATRIX * ClipPos;

  var output: FragOutput;
  output.Base = textureSample(CUBEMAP_TEXTURE, CUBEMAP_SAMPLER, normalize(t.xyz / t.w));
  output.Normal = vec4(0.0, 0.0, 0.0, 0.0);
  output.Id = ID;
  output.Ch1 = vec4(0.0, 0.0, 0.0, 0.0);
  output.Ch2 = vec4(0.0, 0.0, 0.0, 0.0);
  return output;
}`;