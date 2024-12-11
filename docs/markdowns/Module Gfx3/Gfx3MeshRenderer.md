# Gfx3MeshRenderer

Singleton mesh renderer.
- inherit from: Gfx3RendererAbstract
## Constructors
* **new Gfx3MeshRenderer**(): Gfx3MeshRenderer   
## Methods
* **drawDecal**(group: number, sx: number, sy: number, sw: number, sh: number, position: vec3, orientationX: vec3, orientationY: vec3, orientationZ: vec3, size: vec3, opacity: number): void   
  * **group**: The group target (mesh is identified by its 'g' id component).
  * **sx**: The x-coordinate of the decal sprite in the atlas texture.
  * **sy**: The y-coordinate of the decal sprite in the atlas texture.
  * **sw**: The width of the decal sprite in the atlas texture.
  * **sh**: The height of the decal sprite in the atlas texture.
  * **position**: The position of projector (center).
  * **orientationX**: The x-axis orientation of the projector.
  * **orientationY**: The y-axis orientation of the projector.
  * **orientationZ**: The z-axis orientation of the projector.
  * **size**: The size (width, height, depth) of the projector.
  * **opacity**: The opacity or transparency of the decal.
* **drawDirLight**(direction: vec3, diffuse: vec3, specular: vec3, intensity: number, meshId: number): void   
  * **direction**: The direction.
  * **diffuse**: The diffuse color.
  * **specular**: The specular color.
  * **intensity**: The strength or brightness.
  * **meshId**: The mesh id targeted (0 affect all mesh).
* **drawMesh**(mesh: Gfx3Mesh, matrix): void   
  * **mesh**: The mesh.
  * **matrix**: The transformation matrix.
* **drawPointLight**(position: vec3, diffuse: vec3, specular: vec3, intensity: number, meshId: number, constant: number, linear: number, exp: number): void   
  * **position**: The position.
  * **diffuse**: The diffuse color.
  * **specular**: The specular color.
  * **intensity**: The brightness or strength.
  * **meshId**: The mesh id targeted (0 affect all mesh).
  * **constant**: The constant attenuation factor of the point light.
  * **linear**: The linear attenuation factor of the point light.
  * **exp**: The exponent of the attenuation equation for the point light.
* **drawSpotLight**(position: vec3, direction: vec3, cutoff: number, diffuse: vec3, specular: vec3, intensity: number, meshId: number, constant: number, linear: number, exp: number): void   
  * **position**: The position.
  * **direction**: The direction.
  * **cutoff**: The aperture angle of light.
  * **diffuse**: The diffuse color.
  * **specular**: The specular color.
  * **intensity**: The brightness or strength.
  * **meshId**: The mesh id targeted (0 affect all mesh).
  * **constant**: The constant attenuation factor of the point light.
  * **linear**: The linear attenuation factor of the point light.
  * **exp**: The exponent of the attenuation equation for the point light.
* **enableFog**(enabled: boolean, from: vec3, color: vec3, near: number, far: number): void   
  * **enabled**: Indicating whether the fog is enabled or not.
  * **from**: The fog origin point.
  * **color**: The fog color.
  * **near**: The distance from the camera at which the fog starts to appear.
  * **far**: The distance from the camera at which the fog effect should start to fade out.
* **enableShadow**(enabled: boolean): void   
  * **enabled**: Indicating whether the shadow should be enabled or disabled.
* **getCustomParam**(name: string): number   
  * **name**: The param name.
* **render**(ts: number): void   
  * **ts**
* **setAmbientColor**(ambientColor: vec3): void   
  * **ambientColor**: The ambient color.
* **setCustomParam**(name: string, value: number): void   
  * **name**: The param name.
  * **value**: The param value.
* **setCustomTextures**(textures): void   
  * **textures**: The textures list.
* **setDecalAtlas**(decalAtlas: Gfx3Texture): void   
  * **decalAtlas**: The decal texture atlas.
