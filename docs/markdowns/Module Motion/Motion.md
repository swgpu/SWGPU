# Motion

Is used to move along a serie of points.
It emit 'E_FINISHED'
## Constructors
* **new Motion**(points: vec3[], looped: boolean): Motion   
  * **points**: The serie of points.
  * **looped**: Determine if path is closed, if closed then motion running in loop.
## Methods
* **getCurrentMove**(): vec3   
* **getCurrentMoveX**(): number   
* **getCurrentMoveY**(): number   
* **getCurrentMoveZ**(): number   
* **getCurrentPosition**(): vec3   
* **getCurrentPositionX**(): number   
* **getCurrentPositionY**(): number   
* **getCurrentPositionZ**(): number   
* **getCurrentRotationY**(): number   
* **getCurrentRotationZ**(): number   
* **getCurrentSegmentTime**(): number   
* **getNextPoint**(): vec3   
* **getNextPointIndex**(): number   
* **getPrevPoint**(): vec3   
* **getPrevPointIndex**(): number   
* **getVertices**()   
* **isRunning**(): boolean   
* **loadFromBinaryFile**(path: string): Promise   
  * **path**: The file path.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **run**(): void   
* **setPoints**(points: vec3[]): void   
  * **points**: The points.
* **setSpeed**(speed: number): void   
  * **speed**: The moving speed.
* **stop**(): void   
* **update**(ts: number): void   
  * **ts**: The timestep.
