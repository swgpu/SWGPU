export const MAT_PARAMS_VARS = {
  MAT_S00: 'S00',
  MAT_S01: 'S01',
  MAT_S02: 'S02',
  MAT_S03: 'S03',
  MAT_S04: 'S04',
  MAT_S05: 'S05',
  MAT_S06: 'S06',
  MAT_S07: 'S07',
  MAT_S08: 'S08',
  MAT_S09: 'S09',
  MAT_S10: 'S10',
  MAT_S11: 'S11',
  MAT_S12: 'S12',
  MAT_S13: 'S13',
  MAT_S14: 'S14',
  MAT_S15: 'S15',
};

export const SCENE_PARAMS_VARS = {
  SCENE_S00: 'S00',
  SCENE_S01: 'S01',
  SCENE_S02: 'S02',
  SCENE_S03: 'S03',
  SCENE_S04: 'S04',
  SCENE_S05: 'S05',
  SCENE_S06: 'S06',
  SCENE_S07: 'S07',
  SCENE_S08: 'S08',
  SCENE_S09: 'S09',
  SCENE_S10: 'S10',
  SCENE_S11: 'S11',
  SCENE_S12: 'S12',
  SCENE_S13: 'S13',
  SCENE_S14: 'S14',
  SCENE_S15: 'S15'
};

export const SHADER_INSERTS = {
  VERT_BEGIN: '',
  VERT_END: '',
  FRAG_BEGIN: '',
  FRAG_END: ''
};

export const SHADER_VERTEX_ATTR_COUNT = 17;
export const MAX_POINT_LIGHTS = 64;
export const MAX_SPOT_LIGHTS = 16;
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
    },
    { format: 'rgba16float' }, // normals
    { format: 'rgba16float',   // ids
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
    { format: 'rgba16float', // ch1
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

const STRUCT_MAT_PARAMS = (data: any): string => `
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
  BLEND_COLOR_MODE: f32,
  LIGHT_GROUP: f32,
  DECAL_GROUP: f32,
  EFFECTS: f32,
  ${data.MAT_S00}: f32,
  ${data.MAT_S01}: f32,
  ${data.MAT_S02}: f32,
  ${data.MAT_S03}: f32,
  ${data.MAT_S04}: f32,
  ${data.MAT_S05}: f32,
  ${data.MAT_S06}: f32,
  ${data.MAT_S07}: f32,
  ${data.MAT_S08}: f32,
  ${data.MAT_S09}: f32,
  ${data.MAT_S10}: f32,
  ${data.MAT_S11}: f32,
  ${data.MAT_S12}: f32,
  ${data.MAT_S13}: f32,
  ${data.MAT_S14}: f32,
  ${data.MAT_S15}: f32
};`;

const STRUCT_MAT_JAM_INFOS = `
struct MaterialJamInfos {
  FRAME_INDEX_A: f32,
  FRAME_INDEX_B: f32,
  IS_ANIMATED: f32,
  INTERPOLATED: f32,
  LAST_FRAME_TIME: f32,
  FRAME_DURATION: f32,
  NUM_VERTICES: f32
};`;

const STRUCT_SCENE_INFOS = (data: any): string => `
struct SceneInfos {
  CAMERA_POS_X: f32,
  CAMERA_POS_Y: f32,
  CAMERA_POS_Z: f32,
  AMBIENT_COLOR_R: f32,
  AMBIENT_COLOR_G: f32,
  AMBIENT_COLOR_B: f32,
  POINT_LIGHT_COUNT: f32,
  SPOT_LIGHT_COUNT: f32,
  DECAL_COUNT: f32,
  DELTA_TIME: f32,
  TIME: f32,
  ${data.SCENE_S00}: f32,
  ${data.SCENE_S01}: f32,
  ${data.SCENE_S02}: f32,
  ${data.SCENE_S03}: f32,
  ${data.SCENE_S04}: f32,
  ${data.SCENE_S05}: f32,
  ${data.SCENE_S06}: f32,
  ${data.SCENE_S07}: f32,
  ${data.SCENE_S08}: f32,
  ${data.SCENE_S09}: f32,
  ${data.SCENE_S10}: f32,
  ${data.SCENE_S11}: f32,
  ${data.SCENE_S12}: f32,
  ${data.SCENE_S13}: f32,
  ${data.SCENE_S14}: f32,
  ${data.SCENE_S15}: f32
};`;

const STRUCT_MESH_INFOS = `
struct MeshInfos {
  MVPC_MATRIX: mat4x4<f32>,
  M_MATRIX: mat4x4<f32>,
  NORM_MATRIX: mat3x3<f32>,
  ID: vec4<f32>
};`;

const STRUCT_JAM_FRAME_VERTEX = `
struct JamFrameVertex {
  POSITION: vec3<f32>,
  UV: vec2<f32>,
  COLOR: vec3<f32>,
  NORMAL: vec3<f32>,
  TANGENT: vec3<f32>,
  BITANGENT: vec3<f32>
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

export const VERTEX_SHADER = (data: any): string => /* wgsl */`
${STRUCT_VERTEX_OUTPUT}
${STRUCT_MESH_INFOS}
${STRUCT_MAT_PARAMS(data)}
${STRUCT_SCENE_INFOS(data)}
${STRUCT_JAM_FRAME_VERTEX}
${STRUCT_MAT_JAM_INFOS}

@group(0) @binding(0) var<uniform> SCENE_INFOS: SceneInfos;
@group(0) @binding(1) var<uniform> LVP_MATRIX: mat4x4<f32>;
@group(1) @binding(0) var<uniform> MESH_INFOS: MeshInfos;
@group(2) @binding(1) var<uniform> MAT_PARAMS: MaterialParams;
@group(2) @binding(4) var<uniform> MAT_JAM_INFOS: MaterialJamInfos;
@group(3) @binding(24) var<storage, read> MAT_JAM_FRAMES: array<f32>;

@vertex
fn main(
  @builtin(vertex_index) vertexIndex: u32,
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

  if (MAT_JAM_INFOS.IS_ANIMATED == 1.0)
  {
    var idxA = u32(MAT_JAM_INFOS.FRAME_INDEX_A) * u32(MAT_JAM_INFOS.NUM_VERTICES) * 17;
    var idxB = u32(MAT_JAM_INFOS.FRAME_INDEX_B) * u32(MAT_JAM_INFOS.NUM_VERTICES) * 17;
    var offsetA = (idxA + vertexIndex * 17);
    var offsetB = (idxB + vertexIndex * 17);

    var vax = MAT_JAM_FRAMES[offsetA + 0];
    var vay = MAT_JAM_FRAMES[offsetA + 1];
    var vaz = MAT_JAM_FRAMES[offsetA + 2];
    var vbx = MAT_JAM_FRAMES[offsetB + 0];
    var vby = MAT_JAM_FRAMES[offsetB + 1];
    var vbz = MAT_JAM_FRAMES[offsetB + 2];

    var car = MAT_JAM_FRAMES[offsetA + 5];
    var cag = MAT_JAM_FRAMES[offsetA + 6];
    var cab = MAT_JAM_FRAMES[offsetA + 7];
    var cbr = MAT_JAM_FRAMES[offsetB + 5];
    var cbg = MAT_JAM_FRAMES[offsetB + 6];
    var cbb = MAT_JAM_FRAMES[offsetB + 7];

    var nax = MAT_JAM_FRAMES[offsetA + 8];
    var nay = MAT_JAM_FRAMES[offsetA + 9];
    var naz = MAT_JAM_FRAMES[offsetA + 10];
    var nbx = MAT_JAM_FRAMES[offsetB + 8];
    var nby = MAT_JAM_FRAMES[offsetB + 9];
    var nbz = MAT_JAM_FRAMES[offsetB + 10];

    var tax = MAT_JAM_FRAMES[offsetA + 11];
    var tay = MAT_JAM_FRAMES[offsetA + 12];
    var taz = MAT_JAM_FRAMES[offsetA + 13];
    var tbx = MAT_JAM_FRAMES[offsetB + 11];
    var tby = MAT_JAM_FRAMES[offsetB + 12];
    var tbz = MAT_JAM_FRAMES[offsetB + 13];

    var bax = MAT_JAM_FRAMES[offsetA + 14];
    var bay = MAT_JAM_FRAMES[offsetA + 15];
    var baz = MAT_JAM_FRAMES[offsetA + 16];
    var bbx = MAT_JAM_FRAMES[offsetB + 14];
    var bby = MAT_JAM_FRAMES[offsetB + 15];
    var bbz = MAT_JAM_FRAMES[offsetB + 16];

    var interpolationFactor = min((SCENE_INFOS.TIME - MAT_JAM_INFOS.LAST_FRAME_TIME) / MAT_JAM_INFOS.FRAME_DURATION, 1.0);
    interpolationFactor *= MAT_JAM_INFOS.INTERPOLATED;

    position.x = mix(vax, vbx, interpolationFactor);
    position.y = mix(vay, vby, interpolationFactor);
    position.z = mix(vaz, vbz, interpolationFactor);

    color.r = mix(car, cbr, interpolationFactor);
    color.g = mix(cag, cbg, interpolationFactor);
    color.b = mix(cab, cbb, interpolationFactor);

    normal.x = mix(nax, nbx, interpolationFactor);
    normal.y = mix(nay, nby, interpolationFactor);
    normal.z = mix(naz, nbz, interpolationFactor);

    tangent.x = mix(tax, tbx, interpolationFactor);
    tangent.y = mix(tay, tby, interpolationFactor);
    tangent.z = mix(taz, tbz, interpolationFactor);

    binormal.x = mix(bax, bbx, interpolationFactor);
    binormal.y = mix(bay, bby, interpolationFactor);
    binormal.z = mix(baz, bbz, interpolationFactor);
  }

  var posFromLight = LVP_MATRIX * MESH_INFOS.M_MATRIX * position;

  ${data.VERT_BEGIN}
  var output: VertexOutput;
  output.Position = MESH_INFOS.MVPC_MATRIX * position;
  output.FragPos = vec4(MESH_INFOS.M_MATRIX * position).xyz;
  output.FragUV = texUV;
  output.FragColor = color;
  output.FragNormal = MESH_INFOS.NORM_MATRIX * normal;
  output.FragTangent = MESH_INFOS.NORM_MATRIX * tangent;
  output.FragBinormal = MESH_INFOS.NORM_MATRIX * binormal;
  output.FragShadowPos = vec3(posFromLight.xy * vec2(0.5, -0.5) + vec2(0.5), posFromLight.z); // Convert XY to (0, 1) and Y is flipped because texture coords are Y-down.
  ${data.VERT_END}
  return output;
}`;

const STRUCT_FRAG_OUT = `
struct FragOutput {
  @location(0) Base: vec4f,
  @location(1) Normal: vec4f,
  @location(2) Id: vec4f,
  @location(3) Ch1: vec4f
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
  GROUP: f32
}`;

const STRUCT_SPOT_LIGHT = `
struct SpotLight {
  POSITION: vec3<f32>,
  DIRECTION: vec3<f32>,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  ATTEN: vec3<f32>,
  INTENSITY: f32,
  GROUP: f32,
  CUTOFF: f32
}`;

const STRUCT_DIR_LIGHT = `
struct DirLight {
  DIR: vec3<f32>,
  ENABLED: f32,
  DIFFUSE: vec3<f32>,
  SPECULAR: vec3<f32>,
  INTENSITY: f32,
  GROUP: f32
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

export const FRAGMENT_SHADER = (data: any): string => /* wgsl */`
${STRUCT_FRAG_OUT}
${STRUCT_MESH_INFOS}
${STRUCT_MAT_PARAMS(data)}
${STRUCT_SCENE_INFOS(data)}
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
  var cameraPos = vec3(SCENE_INFOS.CAMERA_POS_X, SCENE_INFOS.CAMERA_POS_Y, SCENE_INFOS.CAMERA_POS_Z);
  var outputColor = vec4(0.0, 0.0, 0.0, 1.0);
  var texel = vec4(1.0, 1.0, 1.0, 1.0);
  var normalUV = FragUV;
  var shadow = 1.0;
  var matS0 = textureSample(MAT_S0_TEXTURE, MAT_S0_SAMPLER, fragUV);
  var matS1 = textureSample(MAT_S1_TEXTURE, MAT_S1_SAMPLER, fragUV);
  var s0 = textureSample(S0_TEXTURE, S0_SAMPLER, fragUV);
  var s1 = textureSample(S1_TEXTURE, S1_SAMPLER, fragUV);

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

  if (MAT_PARAMS.BLEND_COLOR_MODE == 1.0)
  {
    texel *= MAT_COLORS.BLEND;
  }
  else
  {
    texel += MAT_COLORS.BLEND;
  }

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
    var toonColor = CalcToon(fragNormal, fragPos, cameraPos, shadow);
    outputColor = mix(texel, toonColor, MAT_PARAMS.TOON_BLENDING);
  }
  else if (MAT_PARAMS.HAS_LIGHTNING == 1.0)
  {
    var totalLight = CalcLights(fragNormal, fragPos, cameraPos, textureUV, shadow);
    outputColor = texel * totalLight;
  }
  else
  {
    outputColor = texel;
  }

  if (MAT_PARAMS.HAS_ENV_MAP == 1.0)
  {
    outputColor += CalcEnvMap(fragNormal, fragPos, cameraPos);
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

  outputColor.a = CalcVolumetric(outputColor.a, fragNormal, fragPos, cameraPos);
  var flags = u32(MESH_INFOS.ID.b);

  ${data.FRAG_BEGIN}
  var output: FragOutput;

  if ((flags & 64) == 64)
  {
    output.Base = vec4(0.0, 0.0, 0.0, 0.0);
    output.Normal = vec4(normalize(fragNormal), 1.0);
    output.Id = MESH_INFOS.ID;
    output.Ch1 = outputColor;
  }
  else
  {
    output.Base = outputColor;
    output.Normal = vec4(normalize(fragNormal), 1.0);
    output.Id = MESH_INFOS.ID;
    output.Ch1 = vec4(0.0, 0.0, 0.0, 0.0);
  }

  ${data.FRAG_END}
  return output;
}

// *****************************************************************************************************************
// CALC TEXTURE UV
// *****************************************************************************************************************
fn CalcTextureUV(scroll: vec2<f32>, scale: vec2<f32>, fragUV: vec2<f32>, offset: vec2<f32>) -> vec2<f32>
{
  var scrollX = cos(scroll[0]) * scroll[1] * (SCENE_INFOS.TIME * 0.000001);
  var scrollY = sin(scroll[0]) * scroll[1] * (SCENE_INFOS.TIME * 0.000001);
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
    if (MAT_PARAMS.DECAL_GROUP == DECALS[i].GROUP)
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
fn CalcEnvMap(normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>) -> vec4<f32>
{
  var viewDir = normalize(cameraPos - fragPos);
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
fn CalcLights(normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var totalLight = vec4(0.0, 0.0, 0.0, 0.0);
  var matEmissive = MAT_COLORS.EMISSIVE * MAT_PARAMS.EMISSIVE_FACTOR;

  if (DIR_LIGHT.ENABLED == 1.0 && (DIR_LIGHT.GROUP == 0.0 || DIR_LIGHT.GROUP == MAT_PARAMS.LIGHT_GROUP))
  {
    totalLight += CalcDirLight(normal, fragPos, cameraPos, textureUV, shadow);
  }

  for (var i: u32 = 0; i < u32(SCENE_INFOS.POINT_LIGHT_COUNT); i++)
  {
    if (POINT_LIGHTS[i].GROUP == 0.0 || POINT_LIGHTS[i].GROUP == MAT_PARAMS.LIGHT_GROUP) {
      totalLight += CalcPointLight(POINT_LIGHTS[i], normal, fragPos, cameraPos, textureUV, shadow);
    }
  }

  for (var i: u32 = 0; i < u32(SCENE_INFOS.SPOT_LIGHT_COUNT); i++)
  {
    if (SPOT_LIGHTS[i].GROUP == 0.0 || SPOT_LIGHTS[i].GROUP == MAT_PARAMS.LIGHT_GROUP) {
      totalLight += CalcSpotLight(SPOT_LIGHTS[i], normal, fragPos, cameraPos, textureUV, shadow);
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

  return totalLight + vec4(SCENE_INFOS.AMBIENT_COLOR_R, SCENE_INFOS.AMBIENT_COLOR_G, SCENE_INFOS.AMBIENT_COLOR_B, 1.0);
}

// *****************************************************************************************************************
// CALC LIGHT INTERNAL
// *****************************************************************************************************************
fn CalcLightInternal(lightDir: vec3<f32>, lightDiffuse: vec3<f32>, lightSpecular: vec3<f32>, lightIntensity: f32, normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
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
      var viewDir = normalize(cameraPos - fragPos);
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
fn CalcDirLight(normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = normalize(DIR_LIGHT.DIR);
  return CalcLightInternal(lightDir, DIR_LIGHT.DIFFUSE, DIR_LIGHT.SPECULAR, DIR_LIGHT.INTENSITY, normal, fragPos, cameraPos, textureUV, shadow);
}

// *****************************************************************************************************************
// CALC POINT LIGHT
// *****************************************************************************************************************
fn CalcPointLight(light: PointLight, normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = fragPos - light.POSITION;
  var distance = length(lightDir);

  var color = CalcLightInternal(normalize(lightDir), light.DIFFUSE, light.SPECULAR, light.INTENSITY, normal, fragPos, cameraPos, textureUV, shadow);
  var attenuation = light.ATTEN[0] + light.ATTEN[1] * distance + light.ATTEN[2] * distance * distance;
  return color / attenuation;
}

// *****************************************************************************************************************
// CALC SPOT LIGHT
// *****************************************************************************************************************
fn CalcSpotLight(light: SpotLight, normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, textureUV: vec2<f32>, shadow: f32) -> vec4<f32>
{
  var lightDir = fragPos - light.POSITION;
  var normLightDir = normalize(lightDir);
  var distance = length(lightDir);
  var spotFactor = dot(normLightDir, normalize(light.DIRECTION));
  var color = CalcLightInternal(normalize(lightDir), light.DIFFUSE, light.SPECULAR, light.INTENSITY, normal, fragPos, cameraPos, textureUV, shadow);

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
fn CalcToon(normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>, shadow: f32) -> vec4<f32>
{
  var n = normalize(normal);
  var lightDir = normalize(MAT_TOON_LIGHT_DIR);
  var viewDir = normalize(cameraPos - fragPos);
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
fn CalcVolumetric(inputAlpha: f32, normal: vec3<f32>, fragPos: vec3<f32>, cameraPos: vec3<f32>) -> f32
{
  var viewDelta = cameraPos - fragPos;
  var viewDir = normalize(cameraPos - fragPos);
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