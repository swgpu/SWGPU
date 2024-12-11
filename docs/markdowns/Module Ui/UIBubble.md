# UIBubble

A floating dialog widget (looking as a bubble) with text and optional actions.
It emit 'E_PRINT_FINISHED'
It emit 'E_MENU_ITEM_SELECTED' with data { id, index }
It emit 'E_OK'
- inherit from: UIWidget
## Constructors
* **new UIBubble**(): UIBubble   
## Methods
* **delete**(): void   
* **focus**(): void   
* **onAction**(actionId: string): void   
  * **actionId**
* **setActions**(actions: string[]): void   
  * **actions**: The list of actions.
* **setAuthor**(author: string): void   
  * **author**: The name of the author.
* **setPicture**(pictureFile: string): void   
  * **pictureFile**: The file path of the picture.
* **setStepDuration**(stepDuration: number): void   
  * **stepDuration**: The duration of a text update.
* **setText**(text: string): void   
  * **text**: The dialog text.
* **setWidth**(width: number): void   
  * **width**: The width in pixels.
* **unfocus**(): void   
* **update**(ts: number): void   
  * **ts**: The timestep.
