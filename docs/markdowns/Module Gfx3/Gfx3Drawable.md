# Gfx3Drawable

A 3D drawable object.
- inherit from: Gfx3Transformable
- parent of: Gfx3Flare, Gfx3Mesh, Gfx3Particles, Gfx3ShadowVolume, Gfx3Skybox, Gfx3Sprite
## Constructors
* **new Gfx3Drawable**(vertexStride: number): Gfx3Drawable   
  * **vertexStride**: The number of attributes for each vertex.
## Methods
* **beginVertices**(vertexCount: number): void   
  * **vertexCount**: The number of vertices.
* **clone**(drawable: Gfx3Drawable, transformMatrix: mat4): Gfx3Drawable   
  * **drawable**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **defineVertex**(v: number[]): void   
  * **v**: The attributes data of the vertex.
* **delete**(): void   
* **draw**(): void   
* **endVertices**(): void   
* **getBoundingBox**(): Gfx3BoundingBox   
* **getId**(): vec4   
* **getStringId**(): string   
* **getVertexCount**(): number   
* **getVertexSubBufferOffset**(): number   
* **getVertexSubBufferSize**(): number   
* **getVertices**()   
* **getWorldBoundingBox**(): Gfx3BoundingBox   
* **setBoundingBox**(boundingBox: Gfx3BoundingBox): void   
  * **boundingBox**: The bounding box.
* **setId**(r: number, g: number, b: number, a: number): void   
  * **r**: The pur identifier you can use for custom stuff.
  * **g**: The decals group.
  * **b**: The lights group.
  * **a**: The flags value for specials effects.
* **setSingleId**(index: number, value: number): void   
  * **index**: The component index.
  * **value**: The identifier value.
* **setVertices**(vertices: number[]): void   
  * **vertices**: The list of vertices.
* **update**(ts: number): void   
  * **ts**: The timestep.
