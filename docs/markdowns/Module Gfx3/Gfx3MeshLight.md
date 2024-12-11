# Gfx3MeshLight

A 3D light.
- inherit from: Gfx3Transformable
## Constructors
* **new Gfx3MeshLight**(): Gfx3MeshLight   
## Methods
* **draw**(): void   
* **getConstant**(): number   
* **getCutoff**(): number   
* **getDiffuse**(): vec3   
* **getDirection**(): vec3   
* **getExp**(): number   
* **getIntensity**(): number   
* **getLinear**(): number   
* **getMeshId**(): number   
* **getRadius**(): number   
* **getSpecular**(): vec3   
* **getType**(): LightType   
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **setConstant**(constant: number): void   
  * **constant**: The constant value.
* **setCutoff**(cutoff: number): void   
  * **cutoff**: The cutoff angle.
* **setDiffuse**(r: number, g: number, b: number): void   
  * **r**: The red channel.
  * **g**: The green channel.
  * **b**: The blue channel.
* **setDirection**(x: number, y: number, z: number): void   
  * **x**: The x direction.
  * **y**: The y direction.
  * **z**: The z direction.
* **setExp**(exp: number): void   
  * **exp**: The exp value.
* **setIntensity**(intensity: number): void   
  * **intensity**: The intensity value.
* **setLinear**(linear: number): void   
  * **linear**: The linear value.
* **setMeshId**(meshId: number): void   
  * **meshId**: The mesh id.
* **setRadius**(radius: number): void   
  * **radius**: The radius.
* **setSpecular**(r: number, g: number, b: number): void   
  * **r**: The red channel.
  * **g**: The green channel.
  * **b**: The blue channel.
* **setType**(type: LightType): void   
  * **type**: The type.
