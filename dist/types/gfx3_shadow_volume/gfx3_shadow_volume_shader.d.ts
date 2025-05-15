export declare const SHADER_VERTEX_ATTR_COUNT = 6;
export declare const UNIFORM_ATTR_COUNT = 1;
export declare const PIPELINE_CW_DESC: any;
export declare const PIPELINE_CCW_DESC: any;
export declare const VERTEX_SHADER = "\nstruct VertexOutput {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) Color: vec3<f32>\n}\n\n@group(0) @binding(0) var<uniform> MVPC_MATRIX: mat4x4<f32>;\n\n@vertex\nfn main(\n  @location(0) Position: vec4<f32>,\n  @location(1) Color: vec3<f32>\n) -> VertexOutput {\n  var output: VertexOutput;\n  output.Position = MVPC_MATRIX * Position;\n  output.Color = Color;\n  return output;\n}";
export declare const FRAGMENT_SHADER = "\n@fragment\nfn main(\n  @builtin(position) Position: vec4<f32>,\n  @location(0) Color: vec3<f32>\n) -> @location(0) vec4f {\n  return vec4<f32>(Color.r, Color.g, Color.b, 1.0);\n}";
