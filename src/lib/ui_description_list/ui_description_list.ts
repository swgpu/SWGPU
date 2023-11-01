import { UIWidget } from '../ui/ui_widget.js';

/**
 * The `UIDescriptionList` class represents a UI widget for displaying a list of items with labels and values,
 * and provides methods for adding, removing, setting values, and manipulating the visibility of items.
 */
class UIDescriptionList extends UIWidget {
  /**
   * The constructor.
   */
  constructor() {
    super({
      className: 'UIDescriptionList'
    });
  }

  /**
   * The "addItem" function creates a new pair label/value line.
   * @param {string} id - The unique identifier for the item being added.
   * @param {string} label - The label or name of the item being added.
   * @param {string} value - The value of the item being added.
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
   * The "removeItem" function removes an item based on its identifier.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item to be removed.
   */
  removeItem(id: string): void {
    const item = this.node.querySelector('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::removeItem(): item not found !');
    }

    this.node.removeChild(item);
  }

  /**
   * The "setItem" function sets the value of an item.
   * @param {string} id - The unique identifier of the item you want to set the value for.
   * @param {string} value - The value you want to set.
   */
  setItem(id: string, value: string): void {
    const item = this.node.querySelector('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::setItem(): item not found !');
    }

    item.querySelector<HTMLElement>('.js-value')!.textContent = value;
  }

  /**
   * The "getItemValue" function retrieves the value of an item.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item you want to retrieve the value from.
   * @returns The value.
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
   * The "isItemVisible" function checks if an item is visible or hidden.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * item you want to check the visibility of.
   * @returns A boolean value indicating is item is visible or not.
   */
  isItemVisible(id: string): boolean {
    const item = this.node.querySelector<HTMLElement>('.js-' + id);
    if (!item) {
      throw new Error('UIDescriptionList::getItemVisible(): item not found !');
    }

    return !item.classList.contains('u-hidden');
  }

  /**
   * The "setItemVisible" function toggles the visibility of an item.
   * @param {string} id - The id parameter is a string that represents the unique identifier of the item
   * you want to manipulate.
   * @param {boolean} visible - The `visible` parameter is a boolean value that determines whether the
   * item should be visible or hidden.
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
   * The "clear" functio remove all items.
   */
  clear() {
    this.node.innerHTML = '';
  }
}

export { UIDescriptionList };