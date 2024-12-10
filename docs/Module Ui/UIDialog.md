# UIDialog

A UI widget for displaying a bottom fixed dialog box with text and author name.
It emit 'E_PRINT_FINISHED'
It emit 'E_OK'
- inherit from: UIWidget
## Constructors
- **new UIDialog**(): UIDialog   
## Methods
- **$handleClick**(): void   

- **onAction**(actionId: string): void   
The onAction function.
It emits an 'E_OK' event if the actionId is 'OK' and text is finished.
   - **actionId**

- **setAuthor**(author: string): void   
Set the dialog author name's.
   - **author**: The name of the author.

- **setStepDuration**(stepDuration: number): void   
Set the text speed.
   - **stepDuration**: The duration of a text update.

- **setText**(text: string): void   
Set the dialog text.
   - **text**: The dialog text.

- **update**(ts: number): void   
The "update" function.
   - **ts**: The timestep.
