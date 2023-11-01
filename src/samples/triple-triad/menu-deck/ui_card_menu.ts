import { eventManager } from '../../../lib/core/event_manager';
import { UIMenu } from '../../../lib/ui_menu/ui_menu';

class UICardMenu extends UIMenu {
  constructor(options: {}) {
    super(options);
  }

  onAction(actionId: string): void {
    const focusIndex = this.getFocusedWidgetIndex();
    if (actionId == 'OK') {
      const widget = this.widgets[focusIndex];
      eventManager.emit(this, 'E_ITEM_ADDED', { id: widget.getId(), index: focusIndex });
      return;
    }
    else if (actionId == 'BACKSPACE') {
      const widget = this.widgets[focusIndex];
      eventManager.emit(this, 'E_ITEM_REMOVED', { id: widget.getId(), index: focusIndex });
      return;
    }

    super.onAction(actionId);
  }
}

export { UICardMenu };