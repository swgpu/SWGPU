import { eventManager } from '../../../lib/core/event_manager';
// ---------------------------------------------------------------------------------------
import { EnemyCharacter } from './enemy_character';
import { NewTurnBattleAction, ApplyEffectBattleAction, LetBattleAction } from './battle_actions';
import { gameManager } from '../game_manager';
// ---------------------------------------------------------------------------------------

let FORMATION_TYPE = {
  NORMAL: 'N',
  A_FIRST: 'A',
  E_FIRST: 'E',
  E_TRAP: 'T'
};

class Battle {
  constructor() {
    this.backgroundImage = '';
    this.jsmFile = '';
    this.jsmTextureFile = '';
    this.cameraPosition = [0, 0, 0];
    this.cameraLookAt = [0, 0, 0];
    this.enemies = [];
    this.player = gameManager.getPlayer();
    this.heroes = this.player.getHeroes();
    this.formationType = FORMATION_TYPE.NORMAL;
    this.numTurns = 0;
    this.characterQueue = [];
  }

  async loadFromData(data) {
    this.backgroundImage = data['BackgroundImage'];
    this.jsmFile = data['JSMFile'];
    this.jsmTextureFile = data['JSMTextureFile'];
    this.cameraPosition = data['CameraPosition'];
    this.cameraLookAt = data['CameraLookAt'];

    for (let obj of data['Enemies']) {
      let enemy = new EnemyCharacter();
      await enemy.loadFromFile('samples/rpg/data/enemy_' + obj['EnemyId'] + '/data.json');
      enemy.setPosition(obj['Position']);
      this.enemies.push(enemy);
    }
  }

  async loadFromFile(path) {
    let response = await fetch(path);
    await this.loadFromData(await response.json());
  }

  startup() {
    this.runAction(new NewTurnBattleAction(this));
  }

  async runAction(action) {
    // exec action
    await eventManager.emit(this, 'E_ACTION_BEFORE', { action: action });
    await action.exec();
    await eventManager.emit(this, 'E_ACTION_AFTER', { action: action });

    // remove died character from the queue
    for (let char of this.characterQueue) {
      if (char.getAttribute('HP') == 0) {
        this.characterQueue.splice(this.characterQueue.indexOf(char), 1);
      }
    }

    // check lost
    let sumHeroHealth = this.heroes.reduce((s, hero) => s + hero.getAttribute('HP'), 0);
    if (sumHeroHealth == 0) {
      return eventManager.emit(this, 'E_LOST');
    }

    // check win
    let sumEnemyHealth = this.enemies.reduce((s, enemy) => s + enemy.getAttribute('HP'), 0);
    if (sumEnemyHealth == 0) {
      return eventManager.emit(this, 'E_WIN');
    }

    // if queue is empty everybody has played, return and create new turn !
    if (this.characterQueue.length == 0) {
      return this.runAction(new NewTurnBattleAction(this));
    }

    // else, set character ready
    let ready = this.characterQueue.filter(char => char.isReady());
    if (ready.length == 0) {
      let i = 0;
      while (i < this.characterQueue.length && this.characterQueue[0].getType() == this.characterQueue[i].getType()) {
        ready.push(this.characterQueue[i]);
        this.characterQueue[i].setReady(true);
        i++;
      }
    }
    
    await eventManager.emit(this, 'E_CHAR_READY', { char: ready[0] });

    if (ready[0] instanceof EnemyCharacter) {
      this.handleAI();
    }
  }

  async operationNewTurn() {
    let characters = [...this.heroes, ...this.enemies];
    characters = characters.sort((a, b) => b.getAttribute('AGILITY') - a.getAttribute('AGILITY'));
    characters = characters.filter(c => c.getAttribute('HP') > 0);

    for (let char of characters) {
      for (let seal of char.getActiveSeals()) {
        seal.incTurnCount();
        if (seal.getOnTurnEffect()) {
          let effect = seal.getOnTurnEffect();
          await effect.apply(seal.getFromChar(), char);
        }
        if (seal.getTurnCount() == seal.getNumTurns()) {
          char.removeSeal(seal);
        }
      }

      char.setReady(false);
    }

    this.numTurns++;
    this.characterQueue = characters;
    eventManager.emit(this, 'E_NEW_TURN');
  }

  async operationLet(fromChar) {
    fromChar.setReady(false);
    this.characterQueue.splice(this.characterQueue.indexOf(fromChar), 1);
  }

  async operationApplyEffect(effect, fromChar, toChar) {
    await effect.apply(fromChar, toChar);
    let attributes = fromChar.getAttributes();
    attributes.add('MP', - effect.getCost());

    fromChar.setReady(false);
    this.characterQueue.splice(this.characterQueue.indexOf(fromChar), 1);
  }

  async operationApplyItem(item, fromChar, toChar) {
    let inventory = this.player.getInventory();
    let effect = item.getEffect();

    await effect.apply(fromChar, toChar);
    inventory.removeItemById(item.getId());

    fromChar.setReady(false);
    this.characterQueue.splice(this.characterQueue.indexOf(fromChar), 1);
  }

  handleAI() {
    let enemy = this.characterQueue[0];
    let charArray = [...this.heroes, ...this.enemies];

    let orderedPatterns = enemy.patterns.sort((a, b) => a.priority - b.priority);
    let availablePatterns = orderedPatterns.filter(pattern => pattern.isConditionCheck(this, enemy));

    let selectedEffect = null;
    let selectedTarget = null;

    if (availablePatterns.length == 0) {
      availablePatterns = enemy.patterns;
    }

    for (let pattern of availablePatterns) {
      let targets = charArray.filter(char => pattern.effect.isTargetCharConditionCheck(enemy, char));
      if (targets.length > 0) {
        selectedEffect = pattern.effect;
        selectedTarget = pattern.targetCharSort(targets)[0];
        break;
      }
    }

    if (selectedEffect && selectedTarget) {
      this.runAction(new ApplyEffectBattleAction(this, selectedEffect, enemy, selectedTarget));
    }
    else {
      this.runAction(new LetBattleAction(this, enemy));
    }
  }

  getBackgroundImage() {
    return this.backgroundImage;
  }

  getJSMFile() {
    return this.jsmFile;
  }

  getJSMTextureFile() {
    return this.jsmTextureFile;
  }

  getCameraPosition() {
    return this.cameraPosition;
  }

  getCameraLookAt() {
    return this.cameraLookAt;
  }

  getEnemies() {
    return this.enemies;
  }

  getHeroes() {
    return this.heroes;
  }

  getFormationType() {
    return this.formationType;
  }

  getNumTurns() {
    return this.numTurns;
  }

  getCharacterQueue() {
    return this.characterQueue;
  }
}

export { Battle };