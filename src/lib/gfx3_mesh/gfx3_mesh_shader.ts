const WINDOW = window as any;

export const SHADER_VERTEX_ATTR_COUNT = 17;
export const MAX_POINT_LIGHTS = 64;
export const MAX_SPOT_LIGHTS = 16;
export const MAX_DECALS = 64;
export const MAT_SLOT_NAMES = WINDOW.__MESH_MATERIAL_SLOT_NAMES__ as Array<string> ?? [
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

export const SCENE_SLOT_NAMES = WINDOW.__MESH_SCENE_SLOT_NAMES__ as Array<string> ?? [
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

const VERT_BEGIN = WINDOW.__MESH_VERT_BEGIN__ ? WINDOW.__MESH_VERT_BEGIN__ : '';
const VERT_END = WINDOW.__MESH_VERT_END__ ? WINDOW.__MESH_VERT_END__ : '';
const VERT_OUT_POSITION = WINDOW.__MESH_VERT_OUT_POSITION__;
const VERT_OUT_FRAG_POS = WINDOW.__MESH_VERT_OUT_FRAG_POS__;
const VERT_OUT_FRAG_UV = WINDOW.__MESH_VERT_OUT_FRAG_UV__;
const VERT_OUT_FRAG_COLOR = WINDOW.__MESH_VERT_OUT_FRAG_COLOR__;
const VERT_OUT_FRAG_NORMAL = WINDOW.__MESH_VERT_OUT_FRAG_NORMAL__;
const VERT_OUT_FRAG_TANGENT = WINDOW.__MESH_VERT_OUT_FRAG_TANGENT__;
const VERT_OUT_FRAG_BINORMAL = WINDOW.__MESH_VERT_OUT_FRAG_BINORMAL__;
const VERT_OUT_FRAG_SHADOW_POS = WINDOW.__MESH_VERT_OUT_FRAG_SHADOW_POS__;

const FRAG_BEGIN = WINDOW.__MESH_FRAG_BEGIN__ ? WINDOW.__MESH_FRAG_BEGIN__ : '';
const FRAG_END = WINDOW.__MESH_FRAG_END__ ? WINDOW.__MESH_FRAG_END__ : '';
const FRAG_OUT_BASE = WINDOW.__MESH_FRAG_OUT_BASE__;
const FRAG_OUT_NORMAL = WINDOW.__MESH_FRAG_OUT_NORMAL__;
const FRAG_OUT_ID = WINDOW.__MESH_FRAG_OUT_ID__;

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

const STRUCT_MAT_PARAMS = `
struct MaterialParams {
  ID: f32,
  NORMAL_INTENSITY: f32,
  HAS_LIGHTNING: f32,
  HAS_TEXTURE: f32,
  HAS_SECONDARY_TEXTURE: f32,
  HAS_DISPLACEMENT_MAP: f32,
  DISPLACEMENT_MAP_FACTOR: f32,
  HAS_DIFFUSE_MAP: f32,
  HAS_SPECULAR_MAP: f32,
  HAS_EMISSIVE_MAP: f32,
  HAS_NORMAL_MAP: f32,
  HAS_ENV_MAP: f32,
  HAS_TOON_MAP: f32,
  HAS_DISSOLVE_TEXTURE: f32,
  DISSOLVE_GLOW_RANGE: f32,
  DISSOLVE_GLOW_FALLOFF: f32,
  DISSOLVE_AMOUNT: f32,
  HAS_DECAL: f32,
  HAS_SHADOW: f32,
  SHININESS: f32,
  EMISSIVE_FACTOR: f32,
  TOON_BLENDING: f32,
  FACING_ALPHA_BLEND: f32,
  DISTANCE_ALPHA_BLEND: f32,
  HAS_S0_TEXTURE: f32,
  HAS_S1_TEXTURE: f32,
  ${MAT_SLOT_NAMES[0]}: f32,
  ${MAT_SLOT_NAMES[1]}: f32,
  ${MAT_SLOT_NAMES[2]}: f32,
  ${MAT_SLOT_NAMES[3]}: f32,
  ${MAT_SLOT_NAMES[4]}: f32,
  ${MAT_SLOT_NAMES[5]}: f32,
  ${MAT_SLOT_NAMES[6]}: f32,
  ${MAT_SLOT_NAMES[7]}: f32,
  ${MAT_SLOT_NAMES[8]}: f32,
  ${MAT_SLOT_NAMES[9]}: f32,
  ${MAT_SLOT_NAMES[10]}: f32,
  ${MAT_SLOT_NAMES[11]}: f32,
  ${MAT_SLOT_NAMES[12]}: f32,
  ${MAT_SLOT_NAMES[13]}: f32,
  ${MAT_SLOT_NAMES[14]}: f32,
  ${MAT_SLOT_NAMES[15]}: f32
};`;

const STRUCT_SCENE_INFOS = `
struct SceneInfos {
  CAMERA_POS: vec3<f32>,
  AMBIENT_COLOR: vec3<f32>,
  POINT_LIGHT_COUNT: f32,
  SPOT_LIGHT_COUNT: f32,
  DECAL_COUNT: f32,
  DELTA_TIME: f32,
  TIME: f32,
  ${SCENE_SLOT_NAMES[0]}: f32,
  ${SCENE_SLOT_NAMES[1]}: f32,
  ${SCENE_SLOT_NAMES[2]}: f32,
  ${SCENE_SLOT_NAMES[3]}: f32,
  ${SCENE_SLOT_NAMES[4]}: f32,
  ${SCENE_SLOT_NAMES[5]}: f32,
  ${SCENE_SLOT_NAMES[6]}: f32,
  ${SCENE_SLOT_NAMES[7]}: f32,
  ${SCENE_SLOT_NAMES[8]}: f32,
  ${SCENE_SLOT_NAMES[9]}: f32,
  ${SCENE_SLOT_NAMES[10]}: f32,
  ${SCENE_SLOT_NAMES[11]}: f32,
  ${SCENE_SLOT_NAMES[12]}: f32,
  ${SCENE_SLOT_NAMES[13]}: f32,
  ${SCENE_SLOT_NAMES[14]}: f32,
  ${SCENE_SLOT_NAMES[15]}: f32
};`;

const STRUCT_MESH_INFOS = `
struct MeshInfos {
  MVPC_MATRIX: mat4x4<f32>,
  M_MATRIX: mat4x4<f32>,
  NORM_MATRIX: mat3x3<f32>,
  ID: vec4<f32>
};`;

const STRUCT_VERTEX_OUTPUT = `
struct VertexOutput {
  @builtin(position) Position: vec4<f32>,
  @location(0) FragPos: vec3<f32>,
  @location(1) FragUV: vec2<f32>,
  @location(2) FragColor: vec3<f32>,
  @location(3) FragNormal: vec3<f32>,
  @location(4) FragTangent: vec3<f32>,
  @location(5) FragBinormal: vec3<f32>,
  @location(6) FragShadowPos: vec3<f32>
}`;

export const VERTEX_SHADER = /* wgsl */`
${STRUCT_VERTEX_OUTPUT}
${STRUCT_MESH_INFOS}
${STRUCT_MAT_PARAMS}
${STRUCT_SCENE_INFOS}

@group(0) @binding(0) var<uniform> SCENE_INFOS: SceneInfos;
@group(0) @binding(1) var<uniform> LVP_MATRIX: mat4x4<f32>;
@group(1) @binding(0) var<uniform> MESH_INFOS: MeshInfos;
@group(2) @binding(1) var<uniform> MAT_PARAMS: MaterialParams;

@vertex
fn main(
  @location(0) Position: vec4<f32>,
  @location(1) TexUV: vec2<f32>,
  @location(2) Color: vec3<f32>,
  @location(3) Normal: vec3<f32>,
  @location(4) Tangent: vec3<f32>,
  @location(5) Binormal: vec3<f32>
) -> VertexOutput {
  var position = Position;
  var texUV = TexUV;
  var color = Color;
  var normal = Normal;
  var tangent = Tangent;
  var binormal = Binormal;

  ${VERT_BEGIN}
  var posFromLight = LVP_MATRIX * MESH_INFOS.M_MATRIX * position;
  ${VERT_END}

  var output: VertexOutput;
  output.Position = ${VERT_OUT_POSITION ?? 'MESH_INFOS.MVPC_MATRIX * position;'}
  output.FragPos = ${VERT_OUT_FRAG_POS ?? 'vec4(MESH_INFOS.M_MATRIX * position).xyz;'}
  output.FragUV = ${VERT_OUT_FRAG_UV ?? 'texUV;'}
  output.FragColor = ${VERT_OUT_FRAG_COLOR ?? 'color;'}
  output.FragNormal = ${VERT_OUT_FRAG_NORMAL ?? 'MESH_INFOS.NORM_MATRIX * normal;'}
  output.FragTangent = ${VERT_OUT_FRAG_TANGENT ?? 'MESH_INFOS.NORM_MATRIX * tangent;'}
  output.FragBinormal = ${VERT_OUT_FRAG_BINORMAL ?? 'MESH_INFOS.NORM_MATRIX * binormal;'}
  output.FragShadowPos = ${VERT_OUT_FRAG_SHADOW_POS ?? 'vec3(posFromLight.xy * vec2(0.5, -0.5) + vec2(0.5), posFromLight.z); // Convert XY to (0, 1) and Y is flipped because texture coords are Y-down.'}
  return output;
}`;

const STRUCT_FRAG_OUT = `
struct FragOutput {
  @location(0) Base: vec4f,
  @location(1) Normal: vec4f,
  @location(2) Id: vec4f
}`;

const STRUCT_MATERIAL_COLORS = `
struct MaterialColors {
  EMISSIVE: vec3<f32>,
  AMBIENT: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  BLEND: vec4<f32>,
  DISSOLVE_GLOW: vec3<f32>
}`;

const STRUCT_MATERIAL_UVS = `
struct MaterialUvs {
  TEXTURE_SCROLL: vec2<f32>,
  TEXTURE_OFFSET: vec2<f32>,
  TEXTURE_SCALE: vec2<f32>,
  SECONDARY_TEXTURE_SCROLL: vec2<f32>,
  SECONDARY_TEXTURE_OFFSET: vec2<f32>,
  SECONDARY_TEXTURE_SCALE: vec2<f32>,
  DISPLACEMENT_MAP_SCROLL: vec2<f32>,
  DISPLACEMENT_MAP_OFFSET: vec2<f32>,
  DISPLACEMENT_MAP_SCALE: vec2<f32>,
  DISSOLVE_TEXTURE_SCROLL: vec2<f32>,
  DISSOLVE_TEXTURE_OFFSET: vec2<f32>,
  DISSOLVE_TEXTURE_SCALE: vec2<f32>
}`;

const STRUCT_POINT_LIGHT = `
struct PointLight {
  POSITION: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  ATTEN: vec3<f32>,
  INTENSITY: f32,
  MESH_ID: f32
}`;

const STRUCT_SPOT_LIGHT = `
struct SpotLight {
  POSITION: vec3<f32>,
  DIRECTION: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  ATTEN: vec3<f32>,
  INTENSITY: f32,
  MESH_ID: f32,
  CUTOFF: f32
}`;

const STRUCT_DIR_LIGHT = `
struct DirLight {
  DIR: vec3<f32>,
  ENABLED: f32,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  INTENSITY: f32,
  MESH_ID: f32
}`;

const STRUCT_FOG = `
struct Fog {
  ENABLED: f32,
  NEAR: f32,
  FAR: f32,
  COLOR: vec3<f32>,
  FROM: vec3<f32>
}`;

const STRUCT_DECAL = `
struct Decal {
  VP_MATRIX: mat4x4<f32>,
  TEXTURE_LEFT: f32,
  TEXTURE_TOP: f32,
  TEXTURE_WIDTH: f32,
  TEXTURE_HEIGHT: f32,
  ASPECT_RATIO: vec2<f32>,
  OPACITY: f32,
  GROUP: f32
}`;

export const FRAGMENT_SHADER = /* wgsl */`
${STRUCT_FRAG_OUT}
${STRUCT_MESH_INFOS}
${STRUCT_MAT_PARAMS}
${STRUCT_SCENE_INFOS}
${STRUCT_MATERIAL_COLORS}
${STRUCT_MATERIAL_UVS}
${STRUCT_POINT_LIGHT}
${STRUCT_SPOT_LIGHT}
${STRUCT_DIR_LIGHT}
${STRUCT_FOG}
${STRUCT_DECAL}

@group(0) @binding(0) var<uniform> SCENE_INFOS: SceneInfos;
@group(0) @binding(2) var<uniform> DIR_LIGHT: DirLight;
@group(0) @binding(3) var<uniform> POINT_LIGHTS: array<PointLight, ${MAX_POINT_LIGHTS}>;
@group(0) @binding(4) var<uniform> SPOT_LIGHTS: array<SpotLight, ${MAX_SPOT_LIGHTS}>;
@group(0) @binding(5) var<uniform> DECALS: array<Decal, ${MAX_DECALS}>;
@group(0) @binding(6) var<uniform> FOG: Fog;
@group(0) @binding(7) var DECAL_ATLAS_TEXTURE: texture_2d<f32>;
@group(0) @binding(8) var DECAL_ATLAS_SAMPLER: sampler;
@group(0) @binding(9) var SHADOW_MAP_TEXTURE: texture_depth_2d;
@group(0) @binding(10) var SHADOW_MAP_SAMPLER: sampler_comparison;
@group(0) @binding(11) var S0_TEXTURE: texture_2d<f32>;
@group(0) @binding(12) var S0_SAMPLER: sampler;
@group(0) @binding(13) var S1_TEXTURE: texture_2d<f32>;
@group(0) @binding(14) var S1_SAMPLER: sampler;
@group(1) @binding(0) var<uniform> MESH_INFOS: MeshInfos;
@group(2) @binding(0) var<uniform> MAT_COLORS: MaterialColors;
@group(2) @binding(1) var<uniform> MAT_PARAMS: MaterialParams;
@group(2) @binding(2) var<uniform> MAT_UVS: MaterialUvs;
@group(2) @binding(3) var<uniform> MAT_TOON_LIGHT_DIR: vec3<f32>;
@group(3) @binding(0) var MAT_TEXTURE: texture_2d<f32>;
@group(3) @binding(1) var MAT_SAMPLER: sampler;
@group(3) @binding(2) var MAT_SECONDARY_TEXTURE: texture_2d<f32>;
@group(3) @binding(3) var MAT_SECONDARY_SAMPLER: sampler;
@group(3) @binding(4) var MAT_DISPLACEMENT_TEXTURE: texture_2d<f32>;
@group(3) @binding(5) var MAT_DISPLACEMENT_SAMPLER: sampler;
@group(3) @binding(6) var MAT_DIFFUSE_TEXTURE: texture_2d<f32>;
@group(3) @binding(7) var MAT_DIFFUSE_SAMPLER: sampler;
@group(3) @binding(8) var MAT_SPECULAR_TEXTURE: texture_2d<f32>;
@group(3) @binding(9) var MAT_SPECULAR_SAMPLER: sampler;
@group(3) @binding(10) var MAT_EMISSIVE_TEXTURE: texture_2d<f32>;
@group(3) @binding(11) var MAT_EMISSIVE_SAMPLER: sampler;
@group(3) @binding(12) var MAT_NORM_TEXTURE: texture_2d<f32>;
@group(3) @binding(13) var MAT_NORM_SAMPLER: sampler;
@group(3) @binding(14) var MAT_ENV_MAP_TEXTURE: texture_cube<f32>;
@group(3) @binding(15) var MAT_ENV_MAP_SAMPLER: sampler;
@group(3) @binding(16) var MAT_TOON_TEXTURE: texture_2d<f32>;
@group(3) @binding(17) var MAT_TOON_SAMPLER: sampler;
@group(3) @binding(18) var MAT_DISSOLVE_TEXTURE: texture_2d<f32>;
@group(3) @binding(19) var MAT_DISSOLVE_SAMPLER: sampler;
@group(3) @binding(20) var MAT_S0_TEXTURE: texture_2d<f32>;
@group(3) @binding(21) var MAT_S0_SAMPLER: sampler;
@group(3) @binding(22) var MAT_S1_TEXTURE: texture_2d<f32>;
@group(3) @binding(23) var MAT_S1_SAMPLER: sampler;

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
) -> FragOutput {
  var fragPos = FragPos;
  var fragUV = FragUV;
  var fragColor = FragColor;
  var fragNormal = normalize(FragNormal);
  var fragTangent = FragTangent;
  var fragBinormal = FragBinormal;
  var fragShadowPos = FragShadowPos;
  var outputColor = vec4(0.0, 0.0, 0.0, 1.0);
  var texel = vec4(1.0, 1.0, 1.0, 1.0);
  var normalUV = FragUV;
  var shadow = 1.0;
  var matS0 = textureSample(MAT_S0_TEXTURE, MAT_S0_SAMPLER, fragUV);
  var matS1 = textureSample(MAT_S1_TEXTURE, MAT_S1_SAMPLER, fragUV);
  var s0 = textureSample(S0_TEXTURE, S0_SAMPLER, fragUV);
  var s1 = textureSample(S1_TEXTURE, S1_SAMPLER, fragUV);

  ${FRAG_BEGIN}

  var textureUV = CalcTextureUV(
    MAT_UVS.TEXTURE_SCROLL,
    MAT_UVS.TEXTURE_SCALE,
    fragUV,
    MAT_UVS.TEXTURE_OFFSET
  );

  var secondaryTextureUV = CalcTextureUV(
    MAT_UVS.SECONDARY_TEXTURE_SCROLL,
    MAT_UVS.SECONDARY_TEXTURE_SCALE,
    fragUV,
    MAT_UVS.SECONDARY_TEXTURE_OFFSET
  );

  var displacementTextureUV = CalcTextureUV(
    MAT_UVS.DISPLACEMENT_MAP_SCROLL,
    MAT_UVS.DISPLACEMENT_MAP_SCALE,
    fragUV,
    MAT_UVS.DISPLACEMENT_MAP_OFFSET
  );

  var dissolveTextureUV = CalcTextureUV(
    MAT_UVS.DISSOLVE_TEXTURE_SCROLL,
    MAT_UVS.DISSOLVE_TEXTURE_SCALE,
    fragUV,
    MAT_UVS.DISSOLVE_TEXTURE_OFFSET
  );

  if (MAT_PARAMS.HAS_DISPLACEMENT_MAP == 1.0)
  {
    textureUV += CalcDisplacementMap(displacementTextureUV);
  }

  if (MAT_PARAMS.HAS_TEXTURE == 1.0)
  {
    texel *= textureSample(MAT_TEXTURE, MAT_SAMPLER, textureUV);
  }

  if (MAT_PARAMS.HAS_SECONDARY_TEXTURE == 1.0)
  {
    texel *= textureSample(MAT_SECONDARY_TEXTURE, MAT_SECONDARY_SAMPLER, secondaryTextureUV);
  }

  if (MAT_PARAMS.HAS_SECONDARY_TEXTURE == 2.0)
  {
    var texel2 = textureSample(MAT_SECONDARY_TEXTURE, MAT_SECONDARY_SAMPLER, secondaryTextureUV);
    texel = mix(texel, texel2, texel2.a);
  }

  texel *= vec4(fragColor, 1.0);
  texel *= MAT_COLORS.BLEND;

  if (texel.a == 0)
  {
    discard;
  }

  if (MAT_PARAMS.HAS_DECAL == 1.0)
  {
    var decalsColor = CalcDecals(fragPos);
    var alpha = min(texel.a + decalsColor.a, 1.0);
    texel = mix(texel, decalsColor, decalsColor.a);
    texel.a = alpha;
  }

  if (MAT_PARAMS.HAS_NORMAL_MAP == 1.0)
  {
    fragNormal = CalcNormalMap(fragNormal, fragTangent, fragBinormal, normalUV);
  }

  if (MAT_PARAMS.HAS_SHADOW == 1.0)
  {
    shadow = CalcShadow(fragShadowPos);
  }

  if (MAT_PARAMS.HAS_TOON_MAP == 1.0)
  {
    var toonColor = CalcToon(fragNormal, fragPos, shadow);
    outputColor = mix(texel, toonColor, MAT_PARAMS.TOON_BLENDING);
  }
  else if (MAT_PARAMS.HAS_LIGHTNING == 1.0)
  {
    var totalLight = CalcLights(fragNormal, fragPos, textureUV, shadow);
    outputColor = texel * totalLight;
  }
  else
  {
    outputColor = texel;
  }

  if (MAT_PARAMS.HAS_ENV_MAP == 1.0)
  {
    outputColor += CalcEnvMap(fragNormal, fragPos);
  }

  if (MAT_PARAMS.HAS_DISSOLVE_TEXTURE == 1.0)
  {
    var isGlowing = CalcDissolve(dissolveTextureUV);
    outputColor = mix(outputColor, vec4(MAT_COLORS.DISSOLVE_GLOW, outputColor.a), isGlowing);
  }

  if (FOG.ENABLED == 1.0)
  {
    outputColor = CalcFog(outputColor.rgb, texel.a, fragPos);
  }

  outputColor.a = CalcVolumetric(outputColor.a, fragNormal, fragPos);

  ${FRAG_END}

  var output: FragOutput;
  output.Base = ${FRAG_OUT_BASE ?? 'outputColor;'}
  output.Normal = ${FRAG_OUT_NORMAL ?? 'vec4(normalize(fragNormal), 1.0);'}
  output.Id = ${FRAG_OUT_ID ?? 'MESH_INFOS.ID;'}
  return output;
}

// *****************************************************************************************************************
// CALC FOG
// *****************************************************************************************************************
fn CalcTextureUV(scroll: vec2<f32>, scale: vec2<f32>, fragUV: vec2<f32>, offset: vec2<f32>) -> vec2<f32>
{
  var scrollX = cos(scroll[0]) * scroll[1] * SCENE_INFOS.TIME;
  var scrollY = sin(scroll[0]) * scroll[1] * SCENE_INFOS.TIME;
  return vec2(scrollX + offset.x + (fragUV.x * scale.x), scrollY + offset.y + (fragUV.y * scale.y));
}

// *****************************************************************************************************************
// CALC FOG
// *****************************************************************************************************************
fn CalcFog(inputColor: vec3<f32>, inputAlpha: f32, fragPos: vec3<f32>) -> vec4<f32>
{
  var fogColor = FOG.COLOR;
  var fogStart = FOG.NEAR;
  var fogEnd = FOG.FAR;
  var fogDist = length(FOG.FROM - fragPos);
  var fogFactor = clamp((fogEnd - fogDist) / (fogEnd - fogStart), 0.0, 1.0);
  var outputColor = (fogColor * (1.0 - fogFactor)) + (inputColor * fogFactor);
  var outputAlpha = mix(inputAlpha, 1.0, fogFactor);
  return vec4<f32>(outputColor, outputAlpha);
}

// *****************************************************************************************************************
// CALC DECALS
// *****************************************************************************************************************
fn CalcDecals(fragPos: vec3<f32>) -> vec4<f32>
{
  var decalsColor = vec4(0.0, 0.0, 0.0, 0.0);
  for (var i: u32 = 0; i < u32(SCENE_INFOS.DECAL_COUNT); i++)
  {
    if (MESH_INFOS.ID.g == DECALS[i].GROUP)
    {
      decalsColor += CalcDecal(DECALS[i], fragPos);
    }
  }

  return decalsColor;
}

// *****************************************************************************************************************
// CALC DECAL
// *****************************************************************************************************************
fn CalcDecal(decal: Decal, fragPos: vec3<f32>) -> vec4<f32>
{
  var ctrlColor = vec4(1.0, 1.0, 1.0, 1.0);
  var clipPos = decal.VP_MATRIX * vec4<f32>(fragPos, 1.0);
  if (clipPos.z < -1.0 || clipPos.z > 1.0)
  {
    ctrlColor = vec4(0.0, 0.0, 0.0, 0.0);
  }

  var ndcPos = vec3<f32>(clipPos.xyz / clipPos.w).xy * decal.ASPECT_RATIO;
  if (ndcPos.x < -1.0 || ndcPos.x > 1.0 || ndcPos.y < -1.0 || ndcPos.y > 1.0)
  {
    ctrlColor = vec4(0.0, 0.0, 0.0, 0.0);
  }

  var uvx = ndcPos.x * 0.5 + 0.5;
  uvx = (uvx * decal.TEXTURE_WIDTH) + decal.TEXTURE_LEFT;

  var uvy = 1.0 - (ndcPos.y * 0.5 + 0.5);
  uvy = (uvy * decal.TEXTURE_HEIGHT) + decal.TEXTURE_TOP;

  var texColor = textureSample(DECAL_ATLAS_TEXTURE, DECAL_ATLAS_SAMPLER, vec2<f32>(uvx, uvy));
  texColor.a = max(texColor.a - (1.0 - decal.OPACITY), 0.0);
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
  var viewDir = normalize(SCENE_INFOS.CAMERA_POS - fragPos);
  var rvec = normalize(reflect(viewDir, normal));
  return textureSample(MAT_ENV_MAP_TEXTURE, MAT_ENV_MAP_SAMPLER, vec3<f32>(rvec.x, rvec.y, rvec.z));
}

// *****************************************************************************************************************
// CALC DISPLACEMENT MAP
// *****************************************************************************************************************
fn CalcDisplacementMap(textureUV: vec2<f32>) -> vec2<f32>
{
  var offset = vec2(0.0, 0.0);
  var greyScale = textureSample(MAT_DISPLACEMENT_TEXTURE, MAT_DISPLACEMENT_SAMPLER, textureUV).r;
  offset.x = clamp(MAT_PARAMS.DISPLACEMENT_MAP_FACTOR * ((greyScale * 2) - 1), 0.0, 1.0);
  offset.y = clamp(MAT_PARAMS.DISPLACEMENT_MAP_FACTOR * ((greyScale * 2) - 1), 0.0, 1.0);
  return offset;
}

// *****************************************************************************************************************
// CALC LIGHTS
// *****************************************************************************************************************
fn CalcLights(normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var totalLight = vec4(0.0, 0.0, 0.0, 0.0);
  var matEmissive = MAT_COLORS.EMISSIVE * MAT_PARAMS.EMISSIVE_FACTOR;

  if (DIR_LIGHT.ENABLED == 1.0 && (DIR_LIGHT.MESH_ID == 0.0 || DIR_LIGHT.MESH_ID == MESH_INFOS.ID.b))
  {
    totalLight += CalcDirLight(normal, fragPos, textureUV, shadow);
  }

  for (var i: u32 = 0; i < u32(SCENE_INFOS.POINT_LIGHT_COUNT); i++)
  {
    if (POINT_LIGHTS[i].MESH_ID == 0.0 || POINT_LIGHTS[i].MESH_ID == MESH_INFOS.ID.b) {
      totalLight += CalcPointLight(POINT_LIGHTS[i], normal, fragPos, textureUV, shadow);
    }
  }

  for (var i: u32 = 0; i < u32(SCENE_INFOS.SPOT_LIGHT_COUNT); i++)
  {
    if (SPOT_LIGHTS[i].MESH_ID == 0.0 || SPOT_LIGHTS[i].MESH_ID == MESH_INFOS.ID.b) {
      totalLight += CalcSpotLight(SPOT_LIGHTS[i], normal, fragPos, textureUV, shadow);
    }
  }

  if (MAT_PARAMS.HAS_EMISSIVE_MAP == 1.0)
  {
    matEmissive = textureSample(MAT_EMISSIVE_TEXTURE, MAT_EMISSIVE_SAMPLER, textureUV).rgb * MAT_PARAMS.EMISSIVE_FACTOR;
  }

  if (length(matEmissive) > 0)
  {
    return vec4(matEmissive, 1.0);
  }

  return totalLight + vec4(SCENE_INFOS.AMBIENT_COLOR, 1.0);
}

// *****************************************************************************************************************
// CALC LIGHT INTERNAL
// *****************************************************************************************************************
fn CalcLightInternal(lightDir: vec3<f32>, lightDiffuse: vec3<f32>, lightSpecular: vec3<f32>, lightIntensity: f32, normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var diffuseColor = vec3(0.0, 0.0, 0.0);
  var specularColor = vec3(0.0, 0.0, 0.0);
  var matDiffuse = MAT_COLORS.DIFFUSE;
  var matSpecular = MAT_COLORS.SPECULAR;
  var matShininess = MAT_PARAMS.SHININESS;
  var diffuseFactor = max(dot(normal, -lightDir), 0.0);

  if (MAT_PARAMS.HAS_DIFFUSE_MAP == 1.0)
  {
    matDiffuse = textureSample(MAT_DIFFUSE_TEXTURE, MAT_DIFFUSE_SAMPLER, textureUV).rgb;
  }

  if (MAT_PARAMS.HAS_SPECULAR_MAP == 1.0)
  {
    matSpecular = textureSample(MAT_SPECULAR_TEXTURE, MAT_SPECULAR_SAMPLER, textureUV).rgb;
    matShininess = textureSample(MAT_SPECULAR_TEXTURE, MAT_SPECULAR_SAMPLER, textureUV).a;
  }

  if (diffuseFactor > 0.0)
  {
    diffuseColor = lightDiffuse * lightIntensity * matDiffuse * diffuseFactor;
    if (matShininess > 0.0)
    {
      var reflectDir = reflect(lightDir, normal);
      var viewDir = normalize(SCENE_INFOS.CAMERA_POS - fragPos);
      var specularFactor = max(dot(viewDir, reflectDir), 0.0);
      if (specularFactor > 0.0)
      {
        specularFactor = pow(specularFactor, matShininess);
        specularColor = lightSpecular * lightIntensity * matSpecular * specularFactor;
      }
    }
  }

  return vec4((diffuseColor * shadow) + (specularColor * shadow), 1.0);
}

// *****************************************************************************************************************
// CALC DIR LIGHT
// *****************************************************************************************************************
fn CalcDirLight(normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = normalize(DIR_LIGHT.DIR);
  return CalcLightInternal(lightDir, DIR_LIGHT.DIFFUSE, DIR_LIGHT.SPECULAR, DIR_LIGHT.INTENSITY, normal, fragPos, textureUV, shadow);
}

// *****************************************************************************************************************
// CALC POINT LIGHT
// *****************************************************************************************************************
fn CalcPointLight(light: PointLight, normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = fragPos - light.POSITION;
  var distance = length(lightDir);

  var color = CalcLightInternal(normalize(lightDir), light.DIFFUSE, light.SPECULAR, light.INTENSITY, normal, fragPos, textureUV, shadow);
  var attenuation = light.ATTEN[0] + light.ATTEN[1] * distance + light.ATTEN[2] * distance * distance;
  return color / attenuation;
}

// *****************************************************************************************************************
// CALC SPOT LIGHT
// *****************************************************************************************************************
fn CalcSpotLight(light: SpotLight, normal: vec3<f32>, fragPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = fragPos - light.POSITION;
  var normLightDir = normalize(lightDir);
  var distance = length(lightDir);
  var spotFactor = dot(normLightDir, normalize(light.DIRECTION));
  var color = CalcLightInternal(normalize(lightDir), light.DIFFUSE, light.SPECULAR, light.INTENSITY, normal, fragPos, textureUV, shadow);

  if (spotFactor > light.CUTOFF)
  {
    var attenuation = light.ATTEN[0] + light.ATTEN[1] * distance + light.ATTEN[2] * distance * distance;
    var spotIntensity = (1.0 - (1.0 - spotFactor) / (1.0 - light.CUTOFF));
    return (color / attenuation) * spotIntensity;
  }
  else
  {
    return vec4(0.0, 0.0, 0.0, 0.0);
  }
}

// *****************************************************************************************************************
// CALC TOON
// *****************************************************************************************************************
fn CalcToon(normal: vec3<f32>, fragPos: vec3<f32>, shadow: f32) -> vec4<f32>
{
  var n = normalize(normal);
  var lightDir = normalize(MAT_TOON_LIGHT_DIR);
  var viewDir = normalize(SCENE_INFOS.CAMERA_POS - fragPos);
  var s = max(dot(n, -lightDir), 0.0);
  var t = max(dot(n, viewDir), 0.0);
  var color = textureSample(MAT_TOON_TEXTURE, MAT_TOON_SAMPLER, vec2<f32>(s, t));
  return color * shadow;
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
}

// *****************************************************************************************************************
// CALC VOLUMETRIC
// *****************************************************************************************************************
fn CalcVolumetric(inputAlpha: f32, normal: vec3<f32>, fragPos: vec3<f32>) -> f32
{
  var viewDelta = SCENE_INFOS.CAMERA_POS - fragPos;
  var viewDir = normalize(SCENE_INFOS.CAMERA_POS - fragPos);
  var facing = max(dot(viewDir, normal), 0.0);
  var outputAlpha = inputAlpha;

  if (MAT_PARAMS.FACING_ALPHA_BLEND < 1.0)
  {
    var IOR = 1.0 - log(1.0 - MAT_PARAMS.FACING_ALPHA_BLEND);
    outputAlpha *= pow(facing, IOR);
  }

  if (MAT_PARAMS.DISTANCE_ALPHA_BLEND != 0.0)
  {
    var len = clamp(length(viewDelta) - MAT_PARAMS.DISTANCE_ALPHA_BLEND, 0.0, 1.0);
    outputAlpha *= len;
  }
  
  return outputAlpha;
}

// *****************************************************************************************************************
// CALC DISSOLVE
// *****************************************************************************************************************
fn CalcDissolve(textureUV: vec2<f32>) -> f32
{
  var dissolve = textureSample(MAT_DISSOLVE_TEXTURE, MAT_DISSOLVE_SAMPLER, textureUV).r * 0.999;
  var isVisible = dissolve - MAT_PARAMS.DISSOLVE_AMOUNT;
  if (isVisible < 0)
  {
    discard;
  }

  var edge = MAT_PARAMS.DISSOLVE_GLOW_RANGE + MAT_PARAMS.DISSOLVE_GLOW_FALLOFF;
  var away = MAT_PARAMS.DISSOLVE_GLOW_RANGE;
  return smoothstep(edge, away, isVisible);
}`;