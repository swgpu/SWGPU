import { UIWidget } from '../ui/ui_widget';

/**
 * The `UIText` class is a subclass of `UIWidget` that represents a pretty simple text element widget.
 */
class UIText extends UIWidget {
  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIText',
      template: '<span class="UIText-text js-text"></span>'
    });
  }

  /**
   * The "setText" function sets the text content.
   * @param {string} text - The `text` property.
   */
  setText(text: string): void {
    this.node.querySelector('.js-text')!.textContent = text;
  }
}

export { UIText };