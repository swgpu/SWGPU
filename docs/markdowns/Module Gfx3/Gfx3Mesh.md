# Gfx3Mesh

A 3D base mesh object.
- inherit from: Gfx3Drawable
- parent of: Gfx3MeshJAM, Gfx3MeshJSM, Gfx3MeshOBJ
## Constructors
* **new Gfx3Mesh**(): Gfx3Mesh   
## Methods
* **clone**(mesh: Gfx3Mesh, transformMatrix: mat4): Gfx3Mesh   
  * **mesh**: The copy object.
  * **transformMatrix**: The transformation matrix.
* **delete**(keepMat: boolean): void   
  * **keepMat**: Determines if the material is deleted or not.
* **draw**(): void   
* **getGeo**(): MeshBuild   
* **getMaterial**(): Gfx3Material   
* **getShadowCasting**(): boolean   
* **isBillboard**(): boolean   
* **setBillboard**(billboard: boolean): void   
  * **billboard**: Determines if object is a billboard.
* **setMaterial**(material: Gfx3Material, keepMat: boolean): void   
  * **material**: The material.
  * **keepMat**: Determines whether to keep the current material or delete it before assigning the new material.
* **setShadowCasting**(shadowCasting: boolean): void   
  * **shadowCasting**: Determines if object cast shadows.
* **update**(ts: number): void   
  * **ts**: The timestep.
* *static* **buildVertices**(vertexCount: number, coords: number[], texcoords: number[], colors: number[], normals: number[], groups: Group[]): MeshBuild   
  * **vertexCount**: The total number of vertices in the mesh.
  * **coords**: A list of vertex coordinates.
  * **texcoords**: A list of vertex texture coordinates.
  * **colors**: A list of vertex color.
  * **normals**: A list of vertex normal.
  * **groups**: A list of vertex group.
