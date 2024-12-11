# ScreenManager

Singleton screen manager.
Note: requestPush, requestSet and requestPop are all asynchronously method and will be executed safely in the update loop.
## Constructors
* **new ScreenManager**(): ScreenManager   
## Methods
* **draw**(): void   
* **requestPopScreen**(): void   
* **requestPushScreen**(newScreen: Screen, args: any): void   
  * **newScreen**: The screen.
  * **args**: Arguments that are passed to the new screen onEnter method.
* **requestSetScreen**(newScreen: Screen, args: any): void   
  * **newScreen**: The screen.
  * **args**: Arguments that are passed to the new screen onEnter method.
* **update**(ts: number): void   
  * **ts**: The timestep.
