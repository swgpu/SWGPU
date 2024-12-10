# Gfx3Drawable

A 3D drawable object.
- inherit from: Gfx3Transformable
- parent of: Gfx3Flare, Gfx3Mesh, Gfx3Particles, Gfx3Skybox, Gfx3Sprite
## Constructors
- **new Gfx3Drawable**(vertexStride: number): Gfx3Drawable   
   - **vertexStride**: The number of attributes for each vertex.
## Methods
- **beginVertices**(vertexCount: number): void   
Prepare your vertex buffer to write process.
Warning: You need to call this method before define your vertices.
   - **vertexCount**: The number of vertices.

- **clone**(drawable: Gfx3Drawable, transformMatrix: mat4): Gfx3Drawable   
Clone the object.
   - **drawable**: The copy object.
   - **transformMatrix**: The transformation matrix.

- **defineVertex**(v: number[]): void   
Add a vertex.
   - **v**: The attributes data of the vertex.

- **delete**(): void   
Free all resources.
Warning: You need to call this method to free allocation for this object.

- **draw**(): void   
Virtual draw function.

- **endVertices**(): void   
Close your vertex buffer to write process.

- **getBoundingBox**(): Gfx3BoundingBox   
Returns the bounding box.

- **getId**(): vec4   
Returns the identifier.

- **getStringId**(): string   
Returns the identifier as string.

- **getVertexCount**(): number   
Returns the number of vertices.

- **getVertexSubBufferOffset**(): number   
Returns the vertex sub-buffer offset in the global vertex buffer.
Nota bene: All vertices are stored in one global vertex buffer handled by "Gfx3Manager".
SubBuffer is just a reference offset/size pointing to the big one buffer.

- **getVertexSubBufferSize**(): number   
Returns the byte length of the vertex sub buffer.

- **getVertices**()   
Returns vertices.

- **getWorldBoundingBox**(): Gfx3BoundingBox   
Returns the bounding box in the world space coordinates.

- **setBoundingBox**(boundingBox: Gfx3BoundingBox): void   
Set the bounding box.
   - **boundingBox**: The bounding box.

- **setId**(r: number, g: number, b: number, a: number): void   
Set an identifier based on three components.
Note: WARME use some specials ID's in its internal pipeline, check the table below:
■ decals group: g = n
■ pixelation: r = -1
■ color limitation: g = -1
■ dither: b = -1
■ outline: a = -1
   - **r**: The r integer value.
   - **g**: The g integer value. Used by decals for group identification.
   - **b**: The b integer value.
   - **a**: The a integer value.

- **setVertices**(vertices: number[]): void   
Set vertices.
   - **vertices**: The list of vertices.

- **update**(ts: number): void   
Virtual update function.
   - **ts**: The timestep.
