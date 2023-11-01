import { screenManager } from '../../../lib/screen/screen_manager';
import { uiManager } from '../../../lib/ui/ui_manager';
import { eventManager } from '../../../lib/core/event_manager';
import { ArrayCollection } from '../../../lib/core/array_collection';
import { Screen } from '../../../lib/screen/screen';
import { UIText } from '../../../lib/ui_text/ui_text';
import { MenuAxis } from '../../../lib/ui_menu/ui_menu';
import { UIMenuText } from '../../../lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { gameManager } from '../game_manager';
import { EquipmentItem } from '../core/equipment_item';
import { ITEM_TYPE } from '../core/enums';
import { UIInventory } from '../shared/ui_inventory';
import { UIHeroesEquipment } from '../shared/ui_heroes_equipment';
// ---------------------------------------------------------------------------------------

class MenuEquipmentsScreen extends Screen {
  constructor() {
    super();
    this.player = gameManager.getPlayer();
    this.inventory = this.player.getInventory();
    this.uiTopMenu = new UIMenuText({ axis: MenuAxis.X });
    this.uiTitle = new UIText();
    this.uiDescription = new UIText();
    this.uiInventory = new UIInventory({ showPrice: false, showQuantity: true });
    this.uiHeroes = new UIHeroesEquipment();
    this.uiSortMenu = new UIMenuText();
    this.uiFilterMenu = new UIMenuText();
  }

  async onEnter() {
    this.uiTopMenu.add('APPLY', 'Equiper');
    this.uiTopMenu.add('DELETE', 'Supprimer');
    this.uiTopMenu.add('SORT', 'Trier');
    this.uiTopMenu.add('FILTER', 'Filtrer');
    uiManager.addWidget(this.uiTopMenu, 'position:absolute; top:0; left:0; width:70%; height:50px;');

    this.uiTitle.setText('Objets');
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:70%; width:30%; height:50px;');

    this.uiDescription.setText('Description...');
    uiManager.addWidget(this.uiDescription, 'position:absolute; top:50px; left:0; width:100%; height:50px;');

    this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem);
    this.uiInventory.setCollection(this.player.getInventory());
    uiManager.addWidget(this.uiInventory, 'position:absolute; top:100px; left:0; bottom:0; width:40%;');

    this.uiHeroes.setCollection(new ArrayCollection(this.player.getHeroes()));
    uiManager.addWidget(this.uiHeroes, 'position:absolute; top:100px; left:40%; bottom:0; width:60%;');

    this.uiSortMenu.setVisible(false);
    this.uiSortMenu.add('NONE', 'Aucun');
    this.uiSortMenu.add('ALPHA', 'Alphabétique');
    this.uiSortMenu.add('QUANTITY', 'Quantité');
    uiManager.addWidget(this.uiSortMenu, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);');

    this.uiFilterMenu.setVisible(false);
    this.uiFilterMenu.add('NONE', 'Aucun');
    this.uiFilterMenu.add('WEAPON', 'Arme');
    this.uiFilterMenu.add('HELMET', 'Haume');
    this.uiFilterMenu.add('ARMOR', 'Armure');
    this.uiFilterMenu.add('RELIC', 'Relique');
    uiManager.addWidget(this.uiFilterMenu, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);');

    eventManager.subscribe(this.uiTopMenu, 'E_CLOSED', this, this.handleTopMenuClosed);
    eventManager.subscribe(this.uiTopMenu, 'E_FOCUSED', this, this.handleTopMenuFocused);
    eventManager.subscribe(this.uiTopMenu, 'E_ITEM_SELECTED', this, this.handleTopMenuItemSelected);
    eventManager.subscribe(this.uiInventory, 'E_CLOSED', this, this.handleInventoryClosed);
    eventManager.subscribe(this.uiInventory, 'E_ITEM_FOCUSED', this, this.handleInventoryItemFocused);
    eventManager.subscribe(this.uiInventory, 'E_ITEM_SELECTED', this, this.handleInventoryItemSelected);
    eventManager.subscribe(this.uiHeroes, 'E_CLOSED', this, this.handleHeroesClosed);
    eventManager.subscribe(this.uiHeroes, 'E_ITEM_SELECTED', this, this.handleHeroesItemSelected);
    eventManager.subscribe(this.uiSortMenu, 'E_ITEM_SELECTED', this, this.handleSortMenuItemSelected);
    eventManager.subscribe(this.uiFilterMenu, 'E_ITEM_SELECTED', this, this.handleFilterMenuItemSelected);

    uiManager.focus(this.uiTopMenu);
  }

  async onExit() {
    uiManager.removeWidget(this.uiTopMenu);
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiDescription);
    uiManager.removeWidget(this.uiInventory);
    uiManager.removeWidget(this.uiHeroes);
    uiManager.removeWidget(this.uiSortMenu);
    uiManager.removeWidget(this.uiFilterMenu);
  }

  handleTopMenuClosed() {
    screenManager.requestPopScreen();
  }

  handleTopMenuFocused() {
    this.uiTopMenu.setEnabledWidget(0, this.inventory.hasEquipmentItems());
    this.uiTopMenu.setEnabledWidget(1, this.inventory.hasEquipmentItems());
    this.uiDescription.setText('Description...');

    for (let widget of this.uiHeroes.getWidgets()) {
      widget.setEquipmentItem(null);
      widget.setEnabled(true);
    }
  }

  handleTopMenuItemSelected(data) {
    if (data.id == 'APPLY') {
      uiManager.focus(this.uiInventory);
    }
    else if (data.id == 'DELETE') {
      uiManager.focus(this.uiInventory);
    }
    else if (data.id == 'SORT') {
      this.uiSortMenu.setVisible(true);
      uiManager.focus(this.uiSortMenu);
    }
    else if (data.id == 'FILTER') {
      this.uiFilterMenu.setVisible(true);
      uiManager.focus(this.uiFilterMenu);
    }
  }

  handleInventoryClosed() {
    this.uiInventory.unselectWidgets();
    this.uiTopMenu.unselectWidgets();
    uiManager.focus(this.uiTopMenu);
  }

  handleInventoryItemFocused(data) {
    let item = this.uiInventory.getFocusedItem();
    this.uiDescription.setText(item.getDescription());

    for (let widget of this.uiHeroes.getWidgets()) {
      let hero = widget.getHero();
      widget.setEquipmentItem(item);
      widget.setEnabled(hero.isEquipableItem(item));
    }
  }

  handleInventoryItemSelected(data) {
    let topMenuId = this.uiTopMenu.getSelectedId();
    if (topMenuId == 'APPLY') {
      uiManager.focus(this.uiHeroes);
    }
    else if (topMenuId == 'DELETE') {
      let selectedItem = this.uiInventory.getSelectedItem();
      this.inventory.removeItemById(selectedItem.getId());
      this.uiInventory.unselectWidgets();
      this.uiTopMenu.unselectWidgets();
      uiManager.focus(this.uiTopMenu);
    }
  }

  handleHeroesClosed() {
    this.uiHeroes.unselectWidgets();
    this.uiInventory.unselectWidgets();
    uiManager.focus(this.uiInventory);
  }

  handleHeroesItemSelected() {
    let selectedItem = this.uiInventory.getSelectedItem();
    let selectedHero = this.uiHeroes.getSelectedItem();

    let oldItem = selectedHero.setEquipment(selectedItem);
    if (oldItem) {
      this.inventory.addItem(oldItem);
    }

    this.inventory.removeItemById(selectedItem.getId());
    this.uiHeroes.unselectWidgets();
    this.uiInventory.unselectWidgets();
    this.uiTopMenu.unselectWidgets();
    uiManager.focus(this.uiTopMenu);
  }

  handleSortMenuItemSelected(data) {
    if (data.id == 'NONE') {
      this.uiInventory.setSortPredicate(() => true);
    }
    else if (data.id == 'ALPHA') {
      this.uiInventory.setSortPredicate((a, b) => a.getName().localeCompare(b.getName()));
    }
    else if (data.id == 'QUANTITY') {
      this.uiInventory.setSortPredicate((a, b) => a.getQuantity() - b.getQuantity());
    }

    this.uiSortMenu.setVisible(false);
    this.uiTopMenu.unselectWidgets();
    uiManager.focus(this.uiTopMenu);
  }

  handleFilterMenuItemSelected(data) {
    if (data.id == 'NONE') {
      this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem);
    }
    else if (data.id == 'WEAPON') {
      this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem && item.getType() == ITEM_TYPE.WEAPON);
    }
    else if (data.id == 'HELMET') {
      this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem && item.getType() == ITEM_TYPE.HELMET);
    }
    else if (data.id == 'ARMOR') {
      this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem && item.getType() == ITEM_TYPE.ARMOR);
    }
    else if (data.id == 'RELIC') {
      this.uiInventory.setFilterPredicate(item => item instanceof EquipmentItem && item.getType() == ITEM_TYPE.RELIC);
    }

    this.uiFilterMenu.setVisible(false);
    this.uiTopMenu.unselectWidgets();
    uiManager.focus(this.uiTopMenu);
  }
}

export { MenuEquipmentsScreen };