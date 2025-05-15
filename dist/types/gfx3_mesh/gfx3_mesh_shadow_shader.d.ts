export declare const UNIFORM_ATTR_COUNT = 1;
export declare const PIPELINE_DESC: any;
export declare const VERTEX_SHADER = "\n@group(0) @binding(0) var<uniform> LVP_MATRIX: mat4x4<f32>;\n@group(0) @binding(1) var<uniform> M_MATRIX: mat4x4<f32>;\n\n@vertex\nfn main(\n  @location(0) position: vec3<f32>\n) -> @builtin(position) vec4<f32> {\n  return LVP_MATRIX * M_MATRIX * vec4(position, 1.0);\n}";
