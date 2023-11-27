import { uiManager } from '../../lib/ui/ui_manager';
import { eventManager } from '../../lib/core/event_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { Screen } from '../../lib/screen/screen';
import { UIWidget } from '../../lib/ui/ui_widget';
import { UIMenu, MenuAxis } from '../../lib/ui_menu/ui_menu';
// ------------------------------------------------------------------
import { Config } from './config';
import { GameScreen } from './game_screen';
import { MapScreen } from './map_screen';
import { CHARS } from './enums';
// ------------------------------------------------------------------

class CharacterScreen extends Screen {
  constructor() {
    super();
    this.map = 0;
    this.numPlayers = 2;
    this.selectionPlayerOrder = [0, 1];
    this.selectionPlayerIndex = 0;
    this.selectedCharacters = ['', ''];
    this.uiBackground = document.createElement('img');
    this.uiTitle = document.createElement('div');
    this.uiMenu = new UIMenu();
    this.uiAvatars = [];
    this.uiLabels = [];
  }

  async onEnter(args = { map }) {
    this.map = args.map;

    this.uiBackground = document.createElement('img');
    this.uiBackground.className = 'CharacterScreen-background';
    this.uiBackground.src = './samples/fight/ui/bg-map-screen.jpg';
    uiManager.addNode(this.uiBackground, 'position:absolute; left:0; right:0; top:0; right:0;');

    this.uiTitle = document.createElement('div');
    this.uiTitle.className = 'CharacterScreen-title';
    this.uiTitle.textContent = 'SELECT PLAYERS';
    uiManager.addNode(this.uiTitle, 'position: absolute; left:0; right:0; top:100px;');

    this.uiMenu = new UIMenu({ className: 'UICharacter-menu', axis: MenuAxis.XY, rows: 3, columns: 4, multiple: true, togglable: false });
    uiManager.addWidget(this.uiMenu, 'position:absolute; left:100px; top:170px');

    for (let i = 0; i < this.numPlayers; i++) {
      const v1 = i == 0 || i == 1 ? 'top:10px'  : 'bottom:10px';
      const h1 = i == 0 || i == 2 ? 'left:10px' : 'right:10px';

      this.uiAvatars[i] = document.createElement('img');
      this.uiAvatars[i].className = 'CharacterScreen-avatar';
      this.uiAvatars[i].src = Config.PATH_CHARS + 'default-avatar.png';
      uiManager.addNode(this.uiAvatars[i], 'position:absolute; ' + v1 + ';' + h1);

      const v2 = i == 0 || i == 1 ? 'top:75px'  : 'bottom:75px';
      const h2 = i == 0 || i == 2 ? 'left:10px' : 'right:10px';

      this.uiLabels[i] = document.createElement('div');
      this.uiLabels[i].className = 'CharacterScreen-label';
      this.uiLabels[i].textContent = 'Player ' + i;
      uiManager.addNode(this.uiLabels[i], 'position:absolute; ' + v2 + ';' + h2);
    }

    for (let i = 0; i < CHARS.length; i++) {
      this.uiMenu.addWidget(new UIWidget({
        className: 'UICharacter',
        template:`
        <div class="UICharacter-container">
          <img class="UICharacter-container-char-icon js-icon" alt="icon" src="${Config.PATH_CHARS + CHARS[i]}/avatar.jpg"/>
        </div>`
      }));
    }

    eventManager.subscribe(this.uiMenu, 'E_ITEM_SELECTED', this, this.handleMenuItemSelected);
    eventManager.subscribe(this.uiMenu, 'E_ITEM_FOCUSED', this, this.handleMenuItemFocused);
    eventManager.subscribe(this.uiMenu, 'E_CLOSED', this, this.handleMenuBack);
    uiManager.focus(this.uiMenu);
  }

  onExit() {
    uiManager.clear();
  }

  async handleMenuBack() {
    if (this.selectionPlayerIndex == 0) {
      screenManager.requestSetScreen(new MapScreen());
    }

    const playerIndex = this.selectionPlayerOrder[this.selectionPlayerIndex - 1];
    const char = this.selectedCharacters[playerIndex];
    const sameChars = this.selectedCharacters.filter(c => c == char);

    if (sameChars.length == 1) {
      this.uiMenu.unselectWidget(CHARS.indexOf(char));
    }

    this.selectionPlayerIndex--;
  }

  async handleMenuItemFocused(data) {
    this.uiAvatars[this.selectionPlayerIndex].src = Config.PATH_CHARS + CHARS[data.index] + '/avatar.jpg';
  }

  async handleMenuItemSelected(data) {
    const playerIndex = this.selectionPlayerOrder[this.selectionPlayerIndex];
    this.selectedCharacters[playerIndex] = CHARS[data.index];
    this.selectionPlayerIndex++;

    if (this.selectionPlayerIndex == this.numPlayers) {
      screenManager.requestSetScreen(new GameScreen(), { map: this.map, characters: this.selectedCharacters });
    }
    else {
      const index = this.uiMenu.getFocusedWidgetIndex();
      this.uiAvatars[this.selectionPlayerIndex].src = Config.PATH_CHARS + CHARS[index] + '/avatar.jpg';
    }
  }
}

export { CharacterScreen };