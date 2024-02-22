import { eventManager } from '../core/event_manager.js';
import { UIWidget } from '../ui/ui_widget.js';

/**
 * A UI widget for displaying a bottom fixed dialog box with text and author name.
 * It emit 'E_PRINT_FINISHED' when print is finish.
 * It emit 'E_MENU_ITEM_SELECTED' when menu item is selected.
 * It emit 'E_OK' when action is 'OK' and text is finished.
 */
class UIDialog extends UIWidget {
  text: string;
  stepDuration: number;
  currentTextOffset: number;
  timeElapsed: number;
  finished: boolean;

  constructor() {
    super({
      className: 'UIDialog',
      template: `
      <div class="UIDialog-author js-author"></div>
      <div class="UIDialog-textbox">
        <div class="UIDialog-textbox-text js-text"></div>
        <div class="UIDialog-textbox-next js-next"></div>
      </div>`
    });

    this.text = '';
    this.stepDuration = 0;
    this.currentTextOffset = 0;
    this.timeElapsed = 0;
    this.finished = false;

    this.node.addEventListener('click', () => this.$handleClick());
  }

  /**
   * The "update" function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (this.finished) {
      return;
    }

    if (this.currentTextOffset == this.text.length) {
      this.finished = true;
      this.node.querySelector<any>('.js-next').style.display = 'block';
      eventManager.emit(this, 'E_PRINT_FINISHED');
      return;
    }

    if (this.timeElapsed >= this.stepDuration) {
      if (this.currentTextOffset < this.text.length) {
        this.node.querySelector<any>('.js-text').textContent = this.text.substring(0, this.currentTextOffset + 1);
        this.currentTextOffset++;
      }

      this.timeElapsed = 0;
    }
    else {
      this.timeElapsed += ts;
    }
  }

  /**
   * Set the dialog author name's.
   * 
   * @param {string} author - The name of the author.
   */
  setAuthor(author: string): void {
    this.node.querySelector<any>('.UIDialog-author').textContent = author;
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
    this.node.querySelector<any>('.js-next').style.display = 'none';
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
   * The onAction function.
   * It emits an 'E_OK' event if the actionId is 'OK' and text is finished.
   */
  onAction(actionId: string): void {
    if (actionId == 'OK' && this.finished) {
      eventManager.emit(this, 'E_OK');
    }
  }

  $handleClick(): void {
    if (this.isFocused() && this.finished) {
      eventManager.emit(this, 'E_OK');
    }
  }
}

export { UIDialog };