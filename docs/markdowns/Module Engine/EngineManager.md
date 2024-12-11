# EngineManager

Singleton managing the main loop engine.
## Constructors
* **new EngineManager**(): EngineManager   
## Methods
* **loadPack2D**(path: string): Promise   
  * **path**: The archive file path.
* **loadPack3D**(path: string): Promise   
  * **path**: The archive file path.
* **run**(timeStamp: number): void   
  * **timeStamp**
* **setFrameRateFixed**(fixed: boolean): void   
  * **fixed**: The boolean flag.
* **setFrameRateValue**(value: number): void   
  * **value**: The fps value.
* **startup**(enableScanlines: boolean, showDebug: boolean): void   
  * **enableScanlines**: Determines whether scanlines should be enabled or not.
  * **showDebug**: Determines whether to display debug information.
