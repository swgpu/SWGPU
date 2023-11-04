import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_mesh_shader';

export const MESH_SHADOW_UNIFORM_ATTR_COUNT = 1;

export const MESH_SHADOW_PIPELINE_DESC: any = {
  label: 'Mesh Shadow pipeline',
  layout: 'auto',
  vertex: {
    entryPoint: 'main',
    buffers: [{
      arrayStride: SHADER_VERTEX_ATTR_COUNT * 4,
      attributes: [{
        shaderLocation: 0, /* position */
        offset: 0,
        format: 'float32x3'
      }]
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
    format: 'depth32float'
  }
};

export const MESH_SHADOW_VERTEX_SHADER = `
@group(0) @binding(0) var<uniform> LVP_MATRIX: mat4x4<f32>;
@group(0) @binding(1) var<uniform> M_MATRIX: mat4x4<f32>;

@vertex
fn main(
  @location(0) position: vec3<f32>
) -> @builtin(position) vec4<f32> {
  return LVP_MATRIX * M_MATRIX * vec4(position, 1.0);
}`;