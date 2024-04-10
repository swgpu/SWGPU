import { eventManager } from '../../lib/core/event_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
import { uiManager } from '../../lib/ui/ui_manager';
import { Screen } from '../../lib/screen/screen';
import { UIText } from '../../lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------
import { GameScreen } from './game_screen';
// ---------------------------------------------------------------------------------------

class IsolationScreen extends Screen {
  constructor() {
    super();
    this.uiTitle = new UIText();
    this.uiMainMenu = new UIMenuText();
  }

  async onEnter() {
    this.uiTitle.setText('Your first tutorial');
    uiManager.addWidget(this.uiTitle, 'display: flex; justify-content: center; align-items: center; margin-top: 80px;margin-left: 50px; margin-right: 50px;');
    this.uiMainMenu.add('NEW', "New Game");
    uiManager.addWidget(this.uiMainMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');
    eventManager.subscribe(this.uiMainMenu, 'E_CLOSED', this, this.handleMainMenuClosed);
    eventManager.subscribe(this.uiMainMenu, 'E_ITEM_SELECTED', this, this.handleMainMenuItemSelected);
    uiManager.focus(this.uiMainMenu)
  }

  handleMainMenuClosed() {
    screenManager.requestPopScreen();
  }

  handleMainMenuItemSelected(data) {
    switch (data.id) {
      case 'NEW':
        screenManager.requestSetScreen(new GameScreen());
      default:
        break;
    }
  }

  onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiMainMenu);
  }
}

export { IsolationScreen };