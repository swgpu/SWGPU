import { screenManager } from '../../../lib/screen/screen_manager';
import { uiManager } from '../../../lib/ui/ui_manager';
import { Screen } from '../../../lib/screen/screen';
import { UIText } from '../../../lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------
import { UIStatus } from './ui_status';
// ---------------------------------------------------------------------------------------

class MenuStatusScreen extends Screen {
  constructor(hero) {
    super();
    this.hero = hero;
    this.uiTitle = new UIText();
    this.uiStatus = new UIStatus();
    this.handleKeyDownCb = (e) => this.handleKeyDown(e);
  }

  async onEnter() {
    this.uiTitle.setText('Status');
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:0; width:100%; height:50px');

    this.uiStatus.setHero(this.hero);
    uiManager.addWidget(this.uiStatus, 'position:absolute; top:50px; left:0; bottom:0; width:100%');

    document.addEventListener('keydown', this.handleKeyDownCb);
  }

  onExit() {
    document.removeEventListener('keydown', this.handleKeyDownCb);
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiStatus);
  }

  handleKeyDown(e) {
    if (e.key == 'Escape') {
      screenManager.requestPopScreen();
    }
  }
}

export { MenuStatusScreen };