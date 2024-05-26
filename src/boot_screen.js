import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { Screen } from '@lib/screen/screen';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { PlayScreen } from './play/play_screen';
import { IsolationScreen } from './tutorials/isolation/isolation_screen';
import { AsgardScreen } from './tutorials/asgard/asgard_screen';
import { SamplesBootScreen } from './samples/boot/boot_screen';
// ---------------------------------------------------------------------------------------

class BootScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
  }

  async onEnter() {
    this.uiMenu.add('0', 'Play');
    this.uiMenu.add('1', 'Tutorial 2D - Isolation');
    this.uiMenu.add('2', 'Tutorial 3D - Asgard');
    this.uiMenu.add('3', 'Samples');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.removeWidget(this.uiMenu);
  }

  handleMenuItemSelected(data) {
    if (data.id == 0) {
      screenManager.requestSetScreen(new PlayScreen());
    }
    else if (data.id == 1) {
      screenManager.requestSetScreen(new IsolationScreen());
    }
    else if (data.id == 2) {
      screenManager.requestSetScreen(new AsgardScreen());
    }
    else if (data.id == 3) {
      screenManager.requestSetScreen(new SamplesBootScreen());
    }
  }
}

export { BootScreen };