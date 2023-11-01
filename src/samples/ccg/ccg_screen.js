import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';
import { Screen } from '../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { Duel } from './core/duel';
import { CREATE_COMMAND, HumanDuelist } from './core/human_duelist';
import { UITurn } from './ui/ui_turn';
import { UIDuelist } from './ui/ui_duelist';
import { UICardDetail } from './ui/ui_card_detail';
import { UIBoard } from './ui/ui_board';
import { UICardSlot } from './ui/ui_card_slot';
// ---------------------------------------------------------------------------------------

class CCGScreen extends Screen {
  constructor() {
    super();
    this.duel = new Duel();
    this.uiBgNode = document.createElement('img');
    this.uiTurn = new UITurn();
    this.uiDuelists = [];
    this.uiCardDetail = new UICardDetail();
    this.uiBoard = new UIBoard();
    this.uiActionMenu = new UIMenuText();
    this.menuEnabled = false;
  }

  async onEnter(args = { duelId }) {
    await this.duel.loadFromFile('samples/ccg/data/duel_' + args.duelId + '/data.json');

    this.uiBgNode.src = 'samples/ccg/bg.gif';
    uiManager.addNode(this.uiBgNode, 'position:absolute; top:0; right:0; bottom:0; left:0; width:100%');

    this.uiTurn.setDuel(this.duel);
    uiManager.addWidget(this.uiTurn, 'position: absolute; top:0; left:0; right:0; line-height:30px; z-index:100');

    this.uiDuelists.push(new UIDuelist());
    this.uiDuelists[0].setDuelist(this.duel.getDuelist(0));
    uiManager.addWidget(this.uiDuelists[0], 'position:absolute; top:30px; left:0; width:20%');

    this.uiDuelists.push(new UIDuelist());
    this.uiDuelists[1].setDuelist(this.duel.getDuelist(1));
    uiManager.addWidget(this.uiDuelists[1], 'position:absolute; top:30px; right:0; width:20%');

    uiManager.addWidget(this.uiCardDetail, 'position: absolute; top:30px; left:20%; width:60%');

    this.uiBoard.setDuel(this.duel);
    uiManager.addWidget(this.uiBoard, 'position:absolute; top:50%; left:0; right:0; width:100%; height:50%');

    this.uiActionMenu.setVisible(false);
    uiManager.addWidget(this.uiActionMenu, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:20;');

    eventManager.subscribe(this.duel, 'E_NEW_TURN', this, this.handleNewTurn);
    eventManager.subscribe(this.duel.getDuelist(1), 'E_SELECT_LOCATION', this, this.handleSelectLocation);
    eventManager.subscribe(this.uiBoard, 'E_SLOT_UNFOCUSED', this, this.handleBoardSlotUnfocused);
    eventManager.subscribe(this.uiBoard, 'E_SLOT_FOCUSED', this, this.handleBoardSlotFocused);
    eventManager.subscribe(this.uiBoard, 'E_OK_PRESSED', this, this.handleBoardSelectPressed);
    eventManager.subscribe(this.uiActionMenu, 'E_CLOSED', this, this.handleActionMenuClosed);
    eventManager.subscribe(this.uiActionMenu, 'E_ITEM_SELECTED', this, this.handleActionMenuItemSelected);

    uiManager.focus(this.uiBoard);
    this.duel.startup();
  }

  async onExit() {
    uiManager.removeNode(this.uiBgNode);
    uiManager.removeWidget(this.uiTurn);
    uiManager.removeWidget(this.uiDuelists[0]);
    uiManager.removeWidget(this.uiDuelists[1]);
    uiManager.removeWidget(this.uiCardDetail);
    uiManager.removeWidget(this.uiBoard);
    uiManager.removeWidget(this.uiActionMenu);
  }

  handleNewTurn() {
    this.uiDuelists[this.duel.getOpponentDuelistIndex()].hideSelection();
    this.uiDuelists[this.duel.getCurrentDuelistIndex()].showSelection();

    if (this.duel.getCurrentDuelist() instanceof HumanDuelist) {
      this.menuEnabled = true;
    }
    else {
      this.menuEnabled = false;
    }
  }

  handleSelectLocation({ range, predicateCard, required, response }) {
    return new Promise(resolve => {
      uiManager.focus(this.uiBoard);

      for (let slot of this.uiBoard.getSlots()) {
        for (let i = 0; i < 2; i++) {
          let duelistIndex = i == 0 ? this.duel.getCurrentDuelistIndex() : this.duel.getOpponentDuelistIndex();
          if (range[i] != 0 && slot.getDuelistIndex() == duelistIndex && range[i].includes(slot.getLocation()) && predicateCard(slot.getCard())) {
            slot.setSelectable(true);
          }
        }
      }

      if (!required) {
        eventManager.subscribe(this.uiBoard, 'E_ECHAP_PRESSED', this, () => {
          eventManager.unsubscribe(this.uiBoard, 'E_ECHAP_PRESSED', this);
          eventManager.unsubscribe(this.uiBoard, 'E_SLOT_SELECTED', this);

          for (let slot of this.uiBoard.getSlots()) {
            slot.setSelectable(false);
          }

          response.state = false;
          resolve();
        });
      }

      eventManager.subscribe(this.uiBoard, 'E_SLOT_SELECTED', this, (data) => {
        if (data.slot.isSelectable()) {
          eventManager.unsubscribe(this.uiBoard, 'E_ECHAP_PRESSED', this);
          eventManager.unsubscribe(this.uiBoard, 'E_SLOT_SELECTED', this);

          for (let slot of this.uiBoard.getSlots()) {
            slot.setSelectable(false);
          }

          response.state = true;
          response.location = data.slot.getLocation();
          response.index = data.slot.getIndex();
          response.card = data.slot.getCard();
          resolve();
        }
      });
    });
  }

  handleBoardSlotUnfocused() {
    this.uiCardDetail.setCard(null);
  }

  handleBoardSlotFocused(data) {
    if (data.slot instanceof UICardSlot && data.slot.getCard() && !data.slot.isHidden()) {
      this.uiCardDetail.setCard(data.slot.getCard());
    }
    else {
      this.uiCardDetail.setCard(null);
    }
  }

  handleBoardSelectPressed() {
    if (!this.menuEnabled) {
      return false;
    }

    this.uiActionMenu.clear();
    let humanDuelist = this.duel.getCurrentDuelist();

    if (humanDuelist.isCapableDraw(this.duel)) {
      this.uiActionMenu.add('DRAW', 'Piocher');
    }

    if (humanDuelist.isCapableSummon(this.duel)) {
      this.uiActionMenu.add('SUMMON', 'Invoquer');
    }

    if (humanDuelist.isCapableSet(this.duel)) {
      this.uiActionMenu.add('SET', 'Poser');
    }

    if (humanDuelist.isCapableBattle(this.duel)) {
      this.uiActionMenu.add('BATTLE', 'Attaquer');
    }

    if (humanDuelist.isCapableActivate(this.duel)) {
      this.uiActionMenu.add('ACTIVATE', 'Activer');
    }

    if (humanDuelist.isCapableChangePosition(this.duel)) {
      this.uiActionMenu.add('CHANGE_POSITION', 'Changer de position');
    }

    this.uiActionMenu.add('NEXT_PHASE', 'Phase suivante');

    this.uiActionMenu.setVisible(true);
    uiManager.focus(this.uiActionMenu);
  }

  handleActionMenuClosed() {
    this.uiActionMenu.setVisible(false);
    uiManager.focus(this.uiBoard);
  }

  async handleActionMenuItemSelected(data) {
    this.uiActionMenu.setVisible(false);
    this.menuEnabled = false;
    let cmd = CREATE_COMMAND(data.id);
    await cmd.exec(this.duel);
    uiManager.focus(this.uiBoard);
    this.menuEnabled = true;
  }
}

export { CCGScreen };