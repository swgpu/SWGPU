# Screen

A screen in a game like "start-screen", "menu-screen", "game-screen" or "pause-screen.
It is your top-level classes with methods for updating, drawing, entering, exiting.
## Constructors
* **new Screen**(): Screen   
## Methods
* **draw**(): void   
* **isBlocking**(): boolean   
* **onBringToBack**(newScreen: Screen): void   
  * **newScreen**: The new top level screen.
* **onBringToFront**(oldScreen: Screen): void   
  * **oldScreen**: The previous top level screen.
* **onEnter**(args: any): Promise   
  * **args**: Used to pass any additional arguments or data to the "onEnter" method.
* **onExit**(): void   
* **setBlocking**(blocking: boolean): void   
  * **blocking**: Determines whether the screen execution should be blocked or not.
* **update**(ts: number): void   
  * **ts**: The timestep.
