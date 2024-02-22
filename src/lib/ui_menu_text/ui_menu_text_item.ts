import { UIWidget } from '../ui/ui_widget';

/**
 * A UI widget displaying a simple menu text item.
 */
class UIMenuTextItem extends UIWidget {
  constructor() {
    super({
      className: 'UIMenuTextItem'
    });
  }

  /**
   * Set the text.
   * 
   * @param {string} text - The text.
   */
  setText(text: string): void {
    this.node.textContent = text;
  }
}

export { UIMenuTextItem };