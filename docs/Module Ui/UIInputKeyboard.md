# UIInputKeyboard

A UI widget displaying a virtual keyboard.
It emit 'E_VALUE_CHANGED' with data { value }
- inherit from: UIWidget
## Constructors
- **new UIInputKeyboard**(): UIInputKeyboard   
## Methods
- **$moveCursor**(direction): void   
   - **direction**

- **focus**(): void   
Focus on.

- **onAction**(actionId: string): void   
The onAction function.
It emits an 'E_VALUE_CHANGED' event when the action is 'OK'.
   - **actionId**

- **setValue**(value: string): void   
Set the input value.
   - **value**: The value.

- **unfocus**(): void   
Focus off.
