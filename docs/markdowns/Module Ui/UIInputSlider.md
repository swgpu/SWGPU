# UIInputSlider

A UI widget displaying a slider input.
It emit 'E_VALUE_CHANGED' with data { value }
- inherit from: UIWidget
## Constructors
* **new UIInputSlider**(): UIInputSlider   
## Methods
* **onAction**(actionId: string): void   
  * **actionId**
* **setMax**(max: number): void   
  * **max**: The maximum value.
* **setMin**(min: number): void   
  * **min**: The minimum value.
* **setStep**(step: number): void   
  * **step**: The increment or decrement value for the range input.
* **setValue**(value: number): void   
  * **value**: The value.
