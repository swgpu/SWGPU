# UIManager

Singleton UI manager.
It emit 'E_FOCUSED' with data { widget }
It emit 'E_UNFOCUSED'
## Constructors
* **new UIManager**(): UIManager   
## Methods
* **addNode**(node: HTMLElement, styles: string): void   
  * **node**: The HTML element.
  * **styles**: The CSS styles that you want to apply to the node.
* **addWidget**(widget: UIWidget, styles: string): UIWidget   
  * **widget**: The widget.
  * **styles**: The CSS styles to be applied to the widget.
* **clear**(): void   
* **enableOverlayer**(enable: boolean): void   
  * **enable**: Indicating whether to enable or disable the overlayer.
* **fadeIn**(delay: number, ms: number, color: string, transitionTimingFunction: string, cb: Function): void   
  * **delay**: The amount of time to wait before starting the fade-in (in milliseconds).
  * **ms**: The duration of the fade-in (in milliseconds).
  * **color**: The fade-in color.
  * **transitionTimingFunction**: Determines how the intermediate values are calculated during the transition.
  * **cb**: The callback function that will be executed after the fade-in is complete.
* **fadeOut**(delay: number, ms: number, transitionTimingFunction: string, cb: Function): void   
  * **delay**: The amount of time to wait before starting the fade-out (in milliseconds).
  * **ms**: The duration of the fade-out (in milliseconds).
  * **transitionTimingFunction**: Determines how the intermediate values are calculated during the transition.
  * **cb**: The callback function that will be executed after the fade-out is complete.
* **focus**(widget: UIWidget): void   
  * **widget**: The widget.
* **getWidgets**()   
* **removeNode**(node: HTMLElement): void   
  * **node**: The HTML element.
* **removeWidget**(widget: UIWidget): boolean   
  * **widget**: The  widget.
* **setClassName**(className: string): void   
  * **className**: The list of classes.
* **unfocus**(): void   
* **update**(ts: number): void   
  * **ts**: The timestep.
