import { uiManager } from '../../lib/ui/ui_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { inputManager } from '../../lib/input/input_manager';
import { Screen } from '../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { MapScreen } from './map_screen';
// ---------------------------------------------------------------------------------------

class FightScreen extends Screen {
  constructor() {
    super();
    this.uiBackground = document.createElement('img');
    this.uiLogo = document.createElement('img');
    this.uiTitle = document.createElement('div');
  }

  async onEnter() {
    this.uiBackground = document.createElement('img');
    this.uiBackground.className = 'FightScreen-background';
    this.uiBackground.src = './samples/fight/ui/bg-boot-screen.jpg';
    uiManager.addNode(this.uiBackground, 'position:absolute; top:0; left:0; right:0; bottom:0; ');

    this.uiLogo = document.createElement('img');
    this.uiLogo.className = 'FightScreen-logo';
    this.uiLogo.src = './samples/fight/ui/logo-boot-screen.png';
    uiManager.addNode(this.uiLogo, 'position:absolute; top:20px; left:50%; transform:translate(-50%, 0);');

    this.uiTitle = document.createElement('div');
    this.uiTitle.textContent = 'PUSH ENTER TO START';
    this.uiTitle.className = 'FightScreen-title';
    uiManager.addNode(this.uiTitle, 'position:absolute; bottom:50px; left:50%; transform:translate(-50%, -50%);');
  }

  onExit() {
    uiManager.clear();
  }

  update() {
    if (inputManager.isActiveAction('OK')) {
      screenManager.requestSetScreen(new MapScreen());
    }
  }
}

export { FightScreen };