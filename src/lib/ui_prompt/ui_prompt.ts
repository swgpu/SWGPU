import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';
import { MenuAxis } from '../ui_menu/ui_menu';
import { UIMenuText } from '../ui_menu_text/ui_menu_text';

/**
 * The `UIPrompt` class represents a user interface prompt with a text content and a menu of actions.
 */
class UIPrompt extends UIWidget {
  uiMenu: UIMenuText;

  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIPrompt',
      template: `
      <div class="UIPrompt-text js-text"></div>
      <div class="UIPrompt-menu js-menu"></div>`
    });

    this.uiMenu = new UIMenuText({ axis: MenuAxis.X });
    this.node.querySelector('.js-menu')!.replaceWith(this.uiMenu.getNode());
    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    this.uiMenu.update(ts);
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.uiMenu.delete();
    super.delete();
  }

  /**
   * The "focus" function.
   */
  focus(): void {
    this.uiMenu.focus();
    super.focus();
  }

  /**
   * The "unfocus" function.
   */
  unfocus(): void {
    this.uiMenu.unfocus();
    super.unfocus();
  }

  /**
   * The "setText" function sets the text message.
   * @param {string} text - The `text` parameter is a string that represents the text content that you
   * want to set.
   */
  setText(text: string): void {
    this.node.querySelector('.js-text')!.textContent = text;
  }

  /**
   * The "addAction" function adds a new menu button.
   * @param {string} id - A string representing the unique identifier for the action. This is used to
   * identify the action when it is selected or triggered.
   * @param {string} text - The "text" parameter is a string that represents the text or label for the
   * action that you want to add to the UI menu.
   */
  addAction(id: string, text: string): void {
    this.uiMenu.add(id, text);
  }

  /**
   * The "removeAction" function remove the specified menu button.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * action to be removed from the UI menu.
   */
  removeAction(id: string): void {
    this.uiMenu.remove(id);
  }

  /**
   * The "clearActions" function remove all menu buttons.
   */
  clearActions() {
    this.uiMenu.clear();
  }

/**
 * The "handleMenuItemSelected" function.
 * It emits an 'E_ITEM_SELECTED' event with the data passed as a parameter.
 * @param {any} data - The `data` parameter is of type `any`, which means it can be any data type. It
 * represents the data associated with the selected menu item.
 */
  handleMenuItemSelected(data: any) {
    eventManager.emit(this, 'E_ITEM_SELECTED', data);
  }
}

export { UIPrompt };