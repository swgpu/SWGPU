import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { Screen } from '../../lib/screen/screen';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { gameManager } from './game_manager';
import { BattleScreen } from './battle/battle_screen';
import { MenuScreen } from './menu/menu_screen';
import { ShopScreen, SHOP_SCREEN_MODE } from './shop/shop_screen';
// ---------------------------------------------------------------------------------------

class RPGScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText();
  }

  async onEnter() {
    await gameManager.init();
    
    this.uiMenu.add('0', 'Battle');
    this.uiMenu.add('1', 'Menu');
    this.uiMenu.add('2', 'Shop items');
    this.uiMenu.add('3', 'Shop stuff');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.removeWidget(this.uiMenu);
  }

  onBringToFront() {
    this.uiMenu.setVisible(true);
    uiManager.focus(this.uiMenu);
  }

  onBringToBack() {
    this.uiMenu.setVisible(false);
    this.uiMenu.unselectWidgets();
  }

  handleMenuItemSelected(data) {
    if (data.id == 0) {
      screenManager.requestPushScreen(new BattleScreen(), { battleId: '0000' });
    }
    else if (data.id == 1) {
      screenManager.requestPushScreen(new MenuScreen());
    }
    else if (data.id == 2) {
      screenManager.requestPushScreen(new ShopScreen(SHOP_SCREEN_MODE.COMMON_STORE), { inventoryId: '0000' });
    }
    else if (data.id == 3) {
      screenManager.requestPushScreen(new ShopScreen(SHOP_SCREEN_MODE.EQUIPMENT_STORE), { inventoryId: '0001' });
    }
  }
}

export { RPGScreen };