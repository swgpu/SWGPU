import { UIMenu } from '../ui_menu/ui_menu';
import { MenuAxis } from '../ui_menu/ui_menu';
import { UIMenuTextItem } from './ui_menu_text_item';

/**
 * The `UIMenuText` class is a subclass of UIMenu that provides methods for adding, setting, and removing
 * text items from a UI menu.
 */
class UIMenuText extends UIMenu {
  /**
   * The constructor.
   * @param options - An object containing various options for configuring the behavior of the menu.
   */
  constructor(options: { axis?: MenuAxis, className?: string } = {}) {
    super(Object.assign(options, {
      className: options.className ?? 'UIMenuText'
    }));
  }

  /**
   * The "add" function creates a new UIMenuTextItem with the given id and text, and adds it to the menu.
   * @param {string} id - The "id" parameter is a string that represents the unique identifier for the
   * menu item. It is used to distinguish between different menu items.
   * @param {string} text - The "text" parameter is a string that represents the text content of the menu
   * item. It is the text that will be displayed on the menu item when it is rendered.
   */
  add(id: string, text: string): void {
    const item = new UIMenuTextItem();
    item.setId(id);
    item.setText(text);
    this.addWidget(item);
  }

  /**
   * The "set" function sets the text of a UIMenuTextItem identified by its id.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * widget. It is used to find the widget in the `widgets` array.
   * @param {string} text - The `text` parameter is a string that represents the new text value that you
   * want to set for the `UIMenuTextItem`.
   */
  set(id: string, text: string): void {
    const item = this.widgets.find(w => w.getId() == id) as UIMenuTextItem;
    if (!item) {
      throw new Error('UIMenuText::set(): item not found !');
    }

    item.setText(text);
  }

  /**
   * The "remove" function removes a widget from the menu.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * widget that needs to be removed.
   */
  remove(id: string): void {
    const widgetIndex = this.widgets.findIndex(w => w.getId() == id);
    if (widgetIndex == -1) {
      throw new Error('UIMenuText::remove(): item not found !');
    }

    this.removeWidget(widgetIndex);
  }

  /**
   * The "getSelectedId" function returns the selected widget ID as a string or null.
   * @returns a string or null value.
   */
  getSelectedId(): string | null {
    return this.getSelectedWidgetId();
  }
}

export { UIMenuText };