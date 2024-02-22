import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';
import { MenuAxis } from '../ui_menu/ui_menu';
import { UIMenuText } from '../ui_menu_text/ui_menu_text';

/**
 * A UI widget displaying prompt with a text content and a menu of actions.
 * It emits an 'E_ITEM_SELECTED'.
 */
class UIPrompt extends UIWidget {
  uiMenu: UIMenuText;

  constructor() {
    super({
      className: 'UIPrompt',
      template: `
      <div class="UIPrompt-text js-text"></div>
      <div class="UIPrompt-menu js-menu"></div>`
    });

    this.uiMenu = new UIMenuText({ axis: MenuAxis.X });
    this.node.querySelector('.js-menu')!.replaceWith(this.uiMenu.getNode());
    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.$handleMenuItemSelected);
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    this.uiMenu.update(ts);
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.uiMenu.delete();
    super.delete();
  }

  /**
   * Focus on.
   */
  focus(): void {
    this.uiMenu.focus();
    super.focus();
  }

  /**
   * Focus off.
   */
  unfocus(): void {
    this.uiMenu.unfocus();
    super.unfocus();
  }

  /**
   * Set the text message.
   * 
   * @param {string} text - The text content.
   */
  setText(text: string): void {
    this.node.querySelector('.js-text')!.textContent = text;
  }

  /**
   * Add a new menu button.
   * 
   * @param {string} id - The unique identifier.
   * @param {string} text - The text or label.
   */
  addAction(id: string, text: string): void {
    this.uiMenu.add(id, text);
  }

  /**
   * Remove a menu button.
   * 
   * @param {string} id - The unique identifier.
   */
  removeAction(id: string): void {
    this.uiMenu.remove(id);
  }

  /**
   * Remove all menu buttons.
   */
  clearActions() {
    this.uiMenu.clear();
  }

  $handleMenuItemSelected(data: any) {
    eventManager.emit(this, 'E_ITEM_SELECTED', data);
  }
}

export { UIPrompt };