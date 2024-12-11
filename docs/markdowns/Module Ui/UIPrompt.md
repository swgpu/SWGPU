# UIPrompt

A UI widget displaying prompt with a text content and a menu of actions.
It emit 'E_ITEM_SELECTED' with data { id, index }
- inherit from: UIWidget
## Constructors
* **new UIPrompt**(): UIPrompt   
## Methods
* **addAction**(id: string, text: string): void   
  * **id**: The unique identifier.
  * **text**: The text or label.
* **clearActions**(): void   
* **delete**(): void   
* **focus**(): void   
* **removeAction**(id: string): void   
  * **id**: The unique identifier.
* **setText**(text: string): void   
  * **text**: The text content.
* **unfocus**(): void   
* **update**(ts: number): void   
  * **ts**: The timestep.
