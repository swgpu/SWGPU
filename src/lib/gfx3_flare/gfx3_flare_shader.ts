export const SHADER_VERTEX_ATTR_COUNT = 4;

export const PIPELINE_DESC: any = {
  label: 'Flare pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /*vertex*/
        offset: 0,
        format: 'float32x2'
      }, {
        shaderLocation: 1, /*uv*/
        offset: 2 * 4,
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
  @location(0) FragUV: vec2<f32>
};

@group(0) @binding(0) var<uniform> RESOLUTION: vec2<f32>;
@group(1) @binding(0) var<uniform> TRANSLATION: vec2<f32>;
@group(1) @binding(1) var<uniform> SCALE: vec2<f32>;
@group(1) @binding(2) var<uniform> ANGLE: f32;
@group(1) @binding(3) var<uniform> SIZE: vec2<f32>;
@group(1) @binding(4) var<uniform> OFFSET: vec2<f32>;

@vertex
fn main(
  @location(0) Pos: vec2<f32>,
  @location(1) TexUV: vec2<f32>
) -> VertexOutput {
  var output : VertexOutput;
  var c = cos(ANGLE);
  var s = sin(ANGLE);
  var transformedPos = Pos + OFFSET;
  transformedPos = transformedPos * SIZE * SCALE;
  transformedPos = vec2(c * (transformedPos.x) + s * (transformedPos.y), c * (transformedPos.y) - s * (transformedPos.x));
  var screenPos = transformedPos + TRANSLATION;
  var normScreenPos = screenPos / RESOLUTION;
  var clipPos = normScreenPos * 2.0 - 1.0;
  clipPos.y = clipPos.y * -1;
  output.Position = vec4<f32>(clipPos, 0, 1);
  output.FragUV = TexUV;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
@group(1) @binding(5) var<uniform> COLOR: vec4<f32>;
@group(2) @binding(0) var TEXTURE: texture_2d<f32>;
@group(2) @binding(1) var SAMPLER: sampler;

@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>
) -> @location(0) vec4<f32> {
  return textureSample(TEXTURE, SAMPLER, FragUV) * COLOR;
}`;