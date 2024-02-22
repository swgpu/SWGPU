import { eventManager } from '../core/event_manager';
import { inputManager } from '../input/input_manager';

/**
 * Is a ui element base.
 */
class UIWidget {
  id: string;
  className: string;
  template: string;
  node: HTMLDivElement;

  /**
   * @param options - The options like id, class and the most important, template code !
   */
  constructor(options: { id?: string, className?: string, template?: string } = {}) {
    this.id = options.id ?? '';
    this.className = options.className ?? '';
    this.template = options.template ?? '';
    this.node = document.createElement('div');
    this.node.className = this.className;
    this.node.innerHTML = this.template;

    this.node.addEventListener('animationend', () => eventManager.emit(this, 'E_ANIMATION_FINISHED'));
  }

  /**
   * Virtual update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {}

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.node.remove();
    eventManager.unsubscribe(inputManager, 'E_ACTION', this);
  }

  /**
   * Returns the id.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Set the id value.
   * 
   * @param {string} id - The unique identifier of a widget.
   */
  setId(id: string): void {
    this.id = id;
    this.node.id = id;
  }

  /**
   * Returns the root HTMLElement of the widget.
   */
  getNode(): HTMLDivElement {
    return this.node;
  }

  /**
   * Appends a child element to the root of the widget.
   * 
   * @param {HTMLElement} child - The child element.
   */
  appendChild(child: HTMLElement): void {
    this.node.appendChild(child);
  }

  /**
   * Removes a child element from the root of the widget.
   * 
   * @param {number} index - The position of the child element.
   */
  removeChild(index: number): void {
    this.node.removeChild(this.node.children[index]);
  }
  
  /**
   * Appends CSS styles to the root of the widget.
   * 
   * @param {string} styles - The CSS styles.
   */
  appendStyles(styles: string): void {
    this.node.style.cssText += styles;
  }

  /**
   * Focus on.
   * It set 'u-focused' class to the root of the widget.
   * It emits a 'E_FOCUSED' event and subscribes to input action event.
   */
  focus(): void {
    this.node.classList.add('u-focused');
    eventManager.emit(this, 'E_FOCUSED');
    eventManager.subscribe(inputManager, 'E_ACTION', this, (data: any) => this.onAction(data.actionId));
  }

  /**
   * Focus off.
   * It unset 'u-focused' class to the root of the widget.
   * It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.
   */
  unfocus(): void {
    this.node.classList.remove('u-focused');
    eventManager.emit(this, 'E_UNFOCUSED');
    eventManager.unsubscribe(inputManager, 'E_ACTION', this);
  }

  /**
   * Checks if widget is focused.
   */
  isFocused(): boolean {
    return this.node.classList.contains('u-focused');
  }

  /**
   * Set the visibility state.
   * It toggle the `u-hidden` class to the root of the widget.
   * 
   * @param {boolean} visible - Determines whether the element should be visible or hidden.
   */
  setVisible(visible: boolean): void {
    if (visible) {
      this.node.classList.remove('u-hidden');
    }
    else {
      this.node.classList.add('u-hidden');
    }
  }

  /**
   * Checks if the widget is visible.
   */
  isVisible(): boolean {
    return !this.node.classList.contains('u-hidden');
  }

  /**
   * Set the enabled state flag.
   * It toggle the 'u-disabled' class to the root of the widget.
   * 
   * @param {boolean} enabled - Determines whether the widget is enabled or disabled.
   */
  setEnabled(enabled: boolean): void {
    if (enabled) {
      this.node.classList.remove('u-disabled');
    }
    else {
      this.node.classList.add('u-disabled');
    }
  }

  /**
   * Checks if widget is enabled or not.
   */
  isEnabled(): boolean {
    return !this.node.classList.contains('u-disabled');
  }

  /**
   * Set the selected state flag.
   * It toggle the 'u-selected' class to the root of the widget.
   * 
   * @param {boolean} selected - Indicates whether the element should be selected or not.
   */
  setSelected(selected: boolean): void {
    if (selected) {
      this.node.classList.add('u-selected');
    }
    else {
      this.node.classList.remove('u-selected');
    }
  }

  /**
   * Checks if widget is selected or not.
   */
  isSelected(): boolean {
    return this.node.classList.contains('u-selected');
  }

  /**
   * Returns the left and top client-coordinates of the widget on the screen.
   */
  getScreenPosition(): vec2 {
    let rect = this.node.getBoundingClientRect();
    return [rect.left, rect.top];
  }

  /**
   * Returns the relative x and y coordinates of the widget.
   */
  getPosition(): vec2 {
    const x = parseInt(this.node.style.left);
    const y = parseInt(this.node.style.top);
    return [x, y];
  }

  /**
   * Set the left and top position to the widget.
   * Note: Works only if position is absolute.
   * 
   * @param {number} x - The horizontal position of the element on the page.
   * @param {number} y - The vertical position of the element on the page.
   */
  setPosition(x: number, y: number): void {
    this.node.style.left = x + 'px';
    this.node.style.top = y + 'px';
  }

  /**
   * Trigger animation to the widget root element.
   * 
   * @param {string} animation - The name of the animation.
   */
  animate(animation: string): void {
    this.node.style.animation = animation;
  }

  /**
   * Virtual method that is called when input action event is emitted.
   * 
   * @param {string} actionId - The action identifier.
   */
  onAction(actionId: string): void {}
}

export { UIWidget };
