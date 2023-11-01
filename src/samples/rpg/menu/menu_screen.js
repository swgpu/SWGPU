import { eventManager } from '../../../lib/core/event_manager';
import { uiManager } from '../../../lib/ui/ui_manager';
import { screenManager } from '../../../lib/screen/screen_manager';
import { Screen } from '../../../lib/screen/screen';
import { UIMenuText } from '../../../lib/ui_menu_text/ui_menu_text';
import { UIText } from '../../../lib/ui_text/ui_text';
import { ArrayCollection } from '../../../lib/core/array_collection';
// ---------------------------------------------------------------------------------------
import { gameManager } from '../game_manager';
import { UIHeroes } from '../shared/ui_heroes';
import { MenuEquipmentsScreen } from './menu_equipments_screen';
import { MenuItemsScreen } from './menu_items_screen';
import { MenuStatusScreen } from './menu_status_screen';
// ---------------------------------------------------------------------------------------

class MenuScreen extends Screen {
  constructor() {
    super();
    this.player = gameManager.getPlayer();
    this.uiTitle = new UIText();
    this.uiMainMenu = new UIMenuText();
    this.uiHeroes = new UIHeroes();
  }

  async onEnter() {
    this.uiTitle.setText('Menu');
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:0; right:0; height:50px');
    
    this.uiMainMenu.add('ITEMS', 'Objets');
    this.uiMainMenu.add('STUFFS', 'Equipements');
    this.uiMainMenu.add('STATUS', 'Status');
    uiManager.addWidget(this.uiMainMenu, 'position:absolute; top:50px; left:0; bottom:0; width:40%');

    this.uiHeroes.setCollection(new ArrayCollection(this.player.getHeroes()));
    uiManager.addWidget(this.uiHeroes, 'position:absolute; top:50px; left:40%; bottom:0; width:60%');

    eventManager.subscribe(this.uiMainMenu, 'E_CLOSED', this, this.handleMainMenuClosed);
    eventManager.subscribe(this.uiMainMenu, 'E_ITEM_SELECTED', this, this.handleMainMenuItemSelected);
    eventManager.subscribe(this.uiHeroes, 'E_CLOSED', this, this.handleHeroesClosed);
    eventManager.subscribe(this.uiHeroes, 'E_ITEM_SELECTED', this, this.handleHeroesItemSelected);

    uiManager.focus(this.uiMainMenu);
  }

  async onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiMainMenu);
    uiManager.removeWidget(this.uiHeroes);
  }

  onBringToFront(oldTopScreen) {
    uiManager.focus(oldTopScreen instanceof MenuStatusScreen ? this.uiHeroes : this.uiMainMenu);
  }

  onBringToBack() {
    uiManager.unfocus();
    this.uiMainMenu.unselectWidgets();
    this.uiHeroes.unselectWidgets();
  }

  handleMainMenuClosed() {
    screenManager.requestPopScreen();
  }

  handleMainMenuItemSelected(data) {
    if (data.id == 'ITEMS') {
      screenManager.requestPushScreen(new MenuItemsScreen());
    }
    else if (data.id == 'STUFFS') {
      screenManager.requestPushScreen(new MenuEquipmentsScreen());
    }
    else if (data.id == 'STATUS') {
      uiManager.focus(this.uiHeroes);
    }
  }

  handleHeroesClosed() {
    this.uiMainMenu.unselectWidgets();
    uiManager.focus(this.uiMainMenu);
  }

  handleHeroesItemSelected(data) {
    let hero = this.uiHeroes.getSelectedItem();
    screenManager.requestPushScreen(new MenuStatusScreen(hero));
  }
}

export { MenuScreen };