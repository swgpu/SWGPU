export const SHADER_VERTEX_ATTR_COUNT = 6;

export const PIPELINE_DESC: any = {
  label: 'Debug pipeline',
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
        shaderLocation: 1, /*color*/
        offset: 3 * 4,
        format: 'float32x3'
      }]
    }]
  },
  fragment: {
    entryPoint: 'main',
    targets: [
      { format: navigator.gpu.getPreferredCanvasFormat()},
      { format: 'rgba16float' }, // normals
      { format: 'rgba16float' }, // ids
      { format: 'rgba16float' } // ch1
    ]
  },
  primitive: {
    topology: 'line-list',
    cullMode: 'back',
    frontFace: 'ccw'
  },
  depthStencil: {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth24plus'
  }
};

export const VERTEX_SHADER = (data: any) => /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) Color: vec3<f32>
};

@binding(0) @group(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

@vertex
fn main(
  @location(0) Position: vec4<f32>,
  @location(1) Color: vec3<f32>
) -> VertexOutput {
  var output: VertexOutput;
  output.Position = MVPC_MATRIX * Position;
  output.Color = Color;
  return output;
}`;

export const FRAGMENT_SHADER = (data: any) => /* wgsl */`
struct FragOutput {
  @location(0) Base: vec4f,
  @location(1) Normal: vec4f,
  @location(2) Id: vec4f,
  @location(3) Ch1: vec4f
}

@fragment
fn main(
  @location(0) Color: vec3<f32>
) -> FragOutput {
  var output: FragOutput;
  output.Base = vec4(Color, 1);
  output.Normal = vec4(0.0, 0.0, 0.0, 0.0);
  output.Id = vec4(0.0, 0.0, 0.0, 0.0);
  output.Ch1 = vec4(0.0, 0.0, 0.0, 0.0);
  return output;
}`;