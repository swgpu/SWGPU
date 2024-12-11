# CoreManager

Singleton core manager.
Used to set the size and resolution of the top-level container.
It emit 'E_RESIZE'
## Constructors
* **new CoreManager**(): CoreManager   
## Methods
* **addClass**(className: string): void   
  * **className**: The class name.
* **enableScanlines**(enabled: boolean): void   
  * **enabled**: Indicating whether scanlines should be enabled or disable.
* **getResolution**(): vec2   
* **getSize**(): vec2   
* **removeClass**(className: string): void   
  * **className**: The class name.
* **setSize**(resWidth: number, resHeight: number, sizeMode: SizeMode): void   
  * **resWidth**: The width of the container in pixels.
  * **resHeight**: The height of the container in pixels.
  * **sizeMode**: Determines how the container fit the browser window (in some cases, there is desynchro between container size and resolution size).
* **toggleClass**(className: string): void   
  * **className**: The class name.
