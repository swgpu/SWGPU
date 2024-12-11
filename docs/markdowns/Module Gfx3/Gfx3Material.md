# Gfx3Material

The material of a surface.
It emit 'E_FINISHED' (on texture animation end)
## Constructors
* **new Gfx3Material**(options: MATOptions): Gfx3Material   
  * **options**: The options to configure the material.
## Methods
* **delete**(): void   
* **enableDecal**(enabled: boolean): void   
  * **enabled**: Indicating whether decals should be enabled or disabled.
* **enableShadow**(enabled: boolean): void   
  * **enabled**: Indicating whether the shadow should be enabled or disabled.
* **getCustomParam**(name: string): number   
  * **name**: The param name.
* **getCustomTexture0**(): Gfx3Texture   
* **getCustomTexture1**(): Gfx3Texture   
* **getDiffuseMap**(): Gfx3Texture   
* **getDisplacementMap**(): Gfx3Texture   
* **getEmissiveMap**(): Gfx3Texture   
* **getEnvMap**(): Gfx3Texture   
* **getGroup02**(): Gfx3StaticGroup   
* **getGroup03**(): Gfx3StaticGroup   
* **getNormalMap**(): Gfx3Texture   
* **getSpecularMap**(): Gfx3Texture   
* **getTexture**(): Gfx3Texture   
* **getToonMap**(): Gfx3Texture   
* **playAnimation**(animationName: string, looped: boolean, preventSameAnimation: boolean): void   
  * **animationName**: The name of the animation to be played.
  * **looped**: Determines whether the animation should loop or not.
  * **preventSameAnimation**: Determines whether the same animation should be prevented from playing again.
* **resetAnimation**(): void   
* **setAmbient**(r: number, g: number, b: number): void   
  * **r**: The red component.
  * **g**: The green component.
  * **b**: The blue component.
* **setCustomParam**(name: string, value: number): void   
  * **name**: The param name.
  * **value**: The param value.
* **setCustomTextures**(textures): void   
  * **textures**: The textures list.
* **setDiffuse**(r: number, g: number, b: number): void   
  * **r**: The red component.
  * **g**: The green component.
  * **b**: The blue component.
* **setDiffuseMap**(diffuseMap: Gfx3Texture): void   
  * **diffuseMap**: The diffuse texture map.
* **setDisplacementMap**(displacementMap: Gfx3Texture, angle: number, rate: number, factor: number): void   
  * **displacementMap**: The displacement map texture.
  * **angle**: The angle at which the texture will be scrolled (in radians).
  * **rate**: The scrolling rate of the texture.
  * **factor**: The strength or intensity of the displacement effect.
* **setEmissive**(r: number, g: number, b: number, a: number): void   
  * **r**: The red component.
  * **g**: The green component.
  * **b**: The blue component.
  * **a**: The emissive factor.
* **setEmissiveFactor**(emissiveFactor: number): void   
  * **emissiveFactor**: The factor of emission color (0-1)
* **setEmissiveMap**(emissiveMap: Gfx3Texture): void   
  * **emissiveMap**: The emissive texture map.
* **setEnvMap**(envMap: Gfx3Texture): void   
  * **envMap**: The env texture map.
* **setLightning**(lightning: boolean): void   
  * **lightning**: Indicates if light is applied or not to the material.
* **setNormalIntensity**(normalIntensity: number): void   
  * **normalIntensity**: The normal intensity.
* **setNormalMap**(normalMap: Gfx3Texture): void   
  * **normalMap**: The normal texture map.
* **setOpacity**(opacity: number): void   
  * **opacity**: The opacity (from 0 to 1).
* **setShininess**(shininess: number): void   
  * **shininess**: The shininess/specularity value (0-1)
* **setSpecular**(r: number, g: number, b: number): void   
  * **r**: The red component.
  * **g**: The green component.
  * **b**: The blue component.
* **setSpecularMap**(specularMap: Gfx3Texture): void   
  * **specularMap**: The specular texture map.
* **setSpecularity**(specularity: number): void   
  * **specularity**: The level of specularity or shininess.
* **setTexture**(texture: Gfx3Texture, angle: number, rate: number): void   
  * **texture**: The texture.
  * **angle**: The angle at which the texture will be scrolled (in radians).
  * **rate**: The scrolling rate of the texture.
* **setToonBlending**(toonBlending: number): void   
  * **toonBlending**: Enable or disable the blending between texture and toon texture.
* **setToonLightDirection**(direction: vec3): void   
  * **direction**: The toon light direction.
* **setToonMap**(toonMap: Gfx3Texture): void   
  * **toonMap**: The toon texture map.
* **update**(ts: number): void   
  * **ts**
* *static* **createFromFile**(path: string, textureDir: string): Promise   
  * **path**: The file path.
  * **textureDir**
