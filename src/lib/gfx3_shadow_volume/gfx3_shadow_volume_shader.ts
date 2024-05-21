export const SHADER_VERTEX_ATTR_COUNT = 4;
export const UNIFORM_ATTR_COUNT = 1;

export const PIPELINE_DESC: any = {
  label: 'Mesh Shadow Volume pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /* position */
        offset: 0,
        format: 'float32x3'
      },{
        shaderLocation: 1, /* shadowFactor */
        offset: 3 * 4,
        format: 'float32'
      }]
    }]
  },
  fragment: {
    entryPoint: 'main',
    targets: [{
      format: 'rgba16float'
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

export const VERTEX_SHADER = `
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragShadowFactor: f32
}

@group(0) @binding(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

@vertex
fn main(
  @location(0) Position: vec4<f32>,
  @location(1) ShadowFactor: f32
) -> VertexOutput {
  var output: VertexOutput;
  output.Position = MVPC_MATRIX * Position;
  output.FragShadowFactor = ShadowFactor;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) FragShadowFactor: f32
) -> @location(0) vec4f {
  return vec4<f32>(FragShadowFactor, FragShadowFactor, FragShadowFactor, 1.0);
}`;