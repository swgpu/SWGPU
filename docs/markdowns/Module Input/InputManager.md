# InputManager

Singleton input manager.
Handle various sources such as keyboard, mouse and gamepad.
It emit 'E_ACTION_ONCE' with data { actionId }.
It emit 'E_ACTION' with data { actionId }.
It emit 'E_ACTION_RELEASED' with data { actionId }
It emit 'E_MOUSE_DOWN' with data { buttons }
It emit 'E_MOUSE_UP'
It emit 'E_MOUSE_MOVE' with data { movementX, movementY }
It emit 'E_MOUSE_DRAG' with data { movementX, movementY }
It emit 'E_MOUSE_WHEEL' with data { delta }
It emit 'E_POINTER_LOCK_CHANGED' with data { lockChanged }
It emit 'E_GAMEPAD_CONNECTED' with data { id }
It emit 'E_GAMEPAD_DISCONNECTED' with data { id }
It emit 'E_GAMEPAD_REMOVED' with data { id }

Default actions table:
■ ACTION => KEYBOARD => GAMEPAD
■ OK => Enter => 0
■ BACK => Escape => 1
■ SELECT => Space => BtnSelect
■ LEFT => ArrowLeft => PadLeft
■ RIGHT => ArrowRight => PadRight
■ UP => ArrowUp => PadTop
■ DOWN => ArrowDown => PadBottom
## Constructors
* **new InputManager**(): InputManager   
## Methods
* **getDragDelta**(): vec2   
* **getMousePosition**(): vec2   
* **getMouseWheel**(): number   
* **getPad**(index: number)   
  * **index**: The index of the pad.
* **getPadAxis**(index: number, axis: number): number   
  * **index**: The index of the pad.
  * **axis**: The index of the pad.
* **isActiveAction**(actionId: string)   
  * **actionId**: The action identifier.
* **isActiveActions**(actionIds: string[]): boolean   
  * **actionIds**: The action identifier.
* **isJustActiveAction**(actionId: string): boolean   
  * **actionId**: The action identifier.
* **isJustActiveActions**(actionIds: string[]): boolean   
  * **actionIds**: The action identifier.
* **isMouseDown**(): boolean   
* **isPointerLockCaptured**(): boolean   
* **isPointerLockEnabled**(): boolean   
* **registerAction**(inputSource: InputSource, eventKey: string, actionId: string): void   
  * **inputSource**: The device from which the input is received.
  * **eventKey**: The key or button that triggers the action.
  * **actionId**: The unique action identifier.
* **removePad**(id: string): void   
  * **id**: The unique identifier of the pad
* **setPointerLockEnabled**(enabled: boolean): void   
  * **enabled**: The enabled flag.
* **unregisterAction**(inputSource: InputSource, eventKey: string): void   
  * **inputSource**: The device from which the input is received.
  * **eventKey**: The key or button that triggers the action.
* **update**(ts: number): void   
  * **ts**: The timestep.
