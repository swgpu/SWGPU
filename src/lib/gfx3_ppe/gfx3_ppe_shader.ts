export const VERTEX_SHADER = /* wgsl */`
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragUV: vec2<f32>
};

@vertex
fn main(
  @location(0) Position : vec2<f32>,
  @location(1) TexUV : vec2<f32>
) -> VertexOutput {
  var output : VertexOutput;
  output.Position = vec4(Position, 0.0, 1.0);
  output.FragUV = TexUV;
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
struct Params {
  ENABLED: f32,
  SCREEN_WIDTH: f32,
  SCREEN_HEIGHT: f32,
  WIDTH_PIXELATION: f32,
  HEIGHT_PIXELATION: f32,
  COLOR_PRECISION: f32,
  DITHER_PATTERN_INDEX: f32,
  DITHER_THRESHOLD: f32,
  DITHER_SCALE_X: f32,
  DITHER_SCALE_Y: f32
};

@group(0) @binding(0) var<uniform> PARAMS: Params;
@group(0) @binding(1) var SOURCE_TEXTURE: texture_2d<f32>;
@group(0) @binding(2) var SOURCE_SAMPLER: sampler;

@fragment
fn main(
  @location(0) FragUV: vec2<f32>
) -> @location(0) vec4<f32> {
  if (PARAMS.ENABLED == 0.0)
  {
    return textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, FragUV);
  }

  // pixelation
  var pixelCoord = FragUV;
  pixelCoord.x = floor(pixelCoord.x * PARAMS.WIDTH_PIXELATION) / PARAMS.WIDTH_PIXELATION;
  pixelCoord.y = floor(pixelCoord.y * PARAMS.HEIGHT_PIXELATION) / PARAMS.HEIGHT_PIXELATION;
  var sourceTexel = textureSample(SOURCE_TEXTURE, SOURCE_SAMPLER, pixelCoord);
  var pixelColor = floor(sourceTexel * PARAMS.COLOR_PRECISION) / PARAMS.COLOR_PRECISION;

  // dithering
  var brightness = GetPixelBrightness(pixelColor.rgb);
  var ditherPattern = GetDitherPattern(PARAMS.DITHER_PATTERN_INDEX);
  var ditherX = u32((FragUV.x * PARAMS.SCREEN_WIDTH) / PARAMS.DITHER_SCALE_X);
  var ditherY = u32((FragUV.y * PARAMS.SCREEN_HEIGHT) / PARAMS.DITHER_SCALE_Y);
  var ditherPixel = GetDitherValue(ditherX, ditherY, brightness, ditherPattern);

  return pixelColor * ditherPixel;
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