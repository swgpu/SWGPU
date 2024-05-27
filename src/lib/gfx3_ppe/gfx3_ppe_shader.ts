export const SHADER_VERTEX_ATTR_COUNT = 4;

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
        offset: 2 * 4,
        format: 'float32x2'
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
    topology: 'triangle-list'
  }
};

export const VERTEX_SHADER = (ext: string) => /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>
};

@vertex
fn main(
  @location(0) Position: vec2<f32>,
  @location(1) TexUV: vec2<f32>
) -> VertexOutput {
  var output: VertexOutput;
  output.Position = vec4(Position, 0.0, 1.0);
  output.FragUV = TexUV;
  ${ext}
  return output;
}`;

export const FRAGMENT_SHADER = (ext: string) => /* wgsl */`
struct Params {
  ENABLED: f32,
  PIXELATION_ENABLED: f32,
  PIXELATION_WIDTH: f32,
  PIXELATION_HEIGHT: f32,
  COLOR_ENABLED: f32,
  COLOR_PRECISION: f32,
  DITHER_ENABLED: f32,
  DITHER_PATTERN_INDEX: f32,
  DITHER_THRESHOLD: f32,
  DITHER_SCALE_X: f32,
  DITHER_SCALE_Y: f32,
  OUTLINE_ENABLED: f32,
  OUTLINE_THICKNESS: f32,
  OUTLINE_R: f32,
  OUTLINE_G: f32,
  OUTLINE_B: f32,
  OUTLINE_CONSTANT: f32,
  SHADOW_VOLUME_ENABLED: f32
};

@group(0) @binding(0) var<uniform> PARAMS: Params;
@group(0) @binding(1) var<uniform> SIZE: vec2<f32>;
@group(0) @binding(2) var SOURCE_TEXTURE: texture_2d<f32>;
@group(0) @binding(3) var SOURCE_SAMPLER: sampler;
@group(0) @binding(4) var NORMALS_TEXTURE: texture_2d<f32>;
@group(0) @binding(5) var NORMALS_SAMPLER: sampler;
@group(0) @binding(6) var IDS_TEXTURE: texture_2d<f32>;
@group(0) @binding(7) var IDS_SAMPLER: sampler;
@group(0) @binding(8) var DEPTH_TEXTURE: texture_depth_2d;
@group(0) @binding(9) var DEPTH_SAMPLER: sampler;

@group(1) @binding(0) var SHADOW_FACTOR_TEXTURE: texture_2d<f32>;
@group(1) @binding(1) var SHADOW_FACTOR_SAMPLER: sampler;
@group(1) @binding(2) var SHADOW_DEPTH_CCW_TEXTURE: texture_depth_2d;
@group(1) @binding(3) var SHADOW_DEPTH_CCW_SAMPLER: sampler;
@group(1) @binding(4) var SHADOW_DEPTH_CW_TEXTURE: texture_depth_2d;
@group(1) @binding(5) var SHADOW_DEPTH_CW_SAMPLER: sampler;

@fragment
fn main(
  @location(0) FragUV: vec2<f32>
) -> @location(0) vec4<f32> {
  var pixelCoord = FragUV;
  var outputColor = textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, FragUV);
  var normal = textureSample(NORMALS_TEXTURE, NORMALS_SAMPLER, FragUV);
  var id = textureSample(IDS_TEXTURE, IDS_SAMPLER, FragUV);
  var depth = textureSample(DEPTH_TEXTURE, DEPTH_SAMPLER, FragUV);
  var shadowFactor = textureSample(SHADOW_FACTOR_TEXTURE, SHADOW_FACTOR_SAMPLER, FragUV);
  var shadowDepthCW = textureSample(SHADOW_DEPTH_CW_TEXTURE, SHADOW_DEPTH_CW_SAMPLER, FragUV);
  var shadowDepthCCW = textureSample(SHADOW_DEPTH_CCW_TEXTURE, SHADOW_DEPTH_CCW_SAMPLER, FragUV);
  var flags = u32(id.a);

  if (PARAMS.ENABLED == 0.0)
  {
    return outputColor;
  }

  if (PARAMS.PIXELATION_ENABLED == 1.0 && (flags & 1) == 1)
  {    
    pixelCoord.x = floor(FragUV.x * PARAMS.PIXELATION_WIDTH) / PARAMS.PIXELATION_WIDTH;
    pixelCoord.y = floor(FragUV.y * PARAMS.PIXELATION_HEIGHT) / PARAMS.PIXELATION_HEIGHT;
  }

  outputColor = textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, pixelCoord);
  normal = textureSample(NORMALS_TEXTURE, NORMALS_SAMPLER, pixelCoord);
  id = textureSample(IDS_TEXTURE, IDS_SAMPLER, pixelCoord);
  depth = textureSample(DEPTH_TEXTURE, DEPTH_SAMPLER, pixelCoord);
  shadowFactor = textureSample(SHADOW_FACTOR_TEXTURE, SHADOW_FACTOR_SAMPLER, pixelCoord);
  shadowDepthCW = textureSample(SHADOW_DEPTH_CW_TEXTURE, SHADOW_DEPTH_CW_SAMPLER, pixelCoord);
  shadowDepthCCW = textureSample(SHADOW_DEPTH_CCW_TEXTURE, SHADOW_DEPTH_CCW_SAMPLER, pixelCoord);
  flags = u32(id.a);

  if (PARAMS.COLOR_ENABLED == 1.0 && (flags & 2) == 2)
  {
    outputColor = floor(outputColor * PARAMS.COLOR_PRECISION) / PARAMS.COLOR_PRECISION;
  }

  if (PARAMS.DITHER_ENABLED == 1.0 && (flags & 4) == 4)
  {
    var brightness = GetPixelBrightness(outputColor.rgb);
    var ditherPattern = GetDitherPattern(PARAMS.DITHER_PATTERN_INDEX);
    var ditherX = u32((FragUV.x * SIZE.x) / PARAMS.DITHER_SCALE_X);
    var ditherY = u32((FragUV.y * SIZE.y) / PARAMS.DITHER_SCALE_Y);
    var ditherPixel = GetDitherValue(ditherX, ditherY, brightness, ditherPattern);
    outputColor = outputColor * ditherPixel;
  }

  if (PARAMS.OUTLINE_ENABLED == 1.0 && (flags & 8) == 8)
  {
    var t = PARAMS.OUTLINE_THICKNESS * (depth - 1.0);
    var idDiff = 0.0;

    if (PARAMS.OUTLINE_CONSTANT == 1.0)
    {
      t = PARAMS.OUTLINE_THICKNESS;
    }

    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( t,  0)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( 0,  t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( 0,  t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( 0, -t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( t,  t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>( t, -t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>(-t,  t)));
    idDiff += distance(id, getIdValue(pixelCoord, vec2<f32>(-t, -t)));

    if (idDiff != 0.0)
    {
      idDiff = 1.0;
      var outline = clamp(idDiff, 0, 1);
      outputColor = mix(outputColor, vec4<f32>(PARAMS.OUTLINE_R, PARAMS.OUTLINE_G, PARAMS.OUTLINE_B, 1.0), outline);  
    }
  }

  if (PARAMS.SHADOW_VOLUME_ENABLED == 1.0 && (flags & 16) == 16)
  {
    if (shadowDepthCW != 1.0 && shadowDepthCCW != 1.0 && depth >= shadowDepthCCW && depth <= shadowDepthCW)
    {
      outputColor *= shadowFactor;
    }
  }

  ${ext}
  return outputColor;
}

// *****************************************************************************************************************
// GET TEXEL VALUE
// *****************************************************************************************************************
fn getTexelValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / SIZE.x, 1.0 / SIZE.y);
  return textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET NORMAL VALUE
// *****************************************************************************************************************
fn getNormalValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / SIZE.x, 1.0 / SIZE.y);
  return textureSampleBaseClampToEdge(NORMALS_TEXTURE, NORMALS_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET ID VALUE
// *****************************************************************************************************************
fn getIdValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / SIZE.x, 1.0 / SIZE.y);
  return textureSampleBaseClampToEdge(IDS_TEXTURE, IDS_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET DEPTH VALUE
// *****************************************************************************************************************
fn getDepthValue(textureUV: vec2<f32>, offset: vec2<f32>) -> f32
{
  var ps = vec2<f32>(1.0 / SIZE.x, 1.0 / SIZE.y);
  return textureSample(DEPTH_TEXTURE, DEPTH_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET DITHER PATTERN
// *****************************************************************************************************************
fn GetDitherPattern(index: f32) -> mat4x4<f32>
{
  var pattern = mat4x4<f32>();

  if (index == 0)
  {
    pattern = mat4x4<f32>(
      0, 1, 0, 1,
      1, 0, 1, 0,
      0, 1, 0, 1,
      1, 0, 1, 0 
    );
  }         
  else if (index == 1)
  {
    pattern = mat4x4<f32>(
      0.23, 0.2, 0.6, 0.2,
      0.2, 0.43, 0.2, 0.77,
      0.88, 0.2, 0.87, 0.2,
      0.2, 0.46, 0.2, 0
    );
  }           
  else if (index == 2)
  {
    pattern = mat4x4<f32>(
      -4.0, 0.0, -3.0, 1.0,
      2.0, -2.0, 3.0, -1.0,
      -3.0, 1.0, -4.0, 0.0,
      3.0, -1.0, 2.0, -2.0
    );
  }       
  else if (index == 3)
  {
    pattern = mat4x4<f32>(
      1, 0, 0, 1,
      0, 1, 1, 0,
      0, 1, 1, 0,
      1, 0, 0, 1 
    );
  }
  else 
  {
    pattern = mat4x4<f32>(
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1
    );
  }
  
  return pattern;
}

// *****************************************************************************************************************
// GET DITHER VALUE
// *****************************************************************************************************************
fn GetDitherValue(x: u32, y: u32, brightness: f32, pattern: mat4x4<f32>) -> f32
{
  if ((brightness * PARAMS.DITHER_THRESHOLD) < pattern[x % 4][y % 4]) 
  {
    return 0;
  }
  else
  {
    return 1;
  }
}

// *****************************************************************************************************************
// GET PIXEL BRIGHTNESS
// *****************************************************************************************************************
fn GetPixelBrightness(color: vec3<f32>) -> f32
{
  return color.r + color.g + color.b / 3.0;
}`;