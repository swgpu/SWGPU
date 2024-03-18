export const SHADER_VERTEX_ATTR_COUNT = 17;
export const MAX_POINT_LIGHTS = 64;
export const MAX_DECALS = 64;

export const PIPELINE_DESC: any = {
  label: 'Mesh pipeline',
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
      }, {
        shaderLocation: 2, /*color*/
        offset: 5 * 4,
        format: 'float32x3'
      }, {
        shaderLocation: 3, /*normal*/
        offset: 8 * 4,
        format: 'float32x3'
      }, {
        shaderLocation: 4, /*tangent*/
        offset: 11 * 4,
        format: 'float32x3'
      }, {
        shaderLocation: 5, /*binormal*/
        offset: 14 * 4,
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

export const VERTEX_SHADER = /* wgsl */`
struct MeshMatrices {
  MVPC_MATRIX: mat4x4<f32>,
  M_MATRIX: mat4x4<f32>,
  NORM_MATRIX: mat3x3<f32>
}

struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragPos: vec3<f32>,
  @location(1) FragUV: vec2<f32>,
  @location(2) FragColor: vec3<f32>,
  @location(3) FragNormal: vec3<f32>,
  @location(4) FragTangent: vec3<f32>,
  @location(5) FragBinormal: vec3<f32>,
  @location(6) FragShadowPos: vec3<f32>
}

@group(0) @binding(7) var<uniform> LVP_MATRIX: mat4x4<f32>;
@group(1) @binding(0) var<uniform> MESH_MATRICES: MeshMatrices;

@vertex
fn main(
  @location(0) Position: vec4<f32>,
  @location(1) TexUV: vec2<f32>,
  @location(2) Color: vec3<f32>,
  @location(3) Normal: vec3<f32>,
  @location(4) Tangent: vec3<f32>,
  @location(5) Binormal: vec3<f32>
) -> VertexOutput {
  var output: VertexOutput;
  var posFromLight = LVP_MATRIX * MESH_MATRICES.M_MATRIX * Position; // XY is in (-1, 1) space, Z is in (0, 1) space

  output.Position = MESH_MATRICES.MVPC_MATRIX * Position;
  output.FragPos = vec4(MESH_MATRICES.M_MATRIX * Position).xyz;
  output.FragUV = TexUV;
  output.FragColor = Color;
  output.FragNormal = MESH_MATRICES.NORM_MATRIX * Normal;
  output.FragTangent = MESH_MATRICES.NORM_MATRIX * Tangent;
  output.FragBinormal = MESH_MATRICES.NORM_MATRIX * Binormal;
  output.FragShadowPos = vec3(posFromLight.xy * vec2(0.5, -0.5) + vec2(0.5), posFromLight.z); // Convert XY to (0, 1) and Y is flipped because texture coords are Y-down.
  return output;
}`;

export const FRAGMENT_SHADER = /* wgsl */`
struct MaterialColors {
  EMISSIVE: vec3<f32>,
  AMBIENT: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec4<f32>
}

struct MaterialParams {
  OPACITY: f32,
  NORMAL_INTENSITY: f32,
  HAS_LIGHTNING: f32,
  HAS_TEXTURE: f32,
  HAS_DISPLACEMENT_MAP: f32,
  DISPLACEMENT_MAP_FACTOR: f32,
  HAS_SPECULARITY_MAP: f32,
  HAS_NORMAL_MAP: f32,
  HAS_ENV_MAP: f32,
  HAS_DECAL: f32,
  HAS_SHADOW: f32
}

struct MaterialUvs {
  TEXTURE_SCROLL: vec2<f32>,
  TEXTURE_OFFSET: vec2<f32>,
  DISPLACEMENT_MAP_SCROLL: vec2<f32>
}

struct PointLight {
  POSITION: vec3<f32>,
  AMBIENT: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  ATTEN: vec3<f32>,
  INTENSITY: f32
}

struct DirLight {
  DIR: vec3<f32>,
  ENABLED: f32,
  AMBIENT: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  INTENSITY: f32
}

struct Fog {
  ENABLED: f32,
  NEAR: f32,
  FAR: f32,
  COLOR: vec3<f32>
}

struct Decal {
  VP_MATRIX: mat4x4<f32>,
  TEXTURE_LEFT: f32,
  TEXTURE_TOP: f32,
  TEXTURE_WIDTH: f32,
  TEXTURE_HEIGHT: f32,
  ASPECT_RATIO: vec2<f32>,
  OPACITY: f32,
  LAYER: f32
}

@group(0) @binding(0) var<uniform> CAMERA_POS: vec3<f32>;
@group(0) @binding(1) var<uniform> DIR_LIGHT: DirLight;
@group(0) @binding(2) var<uniform> FOG: Fog;
@group(0) @binding(3) var<uniform> POINT_LIGHT_COUNT: u32;
@group(0) @binding(4) var<uniform> POINT_LIGHTS: array<PointLight, ${MAX_POINT_LIGHTS}>;
@group(0) @binding(5) var<uniform> DECAL_COUNT: u32;
@group(0) @binding(6) var<uniform> DECALS: array<Decal, ${MAX_DECALS}>;
@group(0) @binding(8) var DECAL_ATLAS_TEXTURE: texture_2d<f32>;
@group(0) @binding(9) var DECAL_ATLAS_SAMPLER: sampler;
@group(0) @binding(10) var SHADOW_MAP_TEXTURE: texture_depth_2d;
@group(0) @binding(11) var SHADOW_MAP_SAMPLER: sampler_comparison;
@group(1) @binding(1) var<uniform> MESH_LAYER: f32;
@group(2) @binding(0) var<uniform> MAT_COLORS: MaterialColors;
@group(2) @binding(1) var<uniform> MAT_PARAMS: MaterialParams;
@group(2) @binding(2) var<uniform> MAT_UVS: MaterialUvs;
@group(3) @binding(0) var MAT_TEXTURE: texture_2d<f32>;
@group(3) @binding(1) var MAT_SAMPLER: sampler;
@group(3) @binding(2) var MAT_DISPLACEMENT_TEXTURE: texture_2d<f32>;
@group(3) @binding(3) var MAT_DISPLACEMENT_SAMPLER: sampler;
@group(3) @binding(4) var MAT_SPECULARITY_TEXTURE: texture_2d<f32>;
@group(3) @binding(5) var MAT_SPECULARITY_SAMPLER: sampler;
@group(3) @binding(6) var MAT_NORM_TEXTURE: texture_2d<f32>;
@group(3) @binding(7) var MAT_NORM_SAMPLER: sampler;
@group(3) @binding(8) var MAT_ENV_MAP_TEXTURE: texture_cube<f32>;
@group(3) @binding(9) var MAT_ENV_MAP_SAMPLER: sampler;

@fragment
fn main(
  @builtin(position) Position: vec4<f32>,
  @location(0) FragPos: vec3<f32>,
  @location(1) FragUV: vec2<f32>,
  @location(2) FragColor: vec3<f32>,
  @location(3) FragNormal: vec3<f32>,
  @location(4) FragTangent: vec3<f32>,
  @location(5) FragBinormal: vec3<f32>,
  @location(6) FragShadowPos: vec3<f32>
) -> @location(0) vec4<f32> {
  var normal = normalize(FragNormal);
  var outputColor = vec4(0.0, 0.0, 0.0, 1.0);
  var texel = vec4(1.0, 1.0, 1.0, 1.0);
  var textureUV = MAT_UVS.TEXTURE_SCROLL + MAT_UVS.TEXTURE_OFFSET + FragUV;

  if (MAT_PARAMS.HAS_DISPLACEMENT_MAP == 1.0)
  {
    textureUV += CalcDisplacementMap(FragUV);
  }

  if (MAT_PARAMS.HAS_TEXTURE == 1.0)
  {
    texel = textureSample(MAT_TEXTURE, MAT_SAMPLER, textureUV) * vec4<f32>(FragColor, 1.0);
  }

  if (texel.a == 0)
  {
    discard;
  }

  if (MAT_PARAMS.HAS_DECAL == 1.0)
  {
    var decalsColor = vec4(0.0, 0.0, 0.0, 0.0);
    for (var i: u32 = 0; i < DECAL_COUNT; i++)
    {
      if (MESH_LAYER == DECALS[i].LAYER)
      {
        decalsColor += CalcDecal(i, FragPos);
      }
    }

    var alpha = min(texel.a + decalsColor.a, 1.0);
    texel = mix(texel, decalsColor, decalsColor.a);
    texel.a = alpha;
  }

  if (MAT_PARAMS.HAS_NORMAL_MAP == 1.0)
  {
    normal = CalcNormalMap(normal, FragTangent, FragBinormal, textureUV);
  }

  if (MAT_PARAMS.HAS_LIGHTNING == 1.0)
  {
    var shadow = 1.0;
    
    if (MAT_PARAMS.HAS_SHADOW == 1.0)
    {
      shadow = CalcShadow(FragShadowPos);
    }

    if (DIR_LIGHT.ENABLED == 1.0)
    {
      outputColor += CalcDirLight(normal, FragPos, textureUV, shadow) * texel;
    }

    for (var i: u32 = 0; i < POINT_LIGHT_COUNT; i++)
    {
      outputColor += CalcPointLight(i, normal, FragPos, textureUV, shadow) * texel;
    }

    outputColor += vec4(MAT_COLORS.EMISSIVE, 1.0);
  }
  else
  {
    outputColor = texel;
  }

  if (MAT_PARAMS.HAS_ENV_MAP == 1.0)
  {
    outputColor += CalcEnvMap(normal, FragPos);
  }

  if (FOG.ENABLED == 1.0)
  {
    return CalcFog(outputColor.rgb, texel.a * MAT_PARAMS.OPACITY, FragPos);
  }
  else
  {
    return vec4(outputColor.rgb, texel.a * MAT_PARAMS.OPACITY);
  }
}

// *****************************************************************************************************************
// CALC FOG
// *****************************************************************************************************************
fn CalcFog(inputColor: vec3<f32>, inputAlpha: f32, fragPos: vec3<f32>) -> vec4<f32>
{
  var fogColor = FOG.COLOR;
  var fogStart = FOG.NEAR;
  var fogEnd = FOG.FAR;
  var fogDist = length(CAMERA_POS - fragPos);
  var fogFactor = clamp((fogEnd - fogDist) / (fogEnd - fogStart), 0.0, 1.0);
  var outputColor = (fogColor * (1.0 - fogFactor)) + (inputColor * fogFactor);
  var outputAlpha = mix(inputAlpha, 1.0, fogFactor);
  return vec4<f32>(outputColor, outputAlpha);
}

// *****************************************************************************************************************
// CALC DECAL
// *****************************************************************************************************************
fn CalcDecal(index: u32, fragPos: vec3<f32>) -> vec4<f32>
{
  var ctrlColor = vec4(1.0, 1.0, 1.0, 1.0);
  var clipPos = DECALS[index].VP_MATRIX * vec4<f32>(fragPos, 1.0);
  if (clipPos.z < -1.0 || clipPos.z > 1.0)
  {
    ctrlColor = vec4(0.0, 0.0, 0.0, 0.0);
  }

  var ndcPos = vec3<f32>(clipPos.xyz / clipPos.w).xy * DECALS[index].ASPECT_RATIO;
  if (ndcPos.x < -1.0 || ndcPos.x > 1.0 || ndcPos.y < -1.0 || ndcPos.y > 1.0)
  {
    ctrlColor = vec4(0.0, 0.0, 0.0, 0.0);
  }

  var uvx = ndcPos.x * 0.5 + 0.5;
  uvx = (uvx * DECALS[index].TEXTURE_WIDTH) + DECALS[index].TEXTURE_LEFT;

  var uvy = 1.0 - (ndcPos.y * 0.5 + 0.5);
  uvy = (uvy * DECALS[index].TEXTURE_HEIGHT) + DECALS[index].TEXTURE_TOP;

  var texColor = textureSample(DECAL_ATLAS_TEXTURE, DECAL_ATLAS_SAMPLER, vec2<f32>(uvx, uvy));
  texColor.a = max(texColor.a - (1.0 - DECALS[index].OPACITY), 0.0);
  return texColor * ctrlColor;
}

// *****************************************************************************************************************
// CALC NORMAL MAP
// *****************************************************************************************************************
fn CalcNormalMap(normal: vec3<f32>, fragTangent: vec3<f32>, fragBinormal: vec3<f32>, textureUV: vec2<f32>) -> vec3<f32>
{
  var normalIntensity = vec4<f32>(MAT_PARAMS.NORMAL_INTENSITY, MAT_PARAMS.NORMAL_INTENSITY, 1, 1);
  var normalPixel = textureSample(MAT_NORM_TEXTURE, MAT_NORM_SAMPLER, textureUV) * normalIntensity;
  return normalize(normalize(fragTangent) * normalPixel.x + normalize(fragBinormal) * normalPixel.y + normal * normalPixel.z);
}

// *****************************************************************************************************************
// CALC ENV MAP
// *****************************************************************************************************************
fn CalcEnvMap(normal: vec3<f32>, fragPos: vec3<f32>) -> vec4<f32>
{
  var viewDir = normalize(CAMERA_POS - fragPos);
  var rvec = normalize(reflect(viewDir, normal));
  return textureSample(MAT_ENV_MAP_TEXTURE, MAT_ENV_MAP_SAMPLER, vec3<f32>(rvec.x, rvec.y, rvec.z));
}

// *****************************************************************************************************************
// CALC DISPLACEMENT MAP
// *****************************************************************************************************************
fn CalcDisplacementMap(fragUV: vec2<f32>) -> vec2<f32>
{
  var textureUV = MAT_UVS.DISPLACEMENT_MAP_SCROLL + fragUV;
  var offset = vec2(0.0, 0.0);
  var greyScale = textureSample(MAT_DISPLACEMENT_TEXTURE, MAT_DISPLACEMENT_SAMPLER, textureUV).r;
  offset.x = clamp(MAT_PARAMS.DISPLACEMENT_MAP_FACTOR * ((greyScale * 2) - 1), 0.0, 1.0);
  offset.y = clamp(MAT_PARAMS.DISPLACEMENT_MAP_FACTOR * ((greyScale * 2) - 1), 0.0, 1.0);
  return offset;
}

// *****************************************************************************************************************
// CALC LIGHT INTERNAL
// *****************************************************************************************************************
fn CalcLightInternal(lightDir: vec3<f32>, lightAmbient: vec3<f32>, lightDiffuse: vec3<f32>, lightSpecular: vec3<f32>, lightIntensity: f32, normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var ambientColor = lightAmbient * lightIntensity * MAT_COLORS.AMBIENT;
  var diffuseColor = vec3(0.0, 0.0, 0.0);
  var specularColor = vec3(0.0, 0.0, 0.0);
  var specularExponent = MAT_COLORS.SPECULAR.a;
  var diffuseFactor = max(dot(normal, -lightDir), 0.0);

  if (MAT_PARAMS.HAS_SPECULARITY_MAP == 1.0)
  {
    specularExponent = MAT_COLORS.SPECULAR.a * textureSample(MAT_SPECULARITY_TEXTURE, MAT_SPECULARITY_SAMPLER, textureUV).r;
  }

  if (diffuseFactor > 0.0)
  {
    diffuseColor = lightDiffuse * lightIntensity * MAT_COLORS.DIFFUSE * diffuseFactor;
    if (specularExponent > 0.0)
    {
      var reflectDir = reflect(lightDir, normal);
      var viewDir = normalize(CAMERA_POS - fragPos);
      var specularFactor = max(dot(viewDir, reflectDir), 0.0);
      if (specularFactor > 0.0)
      {
        specularFactor = pow(specularFactor, specularExponent);
        specularColor = lightSpecular * lightIntensity * MAT_COLORS.SPECULAR.rgb * specularFactor;
      }
    }
  }

  return vec4(ambientColor + (diffuseColor * shadow) + (specularColor * shadow), 1.0);
}

// *****************************************************************************************************************
// CALC DIR LIGHT
// *****************************************************************************************************************
fn CalcDirLight(normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  return CalcLightInternal(normalize(DIR_LIGHT.DIR), DIR_LIGHT.AMBIENT, DIR_LIGHT.DIFFUSE, DIR_LIGHT.SPECULAR, DIR_LIGHT.INTENSITY, normal, fragPos, textureUV, shadow);
}

// *****************************************************************************************************************
// CALC POINT LIGHT
// *****************************************************************************************************************
fn CalcPointLight(index: u32, normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = fragPos - POINT_LIGHTS[index].POSITION;
  var distance = length(lightDir);
  lightDir = normalize(lightDir);

  var color = CalcLightInternal(lightDir, POINT_LIGHTS[index].AMBIENT, POINT_LIGHTS[index].DIFFUSE, POINT_LIGHTS[index].SPECULAR, POINT_LIGHTS[index].INTENSITY, normal, fragPos, textureUV, shadow);
  var attenuation = POINT_LIGHTS[index].ATTEN[0] + POINT_LIGHTS[index].ATTEN[1] * distance + POINT_LIGHTS[index].ATTEN[2] * distance * distance;
  return color / attenuation;
}

// *****************************************************************************************************************
// CALC SHADOW
// *****************************************************************************************************************
fn CalcShadow(fragShadowPos: vec3<f32>) -> f32
{
  var visibility = 0.0;
  var shadowDepthTextureSize = f32(textureDimensions(SHADOW_MAP_TEXTURE).x);
  var oneOverShadowDepthTextureSize = 1.0 / shadowDepthTextureSize;

  for (var y = -1; y <= 1; y++)
  {
    for (var x = -1; x <= 1; x++)
    {
      var offset = vec2<f32>(vec2(x, y)) * oneOverShadowDepthTextureSize;
      visibility += textureSampleCompare(SHADOW_MAP_TEXTURE, SHADOW_MAP_SAMPLER, fragShadowPos.xy + offset, fragShadowPos.z - 0.007);
    }
  }

  return visibility / 9.0;
}`;