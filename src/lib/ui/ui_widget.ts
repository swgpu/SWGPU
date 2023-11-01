import { eventManager } from '../core/event_manager';
import { inputManager } from '../input/input_manager';

/**
 * The `UIWidget` class represents a UI element base class with various properties and
 * methods for managing its behavior and appearance.
 * It contains methods to set focus, visibility, enabled flag, selected flag, position, animation and
 * capture action events.
 */
class UIWidget {
  id: string;
  className: string;
  template: string;
  node: HTMLDivElement;

  /**
   * The constructor.
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
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    // virtual method called during update phase !
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.node.remove();
    eventManager.unsubscribe(inputManager, 'E_ACTION', this);
  }

  /**
   * The "getId" function returns the `ìd` property.
   * @returns The `ìd`property.
   */
  getId(): string {
    return this.id;
  }

  /**
   * The "setId" function sets the id property.
   * @param {string} id - A string representing the unique identifier to be set.
   */
  setId(id: string): void {
    this.id = id;
    this.node.id = id;
  }

  /**
   * The "getNode" function returns the root `node` HTMLElement of the widget.
   * @returns The `node` property.
   */
  getNode(): HTMLDivElement {
    return this.node;
  }

  /**
   * The "appendChild" function appends a given HTML element as a child to the widget node.
   * @param {HTMLElement} child - The `child` parameter is an instance of the `HTMLElement` class. It
   * represents an HTML element that you want to append to the widget node.
   */
  appendChild(child: HTMLElement): void {
    this.node.appendChild(child);
  }

  /**
   * The "removeChild" function removes a child element from the widget node.
   * @param {number} index - The index parameter is the position of the child element that you want to
   * remove from the widget node.
   */
  removeChild(index: number): void {
    this.node.removeChild(this.node.children[index]);
  }
  
  /**
   * The "appendStyles" function appends CSS styles to the `node` HTMLElement.
   * @param {string} styles - The `styles` parameter is a string that represents CSS styles that you want
   * to append to the `cssText` property of the `node` object.
   */
  appendStyles(styles: string): void {
    this.node.style.cssText += styles;
  }

  /**
   * The "focus" function adds `u-focused` class to the `node` HTMLElement.
   * It emits a 'E_FOCUSED' event and subscribes to input action event.
   */
  focus(): void {
    this.node.classList.add('u-focused');
    eventManager.emit(this, 'E_FOCUSED');
    eventManager.subscribe(inputManager, 'E_ACTION', this, (data: any) => this.onAction(data.actionId));
  }

  /**
   * The "unfocus" function removes the `u-focused` class from the `node` HTMLElement.
   * It emits an 'E_UNFOCUSED' event and unsubscribes the inputManager from input action event.
   */
  unfocus(): void {
    this.node.classList.remove('u-focused');
    eventManager.emit(this, 'E_UNFOCUSED');
    eventManager.unsubscribe(inputManager, 'E_ACTION', this);
  }

  /**
   * The "isFocused" function checks if widget is focused.
   * @returns A boolean value indicating if widget is focused or not.
   */
  isFocused(): boolean {
    return this.node.classList.contains('u-focused');
  }

  /**
   * The "setVisible" function sets the visibility state.
   * Nota bene: toggle the `u-hidden` class on `node`.
   * @param {boolean} visible - The `visible` parameter is a boolean value that determines whether the
   * element should be visible or hidden. If `visible` is true, the element will be displayed, otherwise
   * it will be hidden.
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
   * The "isVisible" function checks if the widget is visible.
   * @returns A boolean value indicating if widget is visible or not.
   */
  isVisible(): boolean {
    return !this.node.classList.contains('u-hidden');
  }

  /**
   * The "setEnabled" function sets the enabled state flag.
   * It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
   * Nota bene: toggle the `u-disabled` class on `node`.
   * @param {boolean} enabled - The `enabled` parameter is a boolean value that determines whether the
   * widget is enabled or disabled.
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
   * The "isEnabled" function checks if widget is enabled or not.
   * @returns A boolean value indicating if the widget is enabled or not.
   */
    isEnabled(): boolean {
    return !this.node.classList.contains('u-disabled');
  }

  /**
   * The "setSelected" function sets the selected state flag.
   * It is just to expose a convenient option to the user, this flag has not effect on the UI manager.
   * Nota bene: toggle the `u-selected` class on `node`.
   * @param {boolean} selected - The `selected` parameter is a boolean value that indicates whether the
   * element should be selected or not.
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
   * The "isSelected" function checks if widget is selected or not.
   * @returns A boolean value indicating if the widget is selected or not.
   */
  isSelected(): boolean {
    return this.node.classList.contains('u-selected');
  }

  /**
   * The "getScreenPosition" function returns the left and top coordinates of the widget `node` HTMLElement on
   * the screen.
   * @returns The screen position.
   */
  getScreenPosition(): vec2 {
    let rect = this.node.getBoundingClientRect();
    return [rect.left, rect.top];
  }

  /**
   * The "getPosition" function returns the relative x and y coordinates of the widget `node` HTMLElement.
   * @returns The x and y coordinates of the node's position.
   */
  getPosition(): vec2 {
    const x = parseInt(this.node.style.left);
    const y = parseInt(this.node.style.top);
    return [x, y];
  }

  /**
   * The "setPosition" function sets the left and top position to the widget `node` HTMLElement.
   * Nota bene: works only if position is `absolute`.
   * @param {number} x - The horizontal position of the element on the page.
   * @param {number} y - The vertical position of the element on the page.
   */
  setPosition(x: number, y: number): void {
    this.node.style.left = x + 'px';
    this.node.style.top = y + 'px';
  }

  /**
   * The "animate" function trigger animation to the widget `node` HTMLElement.
   * @param {string} animation - The `animation` parameter is a string that represents the name of the
   * animation to be applied to the `node` HTMLElement.
   */
  animate(animation: string): void {
    this.node.style.animation = animation;
  }

  /**
   * The "onAction" function is a virtual method that is called when input action event is emitted.
   * @param {string} actionId - The `actionId` parameter is a string that represents the identifier of the
   * action being performed.
   */
  onAction(actionId: string): void {
    // virtual method.
  }
}

export { UIWidget };
