import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { Screen } from '@lib/screen/screen';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { PhysicsAdvancedScreen } from './templates/physics-advanced/physics_advanced_screen';
import { PhysicsBasicScreen } from './templates/physics-basic/physics_basic_screen';
import { TwoDimScreen } from './templates/two-dim/two_dim_screen';
import { SamplesBootScreen } from './samples/boot/boot_screen';
// ---------------------------------------------------------------------------------------

class BootScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText({ className: 'UIMenuText UIBootMenu' });
  }

  async onEnter() {
    this.uiMenu.add('0', 'Template 3D - Physics advanced');
    this.uiMenu.add('1', 'Template 3D - Physics basic');
    this.uiMenu.add('2', 'Template 2D');
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
      screenManager.requestSetScreen(new PhysicsAdvancedScreen());
    }
    else if (data.id == 1) {
      screenManager.requestSetScreen(new PhysicsBasicScreen());
    }
    else if (data.id == 2) {
      screenManager.requestSetScreen(new TwoDimScreen());
    }
    else if (data.id == 3) {
      screenManager.requestSetScreen(new SamplesBootScreen());
    }
  }
}

export { BootScreen };