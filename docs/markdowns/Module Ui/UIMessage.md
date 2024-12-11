# UIMessage

A UI widget displaying a bottom fixed dialog widget with picture, text and author name.
It emit 'E_PRINT_FINISHED'
It emit 'E_OK'
- inherit from: UIWidget
## Constructors
* **new UIMessage**(): UIMessage   
## Methods
* **onAction**(actionId: string): void   
  * **actionId**
* **setAuthor**(author: string): void   
  * **author**: The name of the author.
* **setPicture**(pictureFile: string): void   
  * **pictureFile**: The file path of the picture that you want to set.
* **setStepDuration**(stepDuration: number): void   
  * **stepDuration**: The duration of a text update.
* **setText**(text: string): void   
  * **text**: The dialog text.
* **update**(ts: number): void   
  * **ts**: The timestep.
