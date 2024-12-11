# UIDialog

A UI widget for displaying a bottom fixed dialog box with text and author name.
It emit 'E_PRINT_FINISHED'
It emit 'E_OK'
- inherit from: UIWidget
## Constructors
* **new UIDialog**(): UIDialog   
## Methods
* **onAction**(actionId: string): void   
  * **actionId**
* **setAuthor**(author: string): void   
  * **author**: The name of the author.
* **setStepDuration**(stepDuration: number): void   
  * **stepDuration**: The duration of a text update.
* **setText**(text: string): void   
  * **text**: The dialog text.
* **update**(ts: number): void   
  * **ts**: The timestep.
