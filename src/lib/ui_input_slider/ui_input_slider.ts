import { eventManager } from '../core/event_manager';
import { UIWidget } from '../ui/ui_widget';

/**
 * The `UIInputSlider` is a class that represents a slider input widget with methods to
 * set the value, minimum and maximum values, and step value.
 * It emit 'E_VALUE_CHANGED' when value changed.
 */
class UIInputSlider extends UIWidget {
  value: number;
  min: number;
  max: number;
  step: number;

  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIInputSlider',
      template: `
      <input class="UIInputSlider-range js-range" type="range" min="0" max="0" step="1" value="0">
      <div class="UIInputSlider-value js-value">0</div>`
    });

    this.value = 0;
    this.min = 0;
    this.max = 0;
    this.step = 1;
  }

  /**
   * The "setValue" function sets the input value.
   * @param {number} value - The `value` parameter is a number that represents the new value to be set.
   */
  setValue(value: number): void {
    if (value == this.value) {
      return;
    }

    this.node.querySelector<any>('.js-range').value = value;
    this.node.querySelector<any>('.js-value').textContent = value;
    this.value = value;    
  }

  /**
   * The "setMin" function sets the minimum value for the range input.
   * @param {number} min - The `min` parameter is a number that represents the minimum value for the range input.
   */
  setMin(min: number): void {
    this.node.querySelector<any>('.js-range').min = min;
    this.min = min;
  }

  /**
   * The "setMax" function sets the maximum value for the range input.
   * @param {number} max - The `max` parameter is a number that represents the maximum value for the range input.
   */
  setMax(max: number): void {
    this.node.querySelector<any>('.js-range').max = max;
    this.max = max;
  }

  /**
   * The "setStep" function sets the step value for the range input.
   * @param {number} step - The `step` parameter is a number that represents the increment or decrement
   * value for the range input.
   */
  setStep(step: number): void {
    this.node.querySelector<any>('.js-range').step = step;
    this.step = step;
  }

  /**
   * The "onAction" function.
   * It emits an event with the name 'E_VALUE_CHANGED' if the actionId is 'LEFT' or 'RIGHT'.
   */
  onAction(actionId: string): void {
    if (actionId == 'LEFT' && this.value - this.step >= this.min) {
      this.value -= this.step;
      eventManager.emit(this, 'E_VALUE_CHANGED', { value: this.value });
    }
    else if (actionId == 'RIGHT' && this.value + this.step <= this.max) {
      this.value += this.step;
      eventManager.emit(this, 'E_VALUE_CHANGED', { value: this.value });
    }

    this.node.querySelector<any>('.js-range').value = this.value;
    this.node.querySelector<any>('.js-value').textContent = this.value;
  }
}

export { UIInputSlider };