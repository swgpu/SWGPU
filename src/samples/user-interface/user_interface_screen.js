import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { Screen } from '../../lib/screen/screen';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
import { UIText } from '../../lib/ui_text/ui_text';
// ---------------------------------------------------------------------------------------

class UserInterfaceScreen extends Screen {
  constructor() {
    super();
    this.uiTitle = new UIText();
    this.uiMenu1 = new UIMenuText();
    this.uiMenu2 = new UIMenuText();
  }

  async onEnter() {
    this.uiTitle.setText('Menu');
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:0; right:0; height:50px');
    
    this.uiMenu1.add('1', 'Menu 1 Text 1');
    this.uiMenu1.add('2', 'Menu 1 Text 2');
    this.uiMenu1.add('3', 'Menu 1 Text 3');
    uiManager.addWidget(this.uiMenu1, 'position:absolute; top:50px; left:0; bottom:0; width:40%');

    this.uiMenu2.add('1', 'Menu 2 Text 1');
    this.uiMenu2.add('2', 'Menu 2 Text 2');
    this.uiMenu2.add('3', 'Menu 2 Test 3');
    uiManager.addWidget(this.uiMenu2, 'position:absolute; top:50px; left:40%; bottom:0; width:60%');

    eventManager.subscribe(this.uiMenu1, 'E_ITEM_SELECTED', this, this.handleMenu1ItemSelected);
    eventManager.subscribe(this.uiMenu2, 'E_CLOSED', this, this.handleMenu2Closed);
    eventManager.subscribe(this.uiMenu2, 'E_ITEM_SELECTED', this, this.handleMenu2ItemSelected);

    uiManager.focus(this.uiMenu1);
  }

  onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiMenu1);
    uiManager.removeWidget(this.uiMenu2);
  }

  handleMenu1ItemSelected(data) {
    uiManager.focus(this.uiMenu2);
  }

  handleMenu2Closed() {
    this.uiMenu1.unselectWidgets();
    uiManager.focus(this.uiMenu1);
  }

  handleMenu2ItemSelected(data) {
    this.uiTitle.setText('You have selected menu item at index : ' + data.index);
    this.uiMenu1.unselectWidgets();
    this.uiMenu2.unselectWidgets();
    uiManager.focus(this.uiMenu1);
  }
}

export { UserInterfaceScreen };