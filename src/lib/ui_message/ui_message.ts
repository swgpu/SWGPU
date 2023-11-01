import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';

/**
 * The `UIMessage` class represents a bottom fixed dialog widget with picture, text and author name.
 */
class UIMessage extends UIWidget {
  text: string;
  stepDuration: number;
  currentTextOffset: number;
  timeElapsed: number;
  finished: boolean;

  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIMessage',
      template: `
      <div class="UIMessage-inner">
        <div class="UIMessage-picture js-picture"></div>
        <div class="UIMessage-textbox">
          <div class="UIMessage-textbox-author js-author"></div>
          <div class="UIMessage-textbox-text js-text"></div>
          <div class="UIMessage-textbox-next js-next"></div>
        </div>
      </div>`
    });

    this.text = '';
    this.stepDuration = 0;
    this.currentTextOffset = 0;
    this.timeElapsed = 0;
    this.finished = false;

    this.node.addEventListener('click', () => this.handleClick());
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    if (this.finished) {
      return;
    }

    if (this.currentTextOffset == this.text.length) {
      this.finished = true;
      this.node.querySelector<HTMLElement>('.js-next')!.style.display = 'block';
      eventManager.emit(this, 'E_PRINT_FINISHED');
      return;
    }

    if (this.timeElapsed >= this.stepDuration) {
      if (this.currentTextOffset < this.text.length) {
        this.node.querySelector<HTMLElement>('.js-text')!.textContent = this.text.substring(0, this.currentTextOffset + 1);
        this.currentTextOffset++;
      }

      this.timeElapsed = 0;
    }
    else {
      this.timeElapsed += ts;
    }
  }

  /**
   * The "setPicture" function sets the dialog author avatar's.
   * @param {string} pictureFile - The `pictureFile` parameter is a string that represents the file path
   * or URL of the picture that you want to set.
   */
  setPicture(pictureFile: string): void {
    this.node.querySelector<HTMLElement>('.js-picture')!.innerHTML = '<img class="UIMessage-picture-img" src="' + pictureFile + '">';
  }

  /**
   * The "setAuthor" function sets the dialog author name's.
   * @param {string} author - The `author` parameter is a string that represents the name of the author.
   */
  setAuthor(author: string): void {
    this.node.querySelector<HTMLElement>('.js-author')!.textContent = author;
  }

  /**
   * The "setText" function sets the dialog text.
   * @param {string} text - The dialog text.
   */
  setText(text: string): void {
    this.text = text;
    this.currentTextOffset = 0;
    this.finished = false;
    this.node.querySelector<HTMLElement>('.js-next')!.style.display = 'none';
  }

  /**
   * The "setStepDuration" function sets the text speed.
   * @param {number} stepDuration - The `stepDuration` parameter is a number that represents the duration of
   * a text update. Smaller is that value faster text will be displayed.
   */
  setStepDuration(stepDuration: number): void {
    this.stepDuration = stepDuration;
  }

  /**
   * The "onAction" function.
   * It emits an event with the name 'E_OK' if the actionId is 'OK'.
   */
  onAction(actionId: string): void {
    if (actionId == 'OK' && this.finished) {
      eventManager.emit(this, 'E_OK');
    }
  }

  /**
   * The "handleClick" function.
   * It emits an event with the name 'E_OK' if text is finished and mouse click fired.
   */
  handleClick(): void {
    if (this.isFocused() && this.finished) {
      eventManager.emit(this, 'E_OK');
    }
  }
}

export { UIMessage };