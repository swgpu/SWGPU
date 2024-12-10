# Gfx3MeshJSM

A 3D static mesh.
- inherit from: Gfx3Mesh
## Constructors
- **new Gfx3MeshJSM**(): Gfx3MeshJSM   
## Methods
- **clone**(jsm: Gfx3MeshJSM, transformMatrix: mat4): Gfx3MeshJSM   
Clone the object.
   - **jsm**: The copy object.
   - **transformMatrix**: The transformation matrix.

- **loadFromFile**(path: string): Promise   
Load asynchronously static mesh data from a json file (jsm).
   - **path**: The file path.
