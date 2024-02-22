import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';
import { UIMenuText } from '../ui_menu_text/ui_menu_text';

/**
 * A floating dialog widget (looking as a bubble) with text and optional actions.
 * It emit 'E_PRINT_FINISHED' when print is finish.
 * It emit 'E_MENU_ITEM_SELECTED' when menu item is selected.
 * It emit 'E_OK' when action is 'OK' and text is finished.
 */
class UIBubble extends UIWidget {
  uiMenu: UIMenuText;
  text: string;
  actions: Array<string>;
  stepDuration: number;
  currentTextOffset: number;
  currentActionTextOffset: number;
  currentActionIndex: number;
  timeElapsed: number;
  finished: boolean;

  constructor() {
    super({
      className: 'UIBubble',
      template: `
      <img class="UIBubble-picture js-picture" src=""/>
      <div class="UIBubble-content">
        <div class="UIBubble-author js-author"></div>
        <div class="UIBubble-text js-text"></div>
        <div class="UIBubble-menu js-menu"></div>
      </div>`
    });

    this.uiMenu = new UIMenuText();
    this.text = '';
    this.actions = [];
    this.stepDuration = 0;
    this.currentTextOffset = 0;
    this.currentActionTextOffset = 0;
    this.currentActionIndex = 0;
    this.timeElapsed = 0;
    this.finished = false;

    this.node.querySelector<HTMLElement>('.js-menu')!.replaceWith(this.uiMenu.getNode());
    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.$handleMenuItemSelected);
  }

  /**
   * The "update" function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    this.uiMenu.update(ts);

    if (this.currentTextOffset == this.text.length && this.currentActionIndex == this.actions.length) {
      this.finished = true;
      eventManager.emit(this, 'E_PRINT_FINISHED');
      return;
    }

    if (this.timeElapsed >= this.stepDuration) {
      if (this.currentTextOffset < this.text.length) {
        this.node.querySelector<HTMLElement>('.js-text')!.textContent = this.text.substring(0, this.currentTextOffset + 1);
        this.currentTextOffset++;
      }
      else if (this.currentActionIndex < this.actions.length) {
        if (this.currentActionTextOffset == 0) {
          this.uiMenu.add(this.currentActionIndex.toString(), '');
        }

        if (this.currentActionTextOffset < this.actions[this.currentActionIndex].length) {
          this.uiMenu.set(this.currentActionIndex.toString(), this.actions[this.currentActionIndex].substring(0, this.currentActionTextOffset + 1));
          this.currentActionTextOffset++;
        }
        else {
          this.currentActionIndex++;
          this.currentActionTextOffset = 0;
        }
      }

      this.timeElapsed = 0;
    }
    else {
      this.timeElapsed += ts;
    }
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    eventManager.unsubscribe(this.uiMenu, 'E_ITEM_SELECTED', this);
    this.uiMenu.delete();
    super.delete();
  }

  /**
   * Focus on.
   * Note: It focus `menu` too if actions is set.
   */
  focus(): void {
    if (this.actions.length > 0) {
      this.uiMenu.focus();
    }

    super.focus();
  }

  /**
   * Focus off.
   * Note: It unfocus `menu` too if actions is set.
   */
  unfocus(): void {
    if (this.actions.length > 0) {
      this.uiMenu.unfocus();
    }

    super.unfocus();
  }

  /**
   * Set the dialog author avatar's.
   * 
   * @param {string} pictureFile - The file path of the picture.
   */
  setPicture(pictureFile: string): void {
    this.node.querySelector<HTMLImageElement>('.js-picture')!.src = pictureFile;
  }

  /**
   * Set the dialog author name's.
   * 
   * @param {string} author - The name of the author.
   */
  setAuthor(author: string): void {
    this.node.querySelector<HTMLElement>('.js-author')!.textContent = author;
  }

  /**
   * Set the width of the bubble.
   * 
   * @param {number} width - The width in pixels.
   */
  setWidth(width: number): void {
    this.node.style.width = width + 'px';
  }

  /**
   * Set the dialog text.
   * 
   * @param {string} text - The dialog text.
   */
  setText(text: string): void {
    this.text = text;
    this.currentTextOffset = 0;
    this.finished = false;
  }

  /**
   * Set the actions menu.
   * 
   * @param actions - The list of actions.
   */
  setActions(actions: Array<string>): void {
    this.actions = actions;
    this.currentActionIndex = 0;
    this.currentActionTextOffset = 0;
    this.finished = false;
    this.uiMenu.clear();
  }

  /**
   * Set the text speed.
   * 
   * @param {number} stepDuration - The duration of a text update.
   */
  setStepDuration(stepDuration: number): void {
    this.stepDuration = stepDuration;
  }

  /**
   * The "onAction" function.
   * Note: It emits an 'E_OK' event if the actionId is 'OK' and text is finished.
   */
  onAction(actionId: string): void {
    if (actionId == 'OK' && this.finished) {
      eventManager.emit(this, 'E_OK');
    }
  }

  $handleMenuItemSelected(data: any): void {
    eventManager.emit(this, 'E_MENU_ITEM_SELECTED', data);
  }
}

export { UIBubble };