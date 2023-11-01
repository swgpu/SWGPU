export const SHADER_VERTEX_ATTR_COUNT = 15;

export const PIPELINE_DESC: any = {
  label: 'Particles pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /*vertex*/
        offset: 0,
        format: 'float32x3'
      }, {
        shaderLocation: 1, /*center*/
        offset: 3 * 4,
        format: 'float32x3'
      }, {
        shaderLocation: 2, /*uv*/
        offset: 6 * 4,
        format: 'float32x2'
      }, {
        shaderLocation: 3, /*color*/
        offset: 8 * 4,
        format: 'float32x3'
      }, {
        shaderLocation: 4, /*size*/
        offset: 11 * 4,
        format: 'float32'
      }, {
        shaderLocation: 5, /*opacity*/
        offset: 12 * 4,
        format: 'float32'
      }, {
        shaderLocation: 6, /*angle*/
        offset: 13 * 4,
        format: 'float32'
      }, {
        shaderLocation: 7, /*visible*/
        offset: 14 * 4,
        format: 'float32'
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
    cullMode: 'none',
    frontFace: 'ccw'
  },
  depthStencil: {
    depthWriteEnabled: false,
    depthCompare: 'less',
    format: 'depth24plus'
  }
};

export const VERTEX_SHADER = /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>,
  @location(1) Color: vec4<f32>,
  @location(2) Angle: f32
};

@group(0) @binding(0) var<uniform> V_MATRIX: mat4x4<f32>;
@group(1) @binding(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

@vertex
fn main(
  @location(0) Pos: vec3<f32>,
  @location(1) Center: vec3<f32>,
  @location(2) TexUV: vec2<f32>,
  @location(3) Color: vec3<f32>,
  @location(4) Size: f32,
  @location(5) Opacity: f32,
  @location(6) Angle: f32,
  @location(7) Visible: f32
) -> VertexOutput {
  var output : VertexOutput;

  if(Visible == 1)
  {
    output.Color = vec4(Color, Opacity);
  }
  else
  {
    output.Color = vec4(0.0, 0.0, 0.0, 0.0);
  }

  var right = vec3<f32>(V_MATRIX[0][0], V_MATRIX[1][0], V_MATRIX[2][0]);
  var up = vec3<f32>(V_MATRIX[0][1], V_MATRIX[1][1], V_MATRIX[2][1]);

  output.Position = MVPC_MATRIX * vec4<f32>(Center + (right * Pos.x * Size) + (up * Pos.y * Size), 1.0);
  output.FragUV = TexUV;
  output.Angle = Angle;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
@group(2) @binding(0) var TEXTURE: texture_2d<f32>;
@group(2) @binding(1) var SAMPLER: sampler;

@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>,
  @location(1) Color: vec4<f32>,
  @location(2) Angle: f32
) -> @location(0) vec4<f32> {
  var c = cos(Angle);
  var s = sin(Angle);

  var rotatedUV = vec2(
    c * (FragUV.x - 0.5) + s * (FragUV.y - 0.5) + 0.5,
    c * (FragUV.y - 0.5) - s * (FragUV.x - 0.5) + 0.5
  );

  return textureSample(TEXTURE, SAMPLER, rotatedUV) * Color;
}`;