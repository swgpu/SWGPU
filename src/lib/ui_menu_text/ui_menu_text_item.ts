import { UIWidget } from '../ui/ui_widget';

/**
 * The `UIMenuTextItem` is a class that represents a text item in a UI menu and provides
 * a method to set the text content of the item.
 */
class UIMenuTextItem extends UIWidget {
  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIMenuTextItem'
    });
  }

  /**
   * The "setText" function sets the text property.
   * @param {string} text - The `text` content.
   */
  setText(text: string): void {
    this.node.textContent = text;
  }
}

export { UIMenuTextItem };