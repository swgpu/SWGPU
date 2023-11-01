import { uiManager } from '../../../lib/ui/ui_manager';
import { eventManager } from '../../../lib/core/event_manager';
import { screenManager } from '../../../lib/screen/screen_manager';
import { ArrayCollection } from '../../../lib/core/array_collection';
import { Screen } from '../../../lib/screen/screen';
import { UIText } from '../../../lib/ui_text/ui_text';
import { UIDescriptionList } from '../../../lib/ui_description_list/ui_description_list';
// ---------------------------------------------------------------------------------------
import { gameManager } from '../game_manager';
import { Inventory } from '../core/inventory';
import { UIInventory } from '../shared/ui_inventory';
import { UIHeroes } from '../shared/ui_heroes';
import { UIHeroesEquipment } from '../shared/ui_heroes_equipment';
// ---------------------------------------------------------------------------------------

let SHOP_SCREEN_MODE = {
  COMMON_STORE: 'COMMON_STORE',
  EQUIPMENT_STORE: 'EQUIPMENT_STORE'
};

let CHECKOUT_DESC = {
  QUANTITY: 0,
  TOTAL: 1
};

let PLAYER_DESC = {
  GILS: 0,
  INVENTORY: 1
};

class ShopScreen extends Screen {
  constructor(mode) {
    super();
    this.mode = mode;
    this.player = gameManager.getPlayer();
    this.inventory = this.player.getInventory();
    this.shopInventory = new Inventory();

    this.uiText = new UIText();
    this.uiTitle = new UIText();
    this.uiDescription = new UIText();
    this.uiInventory = new UIInventory({ showPrice: true, showQuantity: false });
    this.uiPlayerDesc = new UIDescriptionList();
    this.uiCheckoutDesc = new UIDescriptionList();
    this.uiHeroes = (mode == SHOP_SCREEN_MODE.COMMON_STORE) ? new UIHeroes() : new UIHeroesEquipment();
    this.handleKeyDownCb = (e) => this.handleKeyDown(e);
  }

  async onEnter(args = { inventoryId }) {
    await this.shopInventory.loadFromFile('samples/rpg/data/inventory_' + args.inventoryId + '/data.json');

    this.uiText.setText('Que voulez-vous acheter ?');
    uiManager.addWidget(this.uiText, 'position:absolute; top:0px; left:0; width:70%; height:50px;');

    this.uiTitle.setText('Magasin');
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:70%; width:30%; height:50px;');

    this.uiDescription.setText('Description...');
    uiManager.addWidget(this.uiDescription, 'position:absolute; top:50px; left:0; width:100%; height:50px;');

    this.uiInventory.setCollection(this.shopInventory);
    uiManager.addWidget(this.uiInventory, 'position:absolute; top:100px; left:0; bottom:0; width:50%;');

    this.uiPlayerDesc.addItem(PLAYER_DESC.GILS, 'Gils', this.player.getGils());
    this.uiPlayerDesc.addItem(PLAYER_DESC.INVENTORY, 'Inventaire', 0);
    uiManager.addWidget(this.uiPlayerDesc, 'position:absolute; top:100px; left:50%; width:50%; height:84px');

    this.uiCheckoutDesc.setVisible(false);
    this.uiCheckoutDesc.addItem(CHECKOUT_DESC.QUANTITY, 'Quantite', 0);
    this.uiCheckoutDesc.addItem(CHECKOUT_DESC.TOTAL, 'Total', 0);
    uiManager.addWidget(this.uiCheckoutDesc, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:10;');

    this.uiHeroes.setCollection(new ArrayCollection(this.player.getHeroes()));
    uiManager.addWidget(this.uiHeroes, 'position:absolute; top:184px; left:50%; bottom:0; width:50%;');

    eventManager.subscribe(this.uiInventory, 'E_CLOSED', this, this.handleInventoryClosed);
    eventManager.subscribe(this.uiInventory, 'E_ITEM_FOCUSED', this, this.handleInventoryItemFocused);
    eventManager.subscribe(this.uiInventory, 'E_ITEM_SELECTED', this, this.handleInventoryItemSelected);
    

    uiManager.focus(this.uiInventory);
  }

  async onExit() {
    document.removeEventListener('keydown', this.handleKeyDownCb);
    uiManager.removeWidget(this.uiText);
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiDescription);
    uiManager.removeWidget(this.uiInventory);
    uiManager.removeWidget(this.uiPlayerDesc);
    uiManager.removeWidget(this.uiCheckoutDesc);
    uiManager.removeWidget(this.uiHeroes);
  }

  handleInventoryClosed() {
    screenManager.requestPopScreen();
  }

  handleInventoryItemFocused(data) {
    let shopItem = this.uiInventory.getFocusedItem();
    let playerItems = this.inventory.getItems();
    let playerItem = playerItems.find(i => i.getId() == shopItem.getId());

    this.uiDescription.setText(shopItem.description);
    this.uiPlayerDesc.setItem(PLAYER_DESC.INVENTORY, playerItem ? playerItem.quantity : '0');

    if (this.mode == SHOP_SCREEN_MODE.COMMON_STORE) {
      for (let widget of this.uiHeroes.getWidgets()) {
        let hero = widget.getHero();
        widget.setEnabled(shopItem.isTarget(hero, hero));
      }
    }
    else {
      for (let widget of this.uiHeroes.getWidgets()) {
        let hero = widget.getHero();
        widget.setEquipmentItem(shopItem);
        widget.setEnabled(hero.isEquipableItem(shopItem));
      }
    }
  }

  handleInventoryItemSelected() {
    this.uiCheckoutDesc.setVisible(true);
    uiManager.focus(this.uiCheckoutDesc);
    document.addEventListener('keydown', this.handleKeyDownCb);
  }

  handleKeyDown(e) {
    let selectedItem = this.uiInventory.getSelectedItem();
    let quantity = parseInt(this.uiCheckoutDesc.getItemValue(CHECKOUT_DESC.QUANTITY));

    if (e.key == 'ArrowUp') {
      let newQuantity = quantity + 1;
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.QUANTITY, newQuantity);
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.TOTAL, newQuantity * selectedItem.getPrice());
    }
    else if (e.key == 'ArrowDown' && quantity > 0) {
      let newQuantity = quantity - 1;
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.QUANTITY, newQuantity);
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.TOTAL, newQuantity * selectedItem.getPrice());
    }
    else if (e.key == 'Enter') {
      let totalPrice = quantity * selectedItem.getPrice();
      if (this.player.getGils() - totalPrice < 0) {
        return
      }

      selectedItem.setQuantity(quantity);
      this.player.decreaseGils(totalPrice);
      this.inventory.addItem(selectedItem);

      this.uiPlayerDesc.setItem(PLAYER_DESC.GILS, this.player.getGils());
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.QUANTITY, 0);
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.TOTAL, 0);
      this.uiCheckoutDesc.setVisible(false);
      this.uiInventory.unselectWidgets();
      uiManager.focus(this.uiInventory);
      document.removeEventListener('keydown', this.handleKeyDownCb);
    }
    else if (e.key == 'Escape') {
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.QUANTITY, 0);
      this.uiCheckoutDesc.setItem(CHECKOUT_DESC.TOTAL, 0);
      this.uiCheckoutDesc.setVisible(false);
      this.uiInventory.unselectWidgets();
      uiManager.focus(this.uiInventory);
      document.removeEventListener('keydown', this.handleKeyDownCb);
    }
  }
}

export { SHOP_SCREEN_MODE };
export { ShopScreen };