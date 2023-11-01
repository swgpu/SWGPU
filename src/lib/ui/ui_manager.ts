import { eventManager } from '../core/event_manager';
import { UIWidget } from './ui_widget';

/**
 * The `UIManager` is a singleton class manages the user interface by adding, removing, updating, focus and unfocus UI widgets.
 * It controlling screen fade-in/fade-out and overlayer too.
 */
class UIManager {
  root: HTMLDivElement;
  fadeLayer: HTMLDivElement;
  overLayer: HTMLDivElement;
  focusedWidget: UIWidget | null;
  widgets: Array<UIWidget>;

  /**
   * The constructor.
   */
  constructor() {
    this.root = <HTMLDivElement>document.getElementById('UI_ROOT');
    this.fadeLayer = <HTMLDivElement>document.getElementById('UI_FADELAYER');
    this.overLayer = <HTMLDivElement>document.getElementById('UI_OVERLAYER');
    this.focusedWidget = null;
    this.widgets = [];
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    for (let widget of this.widgets) {
      widget.update(ts);
    }
  }

  /**
   * The "getWidgets" function returns all active widgets.
   * @returns All active widgets.
   */
  getWidgets(): Array<UIWidget> {
    return this.widgets;
  }

  /**
   * The "focus" function takes a UIWidget as a parameter, focuses the new widget, unfocuses the
   * currently focused widget (if any) and emits an event indicating that a widget has been focused.
   * @param {UIWidget} widget - The widget to focus.
   */
  focus(widget: UIWidget): void {
    if (this.focusedWidget) {
      this.focusedWidget.unfocus();
    }

    widget.focus();
    this.focusedWidget = widget;
    eventManager.emit(this, 'E_FOCUSED', { widget: widget });
  }

  /**
   * The "unfocus" function is used to remove focus from a widget and emit an event.
   */
  unfocus(): void {
    if (!this.focusedWidget) {
      return;
    }

    this.focusedWidget.unfocus();
    this.focusedWidget = null;
    eventManager.emit(this, 'E_UNFOCUSED');
  }

  /**
   * The "addNode" function appends an HTML element to the root element and applies optional CSS styles to
   * it.
   * @param {HTMLElement} node - The `node` parameter is an HTMLElement object that represents the
   * element you want to add to the DOM (Document Object Model). It can be any valid HTML element such as
   * `<div>`, `<p>`, `<span>`, etc.
   * @param {string} [styles] - The `styles` parameter is a string that represents CSS styles that you
   * want to apply to the `node`. It is optional and has a default value of an empty string.
   */
  addNode(node: HTMLElement, styles: string = ''): void {
    node.style.cssText += styles;
    this.root.appendChild(node);
  }

  /**
   * The "removeNode" function removes a specified HTML element from the root element.
   * @param {HTMLElement} node - The `node` parameter is an `HTMLElement` object that represents the node
   * to be removed from the DOM (Document Object Model).
   */
  removeNode(node: HTMLElement): void {
    this.root.removeChild(node);
  }

  /**
   * The "addWidget" function add a UIWidget to the UIManager. It appends the node widget to the root element,
   * applies optional styles and returns the widget.
   * @param {UIWidget} widget - The `widget` parameter is an instance of the `UIWidget` class. It
   * represents the widget that you want to add to the UI.
   * @param {string} [styles] - The `styles` parameter is a string that represents the CSS styles to be
   * applied to the widget. It is optional and has a default value of an empty string.
   * @returns The added widget.
   */
  addWidget(widget: UIWidget, styles: string = ''): UIWidget {
    widget.appendStyles(styles);
    this.root.appendChild(widget.getNode());
    this.widgets.push(widget);
    return widget;
  }

  /**
   * The "removeWidget" function removes a UIWidget from the UIManager.
   * @param {UIWidget} widget - The  widget to be removed from the UI.
   * @returns - A boolean value that indicating if it is removed or not.
  */
  removeWidget(widget: UIWidget): boolean {
    const index = this.widgets.indexOf(widget);
    if (index == -1) {
      throw new Error('UIManager::removeWidget: fail to remove widget !');
    }

    if (widget == this.focusedWidget) {
      this.unfocus();
    }

    widget.delete();
    this.widgets.splice(index, 1);
    return true;
  }

  /**
   * The "clear" function remove nodes element and deletes all
   * widgets.
   */
  clear(): void {
    this.root.innerHTML = '';
    this.focusedWidget = null;

    while (this.widgets.length > 0) {
      let widget = this.widgets.pop()!;
      widget.delete();
    }
  }

  /**
   * The "fadeIn" function gradually increases the opacity of the fade-layer over a specified duration and
   * delay, using a specified transition timing function, and executes a callback function after the
   * animation is complete.
   * @param {number} delay - The delay parameter is the amount of time in milliseconds to wait before
   * starting the fade-in animation.
   * @param {number} ms - The `ms` parameter represents the duration of the fade-in animation in
   * milliseconds.
   * @param {string} [transitionTimingFunction=linear] - The `transitionTimingFunction` parameter is a
   * string that specifies the timing function to be used for the transition. It determines how the
   * intermediate property values are calculated during the transition. Some common values for this
   * parameter are:
   * @param {Function} cb - The `cb` parameter is a callback function that will be executed after the
   * fade animation is complete. It is optional and defaults to an empty arrow function `() => { }`. You
   * can pass a custom callback function to perform any additional actions after the fade animation
   * finishes.
   */
  fadeIn(delay: number, ms: number, transitionTimingFunction: string = 'linear', cb: Function = () => { }): void {
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = '1';
    setTimeout(() => { cb(); }, delay + ms);
  }

  /**
   * The "fadeOut" function fades out the fade-layer over a specified duration with a specified delay and
   * transition timing function.
   * @param {number} delay - The delay parameter is the amount of time in milliseconds to wait before
   * starting the fade out animation.
   * @param {number} ms - The `ms` parameter represents the duration of the fade-out animation in
   * milliseconds.
   * @param {string} [transitionTimingFunction=linear] - The `transitionTimingFunction` parameter is a
   * string that specifies the timing function to be used for the fade-out animation. It determines how
   * the intermediate property values are calculated during the transition. Some common values for this
   * parameter are:
   * @param {Function} cb - The `cb` parameter is a callback function that will be executed after the
   * fade out animation is complete. It is an optional parameter and if not provided, a default empty
   * function will be used.
   */
  fadeOut(delay: number, ms: number, transitionTimingFunction: string = 'linear', cb: Function = () => { }): void {
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = '0';
    setTimeout(() => { cb(); }, delay + ms);
  }

  /**
   * The "enableOverlayer" function display the over-layer if enable is true, and 0 if enable is false.
   * @param {boolean} enable - A boolean value indicating whether to enable or disable the overlayer.
   */
  enableOverlayer(enable: boolean) {
    this.overLayer.style.opacity = (enable) ? '1' : '0';
  }
}

export { UIManager };
export const uiManager = new UIManager();