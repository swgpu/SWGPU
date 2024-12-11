# Gfx3MeshOBJ

A 3D obj wavefront mesh object.
Note: In fact this mesh is composed by multiple sub-meshes, one by "object".
So, you can choose to manipulate them individually or together with that top-level mesh.

OBJ Options:
- Multiple meshes.
- Optionnal Vertex Normals
- Optionnal Vertex Colors
- Smooth Groups

MTL Options:
- Kd => Diffuse
- Ks => Specular
- Ns => Specularity
- Ke => Emissive
- d  => Opacity
- map_Kd => Albedo map
- map_Ns => Specularity map
- map_Bump => Normal map
- inherit from: Gfx3Mesh
## Constructors
* **new Gfx3MeshOBJ**(): Gfx3MeshOBJ   
## Methods
* **clone**(obj: Gfx3MeshOBJ, transformMatrix: mat4): Gfx3MeshOBJ   
  * **obj**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **delete**(): void   
* **draw**(): void   
* **getBoundingBox**(): Gfx3BoundingBox   
* **getMesh**(name: string): Gfx3Mesh   
  * **name**: The name.
* **getMeshes**(): IterableIterator   
* **getObject**(name: string): OBJObject   
  * **name**: The name.
* **getVertexCount**(): number   
* **getVertices**()   
* **getWorldBoundingBox**(): Gfx3BoundingBox   
* **loadFromFile**(objPath: string, mtlPath: string): Promise   
  * **objPath**: The obj file path.
  * **mtlPath**: The mtl file path.
* **update**(ts: number): void   
  * **ts**: The timestep.
