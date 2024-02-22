import { UIWidget } from '../ui/ui_widget';

/**
 * A UI widget displaying a simple text.
 */
class UIText extends UIWidget {
  constructor() {
    super({
      className: 'UIText',
      template: '<span class="UIText-text js-text"></span>'
    });
  }

  /**
   * Set the text content.
   * 
   * @param {string} text - The text content.
   */
  setText(text: string): void {
    this.node.querySelector('.js-text')!.textContent = text;
  }
}

export { UIText };