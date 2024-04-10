import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
import { uiManager } from '../../lib/ui/ui_manager';
import { Screen } from '../../lib/screen/screen';
import { UIText } from '../../lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------

class GameOverScreen extends Screen {
  constructor(data) {
    super();
    this.uiTitle = new UIText();
    this.uiMainMenu = new UIMenuText();
    this.uiText = new UIText();
    this.score = data.score;
  }

  async onEnter() {
    this.uiTitle.setText(`You Win!`);
    this.uiText.setText(`Score: ${this.score}`);
    uiManager.addWidget(this.uiTitle, 'display: flex; justify-content: center; align-items: center; margin-top: 80px;margin-left: 50px; margin-right: 50px;');
    uiManager.addWidget(this.uiText, 'display: flex; justify-content: center; align-items: center; margin-top: 80px;margin-left: 50px; margin-right: 50px;');
  }

  onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiMainMenu);
  }
}

export { GameOverScreen };