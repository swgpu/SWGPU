import { uiManager } from '../../lib/ui/ui_manager';
import { Screen } from '../../lib/screen/screen';
import { UIText } from '../../lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------

class GameOverScreen extends Screen {
  uiTitle: UIText;
  uiText: UIText;

  constructor() {
    super();
    this.uiTitle = new UIText();
    this.uiText = new UIText();
  }

  async onEnter(data: { score: number }) {
    this.uiTitle.setText('You loose biatch !');
    this.uiText.setText(`Score: ${ data.score }`);
    uiManager.addWidget(this.uiTitle, 'display:flex; justify-content:center; align-items:center; margin-top:80px; margin-left:50px; margin-right:50px;');
    uiManager.addWidget(this.uiText, 'display:flex; justify-content:center; align-items:center; margin-top:80px; margin-left:50px; margin-right:50px;');
  }

  onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiText);
  }
}

export { GameOverScreen };