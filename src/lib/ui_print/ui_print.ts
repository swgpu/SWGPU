import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';

/**
 * The `UIPrint` class represents a full screen dialog widget with text.
 * It is ideal for long-text reading.
 */
class UIPrint extends UIWidget {
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
      className: 'UIPrint',
      template: `
      <div class="UIPrint-textbox">
        <div class="UIPrint-textbox-text js-text"></div>
        <div class="UIPrint-textbox-next js-next"></div>
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
  onAction(actionId: string) {
    if (actionId === 'OK' && this.finished) {
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

export { UIPrint };