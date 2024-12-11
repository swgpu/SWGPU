# UIPrint

A UI widget displaying a full screen dialog print with text.
It is ideal for long-text reading.
It emit 'E_PRINT_FINISHED'
It emit 'E_OK'
- inherit from: UIWidget
## Constructors
* **new UIPrint**(): UIPrint   
## Methods
* **onAction**(actionId: string): void   
  * **actionId**
* **setStepDuration**(stepDuration: number): void   
  * **stepDuration**: The duration of a text update.
* **setText**(text: string): void   
  * **text**: The dialog text.
* **update**(ts: number): void   
  * **ts**: The timestep.
