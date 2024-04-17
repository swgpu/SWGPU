export const SHADER_VERTEX_ATTR_COUNT = 5;

export const PIPELINE_DESC: any = {
  label: 'Sprite pipeline',
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
    },
    { format: 'rgba16float' }, // normals
    { format: 'rgba16float' }] // ids
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
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>
};

@group(0) @binding(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

@vertex
fn main(
  @location(0) Position : vec4<f32>,
  @location(1) TexUV : vec2<f32>
) -> VertexOutput {
  var output: VertexOutput;
  output.Position = MVPC_MATRIX * Position;
  output.FragUV = TexUV;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
struct FragOutput {
  @location(0) Base: vec4f,
  @location(1) Normal: vec4f,
  @location(2) Id: vec4f
}

@group(0) @binding(1) var<uniform> ID: vec4<f32>;
@group(1) @binding(0) var TEXTURE: texture_2d<f32>;
@group(1) @binding(1) var SAMPLER: sampler;

@fragment
fn main(
  @location(0) FragUV: vec2<f32>
) -> FragOutput {
  var textureColor = textureSample(TEXTURE, SAMPLER, FragUV);
  if (textureColor.a == 0)
  {
    discard;
  }

  var output: FragOutput;
  output.Base = textureColor;
  output.Normal = vec4(0.0, 0.0, 0.0, 0.0);
  output.Id = ID;
  return output;
}`;