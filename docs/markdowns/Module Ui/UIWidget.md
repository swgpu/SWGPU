# UIWidget

UI Widget base element.
It emit 'E_FOCUSED'
It emit 'E_UNFOCUSED'
It emit 'E_ANIMATION_FINISHED'
- parent of: UIBubble, UIDescriptionList, UIDialog, UIInputKeyboard, UIInputSlider, UIMenu, UIMenuTextItem, UIMessage, UIPrint, UIPrompt, UISprite, UIText
## Constructors
* **new UIWidget**(options): UIWidget   
  * **options**: The options like id, class and the most important, template code !
## Methods
* **animate**(animation: string): void   
  * **animation**: The name of the animation.
* **appendChild**(child: HTMLElement): void   
  * **child**: The child element.
* **appendStyles**(styles: string): void   
  * **styles**: The CSS styles.
* **delete**(): void   
* **focus**(): void   
* **getId**(): string   
* **getNode**(): HTMLDivElement   
* **getPosition**(): vec2   
* **getScreenPosition**(): vec2   
* **isEnabled**(): boolean   
* **isFocused**(): boolean   
* **isSelected**(): boolean   
* **isVisible**(): boolean   
* **onAction**(actionId: string): void   
  * **actionId**: The action identifier.
* **removeChild**(index: number): void   
  * **index**: The position of the child element.
* **setEnabled**(enabled: boolean): void   
  * **enabled**: Determines whether the widget is enabled or disabled.
* **setId**(id: string): void   
  * **id**: The unique identifier of a widget.
* **setPosition**(x: number, y: number): void   
  * **x**: The horizontal position of the element on the page.
  * **y**: The vertical position of the element on the page.
* **setSelected**(selected: boolean): void   
  * **selected**: Indicates whether the element should be selected or not.
* **setVisible**(visible: boolean): void   
  * **visible**: Determines whether the element should be visible or hidden.
* **unfocus**(): void   
* **update**(ts: number): void   
  * **ts**: The timestep.
