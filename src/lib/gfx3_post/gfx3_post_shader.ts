const WINDOW = window as any;

export const SHADER_VERTEX_ATTR_COUNT = 4;
export const SLOT_NAMES = WINDOW.__POST_SLOT_NAMES__ as Array<string> ?? [
  'S00',
  'S01',
  'S02',
  'S03',
  'S04',
  'S05',
  'S06',
  'S07',
  'S08',
  'S09',
  'S10',
  'S11',
  'S12',
  'S13',
  'S14',
  'S15'
];

const FRAG_INSERT_BEGIN = WINDOW.__POST_FRAG_INSERT_BEGIN__ ? WINDOW.__POST_FRAG_INSERT_BEGIN__ : '';
const FRAG_INSERT_END = WINDOW.__POST_FRAG_INSERT_END__ ? WINDOW.__POST_FRAG_INSERT_END__ : '';

export const PIPELINE_DESC: any = {
  label: 'POST pipeline',
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
      format: navigator.gpu.getPreferredCanvasFormat(),
      blend: {
        color: {
          srcFactor: 'one',
          dstFactor: 'one-minus-src',
          operation: 'add'
        },
        alpha: {
          srcFactor: 'one',
          dstFactor: 'one-minus-src',
          operation: 'add'
        }
      }
    }]
  },
  primitive: {
    topology: 'triangle-list'
  }
};

export const VERTEX_SHADER = /* wgsl */`
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
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
struct Infos {
  RES_WIDTH: f32,
  RES_HEIGHT: f32,
  DELTA_TIME: f32,
  TIME: f32
};

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
  SHADOW_VOLUME_ENABLED: f32,
  SHADOW_VOLUME_BLEND_MODE: f32,
  ${SLOT_NAMES[0]}: f32,
  ${SLOT_NAMES[1]}: f32,
  ${SLOT_NAMES[2]}: f32,
  ${SLOT_NAMES[3]}: f32,
  ${SLOT_NAMES[4]}: f32,
  ${SLOT_NAMES[5]}: f32,
  ${SLOT_NAMES[6]}: f32,
  ${SLOT_NAMES[7]}: f32,
  ${SLOT_NAMES[8]}: f32,
  ${SLOT_NAMES[9]}: f32,
  ${SLOT_NAMES[10]}: f32,
  ${SLOT_NAMES[11]}: f32,
  ${SLOT_NAMES[12]}: f32,
  ${SLOT_NAMES[13]}: f32,
  ${SLOT_NAMES[14]}: f32,
  ${SLOT_NAMES[15]}: f32
};

@group(0) @binding(0) var<uniform> PARAMS: Params;
@group(0) @binding(1) var<uniform> INFOS: Infos;
@group(0) @binding(2) var SOURCE_TEXTURE: texture_2d<f32>;
@group(0) @binding(3) var SOURCE_SAMPLER: sampler;
@group(0) @binding(4) var NORMALS_TEXTURE: texture_2d<f32>;
@group(0) @binding(5) var NORMALS_SAMPLER: sampler;
@group(0) @binding(6) var IDS_TEXTURE: texture_2d<f32>;
@group(0) @binding(7) var IDS_SAMPLER: sampler;
@group(0) @binding(8) var DEPTH_TEXTURE: texture_depth_2d;
@group(0) @binding(9) var CHANNEL1_TEXTURE: texture_2d<f32>;
@group(0) @binding(10) var CHANNEL1_SAMPLER: sampler;

@group(1) @binding(0) var SHADOW_VOL_TEXTURE: texture_2d<f32>;
@group(1) @binding(1) var SHADOW_VOL_SAMPLER: sampler;
@group(1) @binding(2) var SHADOW_VOL_DEPTH_CCW_TEXTURE: texture_depth_2d;
@group(1) @binding(3) var SHADOW_VOL_DEPTH_CW_TEXTURE: texture_depth_2d;

@group(2) @binding(0) var S0_TEXTURE: texture_2d<f32>;
@group(2) @binding(1) var S0_SAMPLER: sampler;
@group(2) @binding(2) var S1_TEXTURE: texture_2d<f32>;
@group(2) @binding(3) var S1_SAMPLER: sampler;

@fragment
fn main(
  @location(0) FragUV: vec2<f32>
) -> @location(0) vec4<f32> {
  var outputColor = textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, FragUV);
  var fragUV = FragUV;

  ${FRAG_INSERT_BEGIN}

  if (PARAMS.ENABLED == 0.0)
  {
    return outputColor;
  }

  var id = textureSample(IDS_TEXTURE, IDS_SAMPLER, fragUV);
  var flags = u32(id.a);

  if (PARAMS.PIXELATION_ENABLED == 1.0 && (flags & 1) == 1)
  {    
    fragUV.x = floor(fragUV.x * PARAMS.PIXELATION_WIDTH) / PARAMS.PIXELATION_WIDTH;
    fragUV.y = floor(fragUV.y * PARAMS.PIXELATION_HEIGHT) / PARAMS.PIXELATION_HEIGHT;
  }

  outputColor = textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, fragUV);
  id = textureSample(IDS_TEXTURE, IDS_SAMPLER, fragUV);
  flags = u32(id.a);

  var normal = textureSample(NORMALS_TEXTURE, NORMALS_SAMPLER, fragUV);
  var depth = LinearlyFilterDepthTexture(DEPTH_TEXTURE, fragUV);
  var channel1 = textureSample(CHANNEL1_TEXTURE, CHANNEL1_SAMPLER, fragUV);
  var shadowVol = textureSample(SHADOW_VOL_TEXTURE, SHADOW_VOL_SAMPLER, fragUV);
  var shadowVolDepthCW = LinearlyFilterDepthTexture(SHADOW_VOL_DEPTH_CW_TEXTURE, fragUV);
  var shadowVolDepthCCW = LinearlyFilterDepthTexture(SHADOW_VOL_DEPTH_CCW_TEXTURE, fragUV);
  var s0 = textureSample(S0_TEXTURE, S0_SAMPLER, fragUV);
  var s1 = textureSample(S1_TEXTURE, S1_SAMPLER, fragUV);

  if (PARAMS.COLOR_ENABLED == 1.0 && (flags & 2) == 2)
  {
    outputColor = floor(outputColor * PARAMS.COLOR_PRECISION) / PARAMS.COLOR_PRECISION;
  }

  if (PARAMS.DITHER_ENABLED == 1.0 && (flags & 4) == 4)
  {
    var brightness = GetPixelBrightness(outputColor.rgb);
    var ditherPattern = GetDitherPattern(PARAMS.DITHER_PATTERN_INDEX);
    var ditherX = u32((FragUV.x * INFOS.RES_WIDTH) / PARAMS.DITHER_SCALE_X);
    var ditherY = u32((FragUV.y * INFOS.RES_HEIGHT) / PARAMS.DITHER_SCALE_Y);
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

    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( t,  0)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( 0,  t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( 0,  t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( 0, -t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( t,  t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>( t, -t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>(-t,  t)));
    idDiff += distance(id, GetIdValue(fragUV, vec2<f32>(-t, -t)));

    if (idDiff != 0.0)
    {
      idDiff = 1.0;
      var outline = clamp(idDiff, 0, 1);
      outputColor = mix(outputColor, vec4<f32>(PARAMS.OUTLINE_R, PARAMS.OUTLINE_G, PARAMS.OUTLINE_B, 1.0), outline);  
    }
  }

  if (PARAMS.SHADOW_VOLUME_ENABLED == 1.0 && (flags & 16) == 16)
  {
    if (shadowVolDepthCW != 1.0 && shadowVolDepthCCW != 1.0 && depth >= shadowVolDepthCCW && depth <= shadowVolDepthCW)
    {
      if (PARAMS.SHADOW_VOLUME_BLEND_MODE == 1.0)
      {
        outputColor += shadowVol;
      }
      else
      {
        outputColor *= shadowVol;
      }
    }
  }

  ${FRAG_INSERT_END}

  return outputColor;
}

// *****************************************************************************************************************
// GET TEXEL VALUE
// *****************************************************************************************************************
fn GetTexelValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / INFOS.RES_WIDTH, 1.0 / INFOS.RES_HEIGHT);
  return textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET NORMAL VALUE
// *****************************************************************************************************************
fn GetNormalValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / INFOS.RES_WIDTH, 1.0 / INFOS.RES_HEIGHT);
  return textureSampleBaseClampToEdge(NORMALS_TEXTURE, NORMALS_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET ID VALUE
// *****************************************************************************************************************
fn GetIdValue(textureUV: vec2<f32>, offset: vec2<f32>) -> vec4<f32>
{
  var ps = vec2<f32>(1.0 / INFOS.RES_WIDTH, 1.0 / INFOS.RES_HEIGHT);
  return textureSampleBaseClampToEdge(IDS_TEXTURE, IDS_SAMPLER, textureUV + ps * offset);
}

// *****************************************************************************************************************
// GET DEPTH VALUE
// *****************************************************************************************************************
fn GetDepthValue(textureUV: vec2<f32>, offset: vec2<f32>) -> f32
{
  var ps = vec2<f32>(1.0 / INFOS.RES_WIDTH, 1.0 / INFOS.RES_HEIGHT);
  return LinearlyFilterDepthTexture(DEPTH_TEXTURE, textureUV + ps * offset);
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
}

// *****************************************************************************************************************
// LINEARLY FILTER DEPTH TEXTURE
// *****************************************************************************************************************
fn LinearlyFilterDepthTexture(t: texture_depth_2d, normalizedTextureCoord: vec2f) -> f32
{
  let tSize = textureDimensions(t);
  let texelCoord = normalizedTextureCoord * vec2f(tSize) - 0.5;

  // clamp-to-edge
  let lo = max(vec2i(0, 0), vec2i(floor(texelCoord)));
  let hi = min(vec2i(tSize - 1u), vec2i(ceil(texelCoord)));

  // load the 4 texels
  let p00 = textureLoad(t, lo, 0);
  let p10 = textureLoad(t, vec2i(hi.x, lo.y), 0);
  let p11 = textureLoad(t, hi, 0);
  let p01 = textureLoad(t, vec2i(lo.x, hi.y), 0);

  // blend horizontally
  let top = mix(p00, p10, fract(texelCoord.x));
  let bot = mix(p01, p11, fract(texelCoord.x));

  // blend vertically
  return mix(top, bot, fract(texelCoord.y));
}`;