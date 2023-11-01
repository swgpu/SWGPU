import { eventManager } from '../../../lib/core/event_manager';
import { screenManager } from '../../../lib/screen/screen_manager';
import { uiManager } from '../../../lib/ui/ui_manager';
import { ArrayCollection } from '../../../lib/core/array_collection';
import { Screen } from '../../../lib/screen/screen';
import { UIText } from '../../../lib/ui_text/ui_text';
import { UIMenuText } from '../../../lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { gameManager } from '../game_manager';
import { Battle } from '../core/battle';
import { LetBattleAction, ApplyEffectBattleAction, ApplyItemBattleAction, NewTurnBattleAction } from '../core/battle_actions';
import { CommonItem } from '../core/common_item';
import { UIInventory } from '../shared/ui_inventory';
import { UIEffects } from '../shared/ui_effects';
import { UIBattleHeroes } from './ui_battle_heroes';
import { UIBattleStatus } from './ui_battle_status';
import { BattleArea } from './battle_area';
import { HeroCharacter } from '../core/hero_character';
// ---------------------------------------------------------------------------------------

class BattleScreen extends Screen {
  constructor() {
    super();
    this.player = gameManager.getPlayer();
    this.inventory = this.player.getInventory();
    this.battle = new Battle();
    this.uiTitle = new UIText();
    this.uiActionMenu = new UIMenuText();
    this.uiEffects = new UIEffects();
    this.uiInventory = new UIInventory({ showPrice: false, showQuantity: true });
    this.uiHeroes = new UIBattleHeroes();
    this.uiStatus = new UIBattleStatus();
    this.area = new BattleArea();
  }

  async onEnter(args = { battleId }) {
    await this.battle.loadFromFile('samples/rpg/data/battle_' + args.battleId + '/data.json');

    this.uiTitle.setVisible(false);
    uiManager.addWidget(this.uiTitle, 'position:absolute; top:0; left:0; right:0; height:50px; z-index:2;');

    this.uiActionMenu.add('ATTACK', 'Attaques');
    this.uiActionMenu.add('MAGIC', 'Magies');
    this.uiActionMenu.add('ITEMS', 'Objets');
    this.uiActionMenu.add('LET', 'Passer');
    uiManager.addWidget(this.uiActionMenu, 'position:absolute; bottom:0; left:0; width:20%; height:150px; z-index:1;');

    this.uiEffects.setVisible(false);
    uiManager.addWidget(this.uiEffects, 'position:absolute; top:50px; bottom:150px; left:0; right:0; z-index:2;');

    this.uiInventory.setVisible(false);
    this.uiInventory.setFilterPredicate(item => item instanceof CommonItem);
    uiManager.addWidget(this.uiInventory, 'position:absolute; top:50px; bottom:150px; left:0; right:0; z-index:2;');

    this.uiHeroes.setCollection(new ArrayCollection(this.player.getHeroes()));
    uiManager.addWidget(this.uiHeroes, 'position:absolute; bottom:0; left:20%; right:0; height:150px; z-index:1;');

    this.uiStatus.setBattle(this.battle);
    uiManager.addWidget(this.uiStatus, 'position:absolute; top:0; left:0; right:0; height:50px; z-index:1;');

    await this.area.loadFromBattle(this.battle);

    eventManager.subscribe(this.battle, 'E_CHAR_READY', this, this.handleBattleCharReady);
    eventManager.subscribe(this.battle, 'E_ACTION_BEFORE', this, this.handleBattleActionBefore);
    eventManager.subscribe(this.battle, 'E_ACTION_AFTER', this, this.handleBattleActionAfter);
    eventManager.subscribe(this.battle, 'E_WIN', this, this.handleBattleWin);
    eventManager.subscribe(this.battle, 'E_LOST', this, this.handleBattleLost);
    eventManager.subscribe(this.uiHeroes, 'E_ITEM_FOCUSED', this, this.handleHeroesItemFocused);
    eventManager.subscribe(this.uiHeroes, 'E_ITEM_SELECTED', this, this.handleHeroesItemSelected);
    eventManager.subscribe(this.uiActionMenu, 'E_CLOSED', this, this.handleActionMenuClosed);
    eventManager.subscribe(this.uiActionMenu, 'E_ITEM_SELECTED', this, this.handleActionMenuItemSelected);
    eventManager.subscribe(this.uiEffects, 'E_CLOSED', this, this.handleEffectsClosed);
    eventManager.subscribe(this.uiEffects, 'E_ITEM_SELECTED', this, this.handleEffectsItemSelected);
    eventManager.subscribe(this.uiInventory, 'E_CLOSED', this, this.handleItemsMenuClosed);
    eventManager.subscribe(this.uiInventory, 'E_ITEM_SELECTED', this, this.handleItemsMenuItemSelected);
    eventManager.subscribe(this.area, 'E_CLOSED', this, this.handleAreaClosed);
    eventManager.subscribe(this.area, 'E_ENTER_PRESSED', this, this.handleAreaEnterPressed);

    this.battle.startup();
  }

  async onExit() {
    uiManager.removeWidget(this.uiTitle);
    uiManager.removeWidget(this.uiActionMenu);
    uiManager.removeWidget(this.uiEffects);
    uiManager.removeWidget(this.uiInventory);
    uiManager.removeWidget(this.uiHeroes);
    uiManager.removeWidget(this.uiStatus);
    this.area.delete();
  }

  update(ts) {
    this.area.update(ts);
  }

  draw() {
    this.area.draw();
  }

  handleBattleCharReady(data) {
    if (data.char instanceof HeroCharacter) {
      uiManager.focus(this.uiHeroes);
    }
  }

  async handleBattleActionBefore(data) {
    if (data.action instanceof NewTurnBattleAction == false) {
      if (data.action.toChar instanceof HeroCharacter) {
        await this.area.cameraOnAlly();
      }
      else {
        await this.area.cameraOnEnemy();
      }
    }
  }

  async handleBattleActionAfter(data) {
    if (data.action instanceof NewTurnBattleAction == false) {
      await this.area.cameraOnDefault();
    }    
  }

  handleBattleWin() {
    screenManager.requestPopScreen();
  }

  handleBattleLost() {
    screenManager.requestPopScreen();
  }

  handleHeroesItemFocused(data) {
    let fighters = this.area.getFighters();
    let index = fighters.findIndex(fighter => fighter.getCharacter() == this.uiHeroes.getFocusedItem());
    this.area.focusFighter(index);
  }

  handleHeroesItemSelected() {
    uiManager.focus(this.uiActionMenu);
  }

  handleActionMenuClosed() {
    this.uiHeroes.unselectWidgets();
    uiManager.focus(this.uiHeroes);
  }

  handleActionMenuItemSelected(data) {
    let selectedHero = this.uiHeroes.getSelectedItem();
    if (data.id == 'ATTACK') {
      this.uiTitle.setText('Attaques');
      this.uiEffects.setCollection(new ArrayCollection(selectedHero.getAttackEffects()));
      this.uiEffects.setEnablePredicate(effect => effect.isUsable(selectedHero));
      this.uiTitle.setVisible(true);
      this.uiEffects.setVisible(true);
      uiManager.focus(this.uiEffects);
    }
    else if (data.id == 'MAGIC') {
      this.uiTitle.setText('Magies');
      this.uiEffects.setCollection(new ArrayCollection(selectedHero.getMagicEffects()));
      this.uiEffects.setEnablePredicate(effect => effect.isUsable(selectedHero));
      this.uiTitle.setVisible(true);
      this.uiEffects.setVisible(true);
      uiManager.focus(this.uiEffects);
    }
    else if (data.id == 'ITEMS') {
      this.uiTitle.setText('Objets');
      this.uiInventory.setCollection(this.inventory);
      this.uiTitle.setVisible(true);
      this.uiInventory.setVisible(true);
      uiManager.focus(this.uiInventory);
    }
    else if (data.id == 'LET') {
      this.battle.runAction(new LetBattleAction(this.battle, selectedHero));
      this.uiActionMenu.unselectWidgets();
      this.uiHeroes.unselectWidgets();
    }
  }

  handleEffectsClosed() {
    this.uiTitle.setVisible(false);
    this.uiEffects.setVisible(false);
    this.uiActionMenu.unselectWidgets();
    uiManager.focus(this.uiActionMenu);
  }

  handleEffectsItemSelected() {
    let selectedHero = this.uiHeroes.getSelectedItem();
    let selectedEffect = this.uiEffects.getSelectedItem();
    
    this.uiTitle.setVisible(false);
    this.uiEffects.setVisible(false);

    this.area.setFocusableFighterPredicate(fighter => selectedEffect.isTargetCharConditionCheck(selectedHero, fighter.getCharacter()));
    this.area.requestSelection();
    uiManager.unfocus();
  }

  handleItemsMenuClosed() {
    this.uiTitle.setVisible(false);
    this.uiInventory.setVisible(false);
    this.uiActionMenu.unselectWidgets();
    uiManager.focus(this.uiActionMenu);
  }

  handleItemsMenuItemSelected() {
    let selectedHero = this.uiHeroes.getSelectedItem();
    let selectedItem = this.uiInventory.getSelectedItem();

    this.uiTitle.setVisible(false);
    this.uiInventory.setVisible(false);

    this.area.setFocusableFighterPredicate(fighter => selectedItem.isTarget(selectedHero, fighter.getCharacter()));
    this.area.requestSelection();
    uiManager.unfocus();
  }

  handleAreaClosed() {
    let actionId = this.uiActionMenu.getSelectedId();
    if (actionId == 'ATTACK' || actionId == 'MAGIC') {
      this.uiTitle.setVisible(true);
      this.uiEffects.setVisible(true);
      this.uiEffects.unselectWidgets();
      uiManager.focus(this.uiEffects);
    }
    else if (actionId == 'ITEMS') {
      this.uiTitle.setVisible(true);
      this.uiInventory.setVisible(true);
      this.uiInventory.unselectWidgets();
      uiManager.focus(this.uiInventory);
    }
  }

  async handleAreaEnterPressed() {
    let actionId = this.uiActionMenu.getSelectedId();
    let selectedHero = this.uiHeroes.getSelectedItem();
    let selectedTarget = this.area.getFocusedFighter().getCharacter();

    if (actionId == 'ATTACK' || actionId == 'MAGIC') {
      let selectedEffect = this.uiEffects.getSelectedItem();
      await this.battle.runAction(new ApplyEffectBattleAction(this.battle, selectedEffect, selectedHero, selectedTarget));
    }
    else if (actionId == 'ITEMS') {
      let selectedItem = this.uiInventory.getSelectedItem();
      await this.battle.runAction(new ApplyItemBattleAction(this.battle, selectedItem, selectedHero, selectedTarget));
    }

    this.uiActionMenu.unselectWidgets();
    this.uiHeroes.unselectWidgets();
  }
}

export { BattleScreen };