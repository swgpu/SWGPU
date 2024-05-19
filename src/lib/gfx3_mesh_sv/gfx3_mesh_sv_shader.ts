// import { SHADER_VERTEX_ATTR_COUNT } from '../gfx3_mesh/gfx3_mesh_shader';

// export const MESH_SHADOW_UNIFORM_ATTR_COUNT = 1;

// export const MESH_SV_PIPELINE_DESC: any = {
//   label: 'Mesh Shadow Volume pipeline',
//   layout: 'auto',
//   vertex: {
//     entryPoint: 'main',
//     buffers: [{
//       arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
//       attributes: [{
//         shaderLocation: 0, /* position */
//         offset: 0,
//         format: 'float32x3'
//       },{
//         shaderLocation: 1, /* color */
//         offset: 3 * 4,
//         format: 'float32x3'
//       }]
//     }]
//   },
//   primitive: {
//     topology: 'triangle-list',
//     cullMode: 'back',
//     frontFace: 'ccw'
//   },
//   depthStencil: {
//     depthWriteEnabled: true,
//     depthCompare: 'less',
//     format: 'depth32float'
//   }
// };

// export const MESH_SV_VERTEX_SHADER = `
// struct VertexOutput {
//   @builtin(position) Position: vec4<f32>,
//   @location(0) FragPos: vec3<f32>,
//   @location(1) FragColor: vec3<f32>
// }

// @group(0) @binding(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;

// @vertex
// fn main(
//   @location(0) Position: vec4<f32>,
//   @location(1) Color: vec3<f32>
// ) -> VertexOutput {
//   var output: VertexOutput;
//   output.Position = MVPC_MATRIX * Position;
//   output.FragColor = Color;
//   return output;
// }`;

// export const FRAGMENT_SHADER = /* wgsl */`
// @group(1) @binding(0) var<uniform> MESH_INFOS: MeshInfos;
// @group(0) @binding(0) var<uniform> CAMERA_POS: vec3<f32>;
// @group(0) @binding(1) var<uniform> DIR_LIGHT: DirLight;
// @group(0) @binding(2) var<uniform> FOG: Fog;
// @group(0) @binding(3) var<uniform> POINT_LIGHT_COUNT: u32;
// @group(0) @binding(4) var<uniform> POINT_LIGHTS: array<PointLight, ${MAX_POINT_LIGHTS}>;
// @group(0) @binding(5) var<uniform> DECAL_COUNT: u32;
// @group(0) @binding(6) var<uniform> DECALS: array<Decal, ${MAX_DECALS}>;
// @group(0) @binding(8) var DECAL_ATLAS_TEXTURE: texture_2d<f32>;
// @group(0) @binding(9) var DECAL_ATLAS_SAMPLER: sampler;
// @group(0) @binding(10) var SHADOW_MAP_TEXTURE: texture_depth_2d;
// @group(0) @binding(11) var SHADOW_MAP_SAMPLER: sampler_comparison;
// @group(2) @binding(0) var<uniform> MAT_COLORS: MaterialColors;
// @group(2) @binding(1) var<uniform> MAT_PARAMS: MaterialParams;
// @group(2) @binding(2) var<uniform> MAT_UVS: MaterialUvs;
// @group(3) @binding(0) var MAT_TEXTURE: texture_2d<f32>;
// @group(3) @binding(1) var MAT_SAMPLER: sampler;
// @group(3) @binding(2) var MAT_DISPLACEMENT_TEXTURE: texture_2d<f32>;
// @group(3) @binding(3) var MAT_DISPLACEMENT_SAMPLER: sampler;
// @group(3) @binding(4) var MAT_DIFFUSE_TEXTURE: texture_2d<f32>;
// @group(3) @binding(5) var MAT_DIFFUSE_SAMPLER: sampler;
// @group(3) @binding(6) var MAT_SPECULAR_TEXTURE: texture_2d<f32>;
// @group(3) @binding(7) var MAT_SPECULAR_SAMPLER: sampler;
// @group(3) @binding(8) var MAT_EMISSIVE_TEXTURE: texture_2d<f32>;
// @group(3) @binding(9) var MAT_EMISSIVE_SAMPLER: sampler;
// @group(3) @binding(10) var MAT_NORM_TEXTURE: texture_2d<f32>;
// @group(3) @binding(11) var MAT_NORM_SAMPLER: sampler;
// @group(3) @binding(12) var MAT_ENV_MAP_TEXTURE: texture_cube<f32>;
// @group(3) @binding(13) var MAT_ENV_MAP_SAMPLER: sampler;

// @fragment
// fn main(
//   @builtin(position) Position: vec4<f32>,
//   @location(0) FragPos: vec3<f32>,
//   @location(1) FragUV: vec2<f32>,
//   @location(2) FragColor: vec3<f32>,
//   @location(3) FragNormal: vec3<f32>,
//   @location(4) FragTangent: vec3<f32>,
//   @location(5) FragBinormal: vec3<f32>,
//   @location(6) FragShadowPos: vec3<f32>
// ) -> FragOutput {
//   var normal = normalize(FragNormal);
//   var outputColor = vec4(0.0, 0.0, 0.0, 1.0);
//   var texel = vec4(1.0, 1.0, 1.0, 1.0);
//   var textureUV = MAT_UVS.TEXTURE_SCROLL + MAT_UVS.TEXTURE_OFFSET + FragUV;
//   var output: FragOutput;
//   output.Base = outputColor;
//   output.Normal = vec4(normalize(FragNormal), 1.0);
//   output.Id = MESH_INFOS.ID;
//   return output;
// }`;