import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { Screen } from '../../lib/screen/screen';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { SamplesBootScreen } from '../../samples/boot/boot_screen';
import { IsolationScreen } from '../isolation/isolation_screen';
import { AsgardScreen } from '../asgard/asgard_screen';
// ---------------------------------------------------------------------------------------

class TutorialsBootScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
  }

  async onEnter() {
    this.uiMenu.add('0', 'First tutorial - Isolation');
    this.uiMenu.add('1', 'Second tutorial - Asgard');
    this.uiMenu.add('2', 'Samples');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.removeWidget(this.uiMenu);
  }

  handleMenuItemSelected(data) {
    if (data.id == 0) {
      screenManager.requestSetScreen(new IsolationScreen());
    }
    else if (data.id == 1) {
      screenManager.requestSetScreen(new AsgardScreen());
    }
    else if (data.id == 2) {
      screenManager.requestSetScreen(new SamplesBootScreen());
    }
  }
}

export { TutorialsBootScreen };