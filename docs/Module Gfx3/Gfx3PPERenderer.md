# Gfx3PPERenderer

Singleton post-processing effects renderer.
- inherit from: Gfx3RendererAbstract
## Constructors
- **new Gfx3PPERenderer**(): Gfx3PPERenderer   
## Methods
- **$handleWindowResize**(): void   

- **getParam**(index: number): number   
Returns the specified param value.
   - **index**

- **getSourceTexture**(): GPUTexture   
Returns the source texture.
Note: This instance is responsible to create the source texture used to rendering the previous pass.
This way, it is easy to chain multiple effects.

- **loadPipeline**(fragmentShader: string, params: number[]): void   
Load a new ppe pipeline, pretty cool when you want your own post-process effects.
Note: Please, be careful to include these uniforms in your fragment shader, they are required:

struct Params {
// the place for your params
};

@group(0) @binding(0) var<uniform> PARAMS: Params;
@group(0) @binding(1) var<uniform> SIZE: vec2<f32>;
@group(0) @binding(2) var SOURCE_TEXTURE: texture_2d<f32>;
@group(0) @binding(3) var SOURCE_SAMPLER: sampler;
@group(0) @binding(4) var NORMALS_TEXTURE: texture_2d<f32>;
@group(0) @binding(5) var NORMALS_SAMPLER: sampler;
@group(0) @binding(6) var IDS_TEXTURE: texture_2d<f32>;
@group(0) @binding(7) var IDS_SAMPLER: sampler;
@group(0) @binding(8) var DEPTH_TEXTURE: texture_2d<f32>;
@group(0) @binding(9) var DEPTH_SAMPLER: sampler;
   - **fragmentShader**: The fragment shader code.
   - **params**: The params values.

- **render**(destinationTexture: GPUTexture): void   
The render function.
   - **destinationTexture**

- **setParam**(index: number, value: number): void   
Set a parameter value.
   - **index**: The param index.
   - **value**: The value.
