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
## Constructors
- **new InputManager**(): InputManager   
## Methods
- **$addPad**(pad: Pad): void   
   - **pad**

- **$handleGamePadConnected**(e: GamepadEvent): void   
   - **e**

- **$handleGamePadDisconnected**(e: GamepadEvent): void   
   - **e**

- **$handleKeyDown**(e: KeyboardEvent): boolean   
   - **e**

- **$handleKeyUp**(e: KeyboardEvent): void   
   - **e**

- **$handlePointerDown**(e: PointerEvent): void   
   - **e**

- **$handlePointerMove**(e: PointerEvent): void   
   - **e**

- **$handlePointerUp**(): void   

- **$handleWheel**(e: WheelEvent): void   
   - **e**

- **$updatePadsStatus**(): void   

- **findActionIds**(inputSource: string, eventKey: string)   
Returns the action list that match the given input source and event key.
   - **inputSource**: The device from which the input is received.
   - **eventKey**: The key or button that triggers the action.

- **getDragDelta**(): vec2   
Returns the current drag movement.

- **getMousePosition**(): vec2   
Returns the mouse position.

- **getMouseWheel**(): number   
Returns the mouse wheel value.

- **getPad**(index: number)   
Returns a pad or undefined if not found.
Note: Pads are automatically added on plug-in.
   - **index**: The index of the pad.

- **isActiveAction**(actionId: string)   
Checks if an action is currently active.
   - **actionId**: The action identifier.

- **isMouseDown**(): boolean   
Checks if mouse click is currently active.

- **registerAction**(inputSource: string, eventKey: string, actionId: string): void   
Add an action mapping.
   - **inputSource**: The device from which the input is received.
   - **eventKey**: The key or button that triggers the action.
   - **actionId**: The unique action identifier.

- **removePad**(id: string): void   
Removes a pad.
   - **id**: The unique identifier of the pad

- **unregisterAction**(inputSource: string, eventKey: string, actionId: string): void   
Remove an action mapping.
   - **inputSource**: The device from which the input is received.
   - **eventKey**: The key or button that triggers the action.
   - **actionId**: The unique action identifier.
