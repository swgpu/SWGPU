import { eventManager } from '../core/event_manager';
import { UIWidget } from './ui_widget';

/**
 * Singleton UI manager.
 */
class UIManager {
  root: HTMLDivElement;
  fadeLayer: HTMLDivElement;
  overLayer: HTMLDivElement;
  focusedWidget: UIWidget | null;
  widgets: Array<UIWidget>;

  constructor() {
    this.root = <HTMLDivElement>document.getElementById('UI_ROOT');
    this.fadeLayer = <HTMLDivElement>document.getElementById('UI_FADELAYER');
    this.overLayer = <HTMLDivElement>document.getElementById('UI_OVERLAYER');
    this.focusedWidget = null;
    this.widgets = [];
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (let widget of this.widgets) {
      widget.update(ts);
    }
  }

  /**
   * Returns all widgets.
   */
  getWidgets(): Array<UIWidget> {
    return this.widgets;
  }

  /**
   * Give the focuses to a widget and unfocuses the currently focused (if any).
   * It emit 'E_FOCUSED' event.
   * 
   * @param {UIWidget} widget - The widget.
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
   * Remove focus from the currently focused widget (if any).
   * It emit 'E_UNFOCUSED' event.
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
   * Appends an HTML element to the root element.
   * 
   * @param {HTMLElement} node - The HTML element.
   * @param {string} [styles] - The CSS styles that you want to apply to the node.
   */
  addNode(node: HTMLElement, styles: string = ''): void {
    node.style.cssText += styles;
    this.root.appendChild(node);
  }

  /**
   * Removes an HTML element from the root element.
   * 
   * @param {HTMLElement} node - The HTML element.
   */
  removeNode(node: HTMLElement): void {
    this.root.removeChild(node);
  }

  /**
   * Add a widget and returns it.
   * 
   * @param {UIWidget} widget - The widget.
   * @param {string} [styles] - The CSS styles to be applied to the widget.
   */
  addWidget(widget: UIWidget, styles: string = ''): UIWidget {
    widget.appendStyles(styles);
    this.root.appendChild(widget.getNode());
    this.widgets.push(widget);
    return widget;
  }

  /**
   * Removes a widget.
   * 
   * @param {UIWidget} widget - The  widget.
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
   * Remove all nodes and widgets.
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
   * Fade in the screen.
   * 
   * @param {number} delay - The amount of time to wait before starting the fade-in (in milliseconds).
   * @param {number} ms - The duration of the fade-in (in milliseconds).
   * @param {string} [color=#000] - The fade-in color.
   * @param {string} [transitionTimingFunction=linear] - Determines how the intermediate values are calculated during the transition.
   * @param {Function} cb - The callback function that will be executed after the fade-in is complete.
   */
  fadeIn(delay: number, ms: number, color: string = '#000', transitionTimingFunction: string = 'linear', cb: Function = () => { }): void {
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.backgroundColor = color;
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = '1';
    setTimeout(() => { cb(); }, delay + ms);
  }

  /**
   * Fade out the screen.
   * 
   * @param {number} delay - The amount of time to wait before starting the fade-out (in milliseconds).
   * @param {number} ms - The duration of the fade-out (in milliseconds).
   * @param {string} [transitionTimingFunction=linear] - Determines how the intermediate values are calculated during the transition.
   * @param {Function} cb - The callback function that will be executed after the fade-out is complete.
   */
  fadeOut(delay: number, ms: number, transitionTimingFunction: string = 'linear', cb: Function = () => { }): void {
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = '0';
    setTimeout(() => { cb(); }, delay + ms);
  }

  /**
   * Enable the overlayer.
   * 
   * @param {boolean} enable - Indicating whether to enable or disable the overlayer.
   */
  enableOverlayer(enable: boolean) {
    this.overLayer.style.opacity = (enable) ? '1' : '0';
  }

  /**
   * Set class to the root ui element.
   * 
   * @param {string} className - The list of classes.
   */
  setClassName(className: string): void {
    this.root.className = className;
  }
}

export { UIManager };
export const uiManager = new UIManager();