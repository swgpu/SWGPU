import { uiManager } from '../../lib/ui/ui_manager';
import { soundManager } from '../../lib/sound/sound_manager';
import { eventManager } from '../../lib/core/event_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { UIWidget } from '../../lib/ui/ui_widget';
import { UIMenu, MenuAxis } from '../../lib/ui_menu/ui_menu';
import { Screen } from '../../lib/screen/screen';
// ------------------------------------------------------------------
import { Config } from './config';
import { CharacterScreen } from './character_screen';
// ------------------------------------------------------------------

class MapScreen extends Screen {
  constructor() {
    super();
    this.uiBackground = document.createElement('img');
    this.uiTitle = document.createElement('div');
    this.uiMenu = new UIMenu();
  }

  async onEnter() {
    await soundManager.loadSound('./samples/fight/musics/intro.mp3');
    // await soundManager.playSound('./samples/fight/musics/intro.mp3');

    this.uiBackground = document.createElement('img');
    this.uiBackground.className = 'MapScreen-background';
    this.uiBackground.src = './samples/fight/ui/bg-map-screen.jpg';
    uiManager.addNode(this.uiBackground, 'position:absolute; left:0; right:0; top:0; right:0;');

    this.uiTitle = document.createElement('div');
    this.uiTitle.className = 'MapScreen-title';
    this.uiTitle.textContent = 'SELECT ARENA';
    uiManager.addNode(this.uiTitle, 'position: absolute; left:0; right:0; top:100px;');

    this.uiMenu = new UIMenu({ className: 'UIMap-menu', axis: MenuAxis.XY, rows: 2, columns: 2 });
    uiManager.addWidget(this.uiMenu, 'position:absolute; left:100px; top:170px');

    for (let i = 0; i < 4; i++) {
      this.uiMenu.addWidget(new UIWidget({
        className: 'UIMap',
        template:`
        <div class="UIMap-container">
          <img class="UIMap-container-char-icon js-icon" alt="icon" src="${Config.PATH_BACKGROUNDS + i}/icon.png"/>
        </div>`
      }));
    }

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    eventManager.subscribe(this.uiMenu, 'E_CLOSED', this, this.handleMenuBack);
    uiManager.focus(this.uiMenu);
  }

  async handleMenuBack() {
    uiManager.focus(this.uiMenu);
  }

  async handleMenuItemSelected(data) {
    uiManager.unfocus();
    uiManager.clear();
    screenManager.requestSetScreen(new CharacterScreen(), { map: data.index });
  }
}

export { MapScreen };