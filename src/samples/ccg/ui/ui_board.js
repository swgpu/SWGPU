import { eventManager } from '../../../lib/core/event_manager';
import { UIWidget } from '../../../lib/ui/ui_widget';
import { UT } from '../../../lib/core/utils';
// ---------------------------------------------------------------------------------------
import { LOCATION } from '../core/enums';
import { UICardSlot } from './ui_card_slot';
import { UIStackSlot } from './ui_stack_slot';
// ---------------------------------------------------------------------------------------

class UIBoard extends UIWidget {
  constructor() {
    super({
      className: 'UIBoard',
      template: `
      <div class="UIBoard-fields">
        <div class="UIBoard-field" data-duelist-index="0">
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="MZONE" style="top:80px; left:127px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="MZONE" style="top:80px; left:177px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="MZONE" style="top:80px; left:227px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="SZONE" style="top:10px; left:127px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="SZONE" style="top:10px; left:177px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="SZONE" style="top:10px; left:227px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="FZONE" style="top:150px; left:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="GRAVEYARD" style="top:80px; left:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="DECK" style="top:10px; left:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="0" data-location="HAND" style="top:10px; right:10px;"></div>
        </div>
        <div class="UIBoard-field" data-duelist-index="1">
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="MZONE" style="bottom:80px; right:127px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="MZONE" style="bottom:80px; right:177px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="MZONE" style="bottom:80px; right:227px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="SZONE" style="bottom:10px; right:127px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="SZONE" style="bottom:10px; right:177px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="SZONE" style="bottom:10px; right:227px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="FZONE" style="bottom:150px; right:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="GRAVEYARD" style="bottom:80px; right:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="DECK" style="bottom:10px; right:10px;"></div>
          <div class="UIBoard-field-zone js-zone" data-duelist-index="1" data-location="HAND" style="bottom:10px; left:10px;"></div>
        </div>
      </div>`
    });

    this.duel = null;
    this.slots = [];
    this.focusedSlot = null;

    let spellSlot00 = CREATE_CARD_SLOT(0, LOCATION.SZONE, 0, false);
    let spellZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="SZONE"]`)[0];
    spellZone00.appendChild(spellSlot00.getNode());
    this.slots.push(spellSlot00);

    let spellSlot01 = CREATE_CARD_SLOT(0, LOCATION.SZONE, 1, false);
    let spellZone01 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="SZONE"]`)[1];
    spellZone01.appendChild(spellSlot01.getNode());
    this.slots.push(spellSlot01);

    let spellSlot02 = CREATE_CARD_SLOT(0, LOCATION.SZONE, 2, false);
    let spellZone02 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="SZONE"]`)[2];
    spellZone02.appendChild(spellSlot02.getNode());
    this.slots.push(spellSlot02);

    let monsterSlot00 = CREATE_CARD_SLOT(0, LOCATION.MZONE, 0, false);
    let monsterZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="MZONE"]`)[0];
    monsterZone00.appendChild(monsterSlot00.getNode());
    this.slots.push(monsterSlot00);

    let monsterSlot01 = CREATE_CARD_SLOT(0, LOCATION.MZONE, 1, false);
    let monsterZone01 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="MZONE"]`)[1];
    monsterZone01.appendChild(monsterSlot01.getNode());
    this.slots.push(monsterSlot01);

    let monsterSlot02 = CREATE_CARD_SLOT(0, LOCATION.MZONE, 2, false);
    let monsterZone02 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="MZONE"]`)[2];
    monsterZone02.appendChild(monsterSlot02.getNode());
    this.slots.push(monsterSlot02);

    let handSlot00 = CREATE_CARD_SLOT(0, LOCATION.HAND, 0, true);
    let handZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="HAND"]`)[0];
    handZone00.appendChild(handSlot00.getNode());
    this.slots.push(handSlot00);

    let handSlot01 = CREATE_CARD_SLOT(0, LOCATION.HAND, 1, true);
    handZone00.appendChild(handSlot01.getNode());
    this.slots.push(handSlot01);

    let handSlot02 = CREATE_CARD_SLOT(0, LOCATION.HAND, 2, true);
    handZone00.appendChild(handSlot02.getNode());
    this.slots.push(handSlot02);

    let handSlot03 = CREATE_CARD_SLOT(0, LOCATION.HAND, 3, true);
    handZone00.appendChild(handSlot03.getNode());
    this.slots.push(handSlot03);

    let handSlot04 = CREATE_CARD_SLOT(0, LOCATION.HAND, 4, true);
    handZone00.appendChild(handSlot04.getNode());
    this.slots.push(handSlot04);

    let handSlot05 = CREATE_CARD_SLOT(0, LOCATION.HAND, 5, true);
    handZone00.appendChild(handSlot05.getNode());
    this.slots.push(handSlot05);

    let fieldSlot00 = CREATE_CARD_SLOT(0, LOCATION.FZONE, 0, false);
    let fieldZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="FZONE"]`)[0];
    fieldZone00.appendChild(fieldSlot00.getNode());
    this.slots.push(fieldSlot00);

    let graveyardSlot00 = CREATE_STACK_SLOT(0, LOCATION.GRAVEYARD, false);
    let graveyardZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="GRAVEYARD"]`)[0];
    graveyardZone00.appendChild(graveyardSlot00.getNode());
    this.slots.push(graveyardSlot00);

    let deckSlot00 = CREATE_STACK_SLOT(0, LOCATION.DECK, true);
    let deckZone00 = this.node.querySelectorAll(`.js-zone[data-duelist-index="0"][data-location="DECK"]`)[0];
    deckZone00.appendChild(deckSlot00.getNode());
    this.slots.push(deckSlot00);

    // ----------------------------------------------------------------------------------------------------------------------------

    let spellSlot10 = CREATE_CARD_SLOT(1, LOCATION.SZONE, 0, false);
    let spellZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="SZONE"]`)[0];
    spellZone10.appendChild(spellSlot10.getNode());
    this.slots.push(spellSlot10);

    let spellSlot11 = CREATE_CARD_SLOT(1, LOCATION.SZONE, 1, false);
    let spellZone11 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="SZONE"]`)[1];
    spellZone11.appendChild(spellSlot11.getNode());
    this.slots.push(spellSlot11);

    let spellSlot12 = CREATE_CARD_SLOT(1, LOCATION.SZONE, 2, false);
    let spellZone12 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="SZONE"]`)[2];
    spellZone12.appendChild(spellSlot12.getNode());
    this.slots.push(spellSlot12);

    let monsterSlot10 = CREATE_CARD_SLOT(1, LOCATION.MZONE, 0, false);
    let monsterZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="MZONE"]`)[0];
    monsterZone10.appendChild(monsterSlot10.getNode());
    this.slots.push(monsterSlot10);

    let monsterSlot11 = CREATE_CARD_SLOT(1, LOCATION.MZONE, 1, false);
    let monsterZone11 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="MZONE"]`)[1];
    monsterZone11.appendChild(monsterSlot11.getNode());
    this.slots.push(monsterSlot11);

    let monsterSlot12 = CREATE_CARD_SLOT(1, LOCATION.MZONE, 2, false);
    let monsterZone12 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="MZONE"]`)[2];
    monsterZone12.appendChild(monsterSlot12.getNode());
    this.slots.push(monsterSlot12);

    let handSlot10 = CREATE_CARD_SLOT(1, LOCATION.HAND, 0, false);
    let handZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="HAND"]`)[0];
    handZone10.appendChild(handSlot10.getNode());
    this.slots.push(handSlot10);

    let handSlot11 = CREATE_CARD_SLOT(1, LOCATION.HAND, 1, false);
    handZone10.appendChild(handSlot11.getNode());
    this.slots.push(handSlot11);

    let handSlot12 = CREATE_CARD_SLOT(1, LOCATION.HAND, 2, false);
    handZone10.appendChild(handSlot12.getNode());
    this.slots.push(handSlot12);

    let handSlot13 = CREATE_CARD_SLOT(1, LOCATION.HAND, 3, false);
    handZone10.appendChild(handSlot13.getNode());
    this.slots.push(handSlot13);

    let handSlot14 = CREATE_CARD_SLOT(1, LOCATION.HAND, 4, false);
    handZone10.appendChild(handSlot14.getNode());
    this.slots.push(handSlot14);

    let handSlot15 = CREATE_CARD_SLOT(1, LOCATION.HAND, 5, false);
    handZone10.appendChild(handSlot15.getNode());
    this.slots.push(handSlot15);

    let fieldSlot10 = CREATE_CARD_SLOT(1, LOCATION.FZONE, 0, false);
    let fieldZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="FZONE"]`)[0];
    fieldZone10.appendChild(fieldSlot10.getNode());
    this.slots.push(fieldSlot10);

    let graveyardSlot10 = CREATE_STACK_SLOT(1, LOCATION.GRAVEYARD, false);
    let graveyardZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="GRAVEYARD"]`)[0];
    graveyardZone10.appendChild(graveyardSlot10.getNode());
    this.slots.push(graveyardSlot10);

    let deckSlot10 = CREATE_STACK_SLOT(1, LOCATION.DECK, false);
    let deckZone10 = this.node.querySelectorAll(`.js-zone[data-duelist-index="1"][data-location="DECK"]`)[0];
    deckZone10.appendChild(deckSlot10.getNode());
    this.slots.push(deckSlot10);

    this.focusedSlot = deckSlot00;
  }

  update() {
    if (this.duel) {
      for (let slot of this.slots) {
        let duelist = this.duel.getDuelist(slot.getDuelistIndex());
        if (slot instanceof UICardSlot) {
          slot.setCard(duelist.getCard(slot.getLocation(), slot.getIndex()));
        }
        else {
          slot.setCards(duelist.getZone(slot.getLocation()));
        }
      }

      for (let slot of this.slots) {
        slot.update();
      }
    }
  }

  delete() {
    for (let slot of this.slots) slot.delete();
    super.delete();
  }

  focus() {
    if (this.focusedSlot) {
      this.focusedSlot.focus();
      eventManager.emit(this, 'E_SLOT_FOCUSED', { slot: this.focusedSlot });
    }

    super.focus();
  }

  unfocus() {
    if (this.focusedSlot) {
      this.focusedSlot.unfocus();
      eventManager.emit(this, 'E_SLOT_UNFOCUSED');
    }

    super.unfocus();
  }

  getSlots() {
    return this.slots;
  }

  setDuel(duel) {
    for (let slot of this.slots) {
      if (slot instanceof UICardSlot) slot.setCard(null);
      else if (slot instanceof UIStackSlot) slot.setCards(null);
    }

    this.duel = duel ? duel : null;
  }

  onAction(actionId) {
    if (actionId == 'BACK') {
      eventManager.emit(this, 'E_ECHAP_PRESSED');
    }
    else if (actionId == 'OK') {
      eventManager.emit(this, 'E_SLOT_SELECTED', { slot: this.focusedSlot });
      eventManager.emit(this, 'E_OK_PRESSED');
    }
    else if (actionId == 'UP') {
      this.$moveFocus(0, -1, true);
    }
    else if (actionId == 'DOWN') {
      this.$moveFocus(0, 1, true);
    }
    else if (actionId == 'LEFT') {
      this.$moveFocus(-1, 0, true);
    }
    else if (actionId == 'RIGHT') {
      this.$moveFocus(1, 0, true);
    }
  }

  $moveFocus(mx, my, emit = false) {
    let focusedNode = this.focusedSlot.getNode();
    let focusedPos = getOffset(focusedNode);
    let centerX = focusedPos.left + (focusedNode.offsetWidth * 0.5);
    let centerY = focusedPos.top + (focusedNode.offsetHeight * 0.5);

    let slots = this.slots.slice();
    slots.splice(slots.indexOf(this.focusedSlot), 1);

    let closestSlots = slots.sort((a, b) => {
      let aNode = a.getNode();
      let bNode = b.getNode();
      let aPos = getOffset(aNode);
      let bPos = getOffset(bNode);

      let aCenterX = aPos.left + (aNode.offsetWidth * 0.5);
      let aCenterY = aPos.top  + (aNode.offsetHeight * 0.5);
      let bCenterX = bPos.left + (bNode.offsetWidth * 0.5);
      let bCenterY = bPos.top  + (bNode.offsetHeight * 0.5);
      let aDelta = [aCenterX - centerX, aCenterY - centerY];
      let bDelta = [bCenterX - centerX, bCenterY - centerY];

      aDelta[0] = Math.sign(aDelta[0]) == Math.sign(mx) || mx == 0 ? Math.abs(aDelta[0]) : this.node.offsetWidth - Math.abs(aDelta[0]);
      aDelta[1] = Math.sign(aDelta[1]) == Math.sign(my) || my == 0 ? Math.abs(aDelta[1]) : this.node.offsetHeight - Math.abs(aDelta[1]);

      bDelta[0] = Math.sign(bDelta[0]) == Math.sign(mx) || mx == 0 ? Math.abs(bDelta[0]) : this.node.offsetWidth - Math.abs(bDelta[0]);
      bDelta[1] = Math.sign(bDelta[1]) == Math.sign(my) || my == 0 ? Math.abs(bDelta[1]) : this.node.offsetHeight - Math.abs(bDelta[1]);

      return UT.VEC2_LENGTH(aDelta) - UT.VEC2_LENGTH(bDelta);
    });

    if (this.focusedSlot) {
      this.focusedSlot.unfocus();
    }

    closestSlots[0].focus();
    this.focusedSlot = closestSlots[0];

    if (emit) {
      eventManager.emit(this, 'E_SLOT_FOCUSED', { slot: closestSlots[0] });
    }
  }
}

export { UIBoard };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function CREATE_CARD_SLOT(duelistIndex, location, index, hidden) {
  let slot = new UICardSlot();
  slot.setDuelistIndex(duelistIndex);
  slot.setLocation(location);
  slot.setIndex(index);
  slot.setHidden(hidden);
  return slot;
}

function CREATE_STACK_SLOT(duelistIndex, location, hidden) {
  let slot = new UIStackSlot();
  slot.setDuelistIndex(duelistIndex);
  slot.setLocation(location);
  slot.setHidden(hidden);
  return slot;
}

function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}