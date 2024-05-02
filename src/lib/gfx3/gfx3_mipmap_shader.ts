export const SHADER_CODE = `
struct VSOutput {
  @builtin(position) position: vec4f,
  @location(0) texcoord: vec2f,
};

@vertex fn vs(
  @builtin(vertex_index) vertexIndex : u32
) -> VSOutput {
  let pos = array(

    vec2f( 0.0,  0.0),  // centre
    vec2f( 1.0,  0.0),  // à droite, au centre
    vec2f( 0.0,  1.0),  // centre, haut

    // 2ème triangle
    vec2f( 0.0,  1.0),  // centre, haut
    vec2f( 1.0,  0.0),  // à droite, au centre
    vec2f( 1.0,  1.0),  // En haut à droite
  );

  var vsOutput: VSOutput;
  let xy = pos[vertexIndex];
  vsOutput.position = vec4f(xy * 2.0 - 1.0, 0.0, 1.0);
  vsOutput.texcoord = vec2f(xy.x, 1.0 - xy.y);
  return vsOutput;
}

@group(0) @binding(0) var ourSampler: sampler;
@group(0) @binding(1) var ourTexture: texture_2d<f32>;

@fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
  return textureSample(ourTexture, ourSampler, fsInput.texcoord);
}`;