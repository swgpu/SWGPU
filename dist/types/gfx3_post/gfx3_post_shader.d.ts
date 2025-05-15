export declare const SHADER_VERTEX_ATTR_COUNT = 4;
export declare const SLOT_NAMES: string[];
export declare const PIPELINE_DESC: any;
export declare const VERTEX_SHADER = "\nstruct VertexOutput {\n  @builtin(position) Position: vec4<f32>,\n  @location(0) FragUV: vec2<f32>\n};\n\n@vertex\nfn main(\n  @location(0) Position: vec2<f32>,\n  @location(1) TexUV: vec2<f32>\n) -> VertexOutput {\n  var output: VertexOutput;\n  output.Position = vec4(Position, 0.0, 1.0);\n  output.FragUV = TexUV;\n  return output;\n}";
export declare const FRAGMENT_SHADER: string;
