import { UIWidget } from '../ui/ui_widget.js';

/**
 * A UI widget for displaying a list of items with labels and values.
 */
class UIDescriptionList extends UIWidget {
  constructor() {
    super({
      className: 'UIDescriptionList'
    });
  }

  /**
   * Add an item.
   * 
   * @param {string} id - The unique identifier of the item.
   * @param {string} label - The label or name.
   * @param {string} value - The value.
   */
  addItem(id: string, label: string, value: string): void {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
    <span class="UIDescriptionList-item js-${id}">
      <span class="UIDescriptionList-item-label js-label">${label}</span>
      <span class="UIDescriptionList-item-value js-value">${value}</span>
    </span>`;

    this.node.appendChild(tpl.content);
  }

  /**
   * Removes an item.
   * 
   * @param {string} id - The unique identifier of the item.
   */
  removeItem(id: string): void {
    const item = this.node.querySelector('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::removeItem(): item not found !');
    }

    this.node.removeChild(item);
  }

  /**
   * Set the value of an item.
   * 
   * @param {string} id - The unique identifier of the item.
   * @param {string} value - The value.
   */
  setItem(id: string, value: string): void {
    const item = this.node.querySelector('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::setItem(): item not found !');
    }

    item.querySelector<HTMLElement>('.js-value')!.textContent = value;
  }

  /**
   * Returns the value of an item.
   * 
   * @param {string} id - The unique identifier of the item.
   */
  getItemValue(id: string): string {
    const item = this.node.querySelector<HTMLElement>('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::getItemValue(): item not found !');
    }

    const value = item.querySelector<HTMLElement>('.js-value')!.textContent;
    return value ? value : '';
  }

  /**
   * Checks if an item is visible.
   * 
   * @param {string} id - The unique identifier of the item.
   */
  isItemVisible(id: string): boolean {
    const item = this.node.querySelector<HTMLElement>('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::getItemVisible(): item not found !');
    }

    return !item.classList.contains('u-hidden');
  }

  /**
   * Set the visibility of an item.
   * 
   * @param {string} id - The unique identifier of the item.
   * @param {boolean} visible - Determines whether the item should be visible or hidden.
   */
  setItemVisible(id: string, visible: boolean): void {
    const item = this.node.querySelector<HTMLElement>('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::setItemVisible(): item not found !');
    }

    if (visible) {
      item.classList.remove('u-hidden');
    }
    else {
      item.classList.add('u-hidden');
    }
  }

  /**
   * Remove all items.
   */
  clear() {
    this.node.innerHTML = '';
  }
}

export { UIDescriptionList };