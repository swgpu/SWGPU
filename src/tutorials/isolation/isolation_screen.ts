import { eventManager } from '@lib/core/event_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
import { Screen } from '@lib/screen/screen';
import { UIText } from '@lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------
import { GameScreen } from './game_screen';
// ---------------------------------------------------------------------------------------

class IsolationScreen extends Screen {
  uiTitle: UIText;
  uiMenu: UIMenuText;

  constructor() {
    super();
    this.uiTitle = new UIText();
    this.uiMenu = new UIMenuText();
  }

  async onEnter() {
    this.uiTitle.setText('First tutorial (2D)');
    uiManager.addWidget(this.uiTitle, 'display:flex; justify-content:center; align-items:center; margin-top:80px; margin-left:50px; margin-right:50px;');

    this.uiMenu.add('NEW', 'New Game');
    uiManager.addWidget(this.uiMenu, 'position:absolute; top:50%; left:50%; width:60%; transform:translate(-50%,-50%);');
    uiManager.focus(this.uiMenu);

    eventManager.subscribe(this.uiMenu, 'E_CLOSED', this, this.handleMainMenuClosed);
    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMainMenuItemSelected);
  }

  onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiMenu);
  }

  handleMainMenuClosed() {
    screenManager.requestPopScreen();
  }

  handleMainMenuItemSelected(data: { id: string }) {
    if (data.id == 'NEW') {
      screenManager.requestSetScreen(new GameScreen());
    }
  }
}

export { IsolationScreen };