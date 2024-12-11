# Gfx3MeshShadowRenderer

Abstract class for all 3D renderer.
- inherit from: Gfx3RendererAbstract
## Constructors
* **new Gfx3MeshShadowRenderer**(): Gfx3MeshShadowRenderer   
## Methods
* **drawMesh**(mesh: Gfx3Mesh, matrix): void   
  * **mesh**: The mesh.
  * **matrix**: The transformation matrix.
* **getDepthTexture**(): Gfx3Texture   
* **getLVPMatrix**(): Float32Array   
* **render**(): void   
* **setDepthTextureSize**(depthTextureSize: number): void   
  * **depthTextureSize**: The size.
* **setShadowProjection**(position: vec3, target: vec3, size: number, depth: number): void   
  * **position**: The position of shadow coming from.
  * **target**: Determine the direction in which the shadow is pointing.
  * **size**: Determines the size of the shadow map that will be generated.
  * **depth**: Determines how far the shadow projection extends in the scene.
