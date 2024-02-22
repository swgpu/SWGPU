import { UIMenu } from '../ui_menu/ui_menu';
import { MenuAxis } from '../ui_menu/ui_menu';
import { UIMenuTextItem } from './ui_menu_text_item';

/**
 * A UI widget displaying a simple text menu.
 * It send same events as UIMenu.
 */
class UIMenuText extends UIMenu {
  /**
   * @param options - Various options for configuring the behavior of the menu.
   */
  constructor(options: { axis?: MenuAxis, className?: string } = {}) {
    super(Object.assign(options, {
      className: options.className ?? 'UIMenuText'
    }));
  }

  /**
   * Add text item.
   * 
   * @param {string} id - The unique identifier of the item.
   * @param {string} text - The text content.
   */
  add(id: string, text: string): void {
    const item = new UIMenuTextItem();
    item.setId(id);
    item.setText(text);
    this.addWidget(item);
  }

  /**
   * Set the text of a menu item.
   * 
   * @param {string} id - The unique identifier of the item.
   * @param {string} text - The text content.
   */
  set(id: string, text: string): void {
    const item = this.widgets.find(w => w.getId() == id) as UIMenuTextItem;
    if (!item) {
      throw new Error('UIMenuText::set(): item not found !');
    }

    item.setText(text);
  }

  /**
   * Removes an item.
   * 
   * @param {string} id - The unique identifier of the item.
   */
  remove(id: string): void {
    const widgetIndex = this.widgets.findIndex(w => w.getId() == id);
    if (widgetIndex == -1) {
      throw new Error('UIMenuText::remove(): item not found !');
    }

    this.removeWidget(widgetIndex);
  }

  /**
   * Returns the selected widget ID as a string or null.
   */
  getSelectedId(): string | null {
    return this.getSelectedWidgetId();
  }
}

export { UIMenuText };