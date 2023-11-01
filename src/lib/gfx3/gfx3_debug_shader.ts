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
    targets: [{
      format: navigator.gpu.getPreferredCanvasFormat()
    }]
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

export const VERTEX_SHADER = /* wgsl */`
@binding(0) @group(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) Color: vec3<f32>
};

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

export const FRAGMENT_SHADER = /* wgsl */`
@fragment
fn main(
  @location(0) Color: vec3<f32>
) -> @location(0) vec4<f32> {
  return vec4(Color, 1);
}`;