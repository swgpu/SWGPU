import { eventManager } from '../../../lib/core/event_manager';
import { gfx3TextureManager } from '../../../lib/gfx3/gfx3_texture_manager';
import { Gfx3MeshJSM } from '../../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------
import { BattleAreaFighter } from './battle_area_fighter';
import { BattleCamera } from './battle_camera';
// ---------------------------------------------------------------------------------------

const LOC_ALLIES = {
  '1N': [[-3, 0, 0, 0]],
  '2N': [[-3, 0, 1, 0], [-3, 0, -1, 0]],
  '3N': [[-3, 0, 2, 0], [-3, 0, 0, 0], [-3, 0, -2, 0]],
  '4N': [[-3, 0, 3, 0], [-3, 0, 1, 0], [-3, 0, -1, 0], [-3, 0, -3, 0]]
};

const LOC_ENEMIES = {
  '1N': [[3, 0, 0, Math.PI]],
  '2N': [[3, 0, 1, Math.PI], [-3, 0, -1, Math.PI]],
  '3N': [[3, 0, 2, Math.PI], [-3, 0, 0, Math.PI], [-3, 0, -2, Math.PI]],
  '4N': [[3, 0, 3, Math.PI], [-3, 0, 1, Math.PI], [-3, 0, -1, Math.PI], [-3, 0, -3, Math.PI]]
};

const ALLY_VIEWSPOT_POS = [-5, 5, 9];
const ALLY_VIEWSPOT_LOOKAT = [-3, 0, 0];

const ENEMY_VIEWSPOT_POS = [5, 5, 9];
const ENEMY_VIEWSPOT_LOOKAT = [3, 0, 0];

class BattleArea {
  constructor() {
    this.battle = null;
    this.fighters = [];
    this.focusableFighterPredicate = () => true;
    this.focusedFighter = null;
    this.camera = new BattleCamera();

    this.map = new Gfx3MeshJSM();
    this.focusIcon = new Gfx3MeshJSM();
    this.handleKeyDownCb = (e) => this.handleKeyDown(e);
  }

  async loadFromBattle(battle) {
    for (let fighter of this.fighters) {
      fighter.delete();
    }

    this.focusIcon = new Gfx3MeshJSM();
    await this.focusIcon.loadFromFile('samples/rpg/jsms/focus.jsm');
    this.focusIcon.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture('samples/rpg/jsms/focus.png') }));

    if (battle) {
      const cameraPos = battle.getCameraPosition();
      this.camera.setPosition(cameraPos[0], cameraPos[1], cameraPos[2]);

      const cameraLookAt = battle.getCameraLookAt();
      this.camera.setLookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);

      this.map = new Gfx3MeshJSM();
      await this.map.loadFromFile(battle.getJSMFile());
      this.map.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(battle.getJSMTextureFile()) }));

      let heroes = battle.getHeroes();
      for (let i = 0; i < heroes.length; i++) {
        let fighter = new BattleAreaFighter();
        let loc = LOC_ALLIES[heroes.length + battle.getFormationType()][i];
        await fighter.loadFromCharacter(heroes[i]);
        fighter.setPosition(loc[0], loc[1], loc[2]);
        fighter.setRotation(0, loc[3], 0);
        this.fighters.push(fighter);
      }

      let enemies = battle.getEnemies();
      for (let i = 0; i < enemies.length; i++) {
        let fighter = new BattleAreaFighter();
        let loc = LOC_ENEMIES[enemies.length + battle.getFormationType()][i];
        await fighter.loadFromCharacter(enemies[i]);
        fighter.setPosition(loc[0], loc[1], loc[2]);
        fighter.setRotation(0, loc[3], 0);
        this.fighters.push(fighter);
      }

      this.battle = battle;
    }
    else {
      this.battle = null;
    }
  }

  delete() {
    for (let fighter of this.fighters) fighter.delete();
    this.map.delete();
    this.focusIcon.delete();
  }

  update(ts) {
    for (let fighter of this.fighters) {
      fighter.update(ts);
    }

    if (this.focusedFighter) {
      let pos = this.focusedFighter.getPosition();
      let size = this.focusedFighter.getSize();
      this.focusIcon.setPosition(pos[0], pos[1] + size[1] + 0.5, pos[2]);
      this.focusIcon.rotate(0, 0.05, 0);
      this.focusIcon.update(ts);
    }

    this.camera.update(ts);
    this.map.update(ts);
  }

  draw() {
    for (let fighter of this.getFighters()) {
      fighter.draw();
    }

    if (this.focusedFighter) {
      this.focusIcon.draw();
    }

    this.map.draw();
  }

  setFocusableFighterPredicate(focusableFighterPredicate) {
    for (let i = 0; i < this.fighters.length; i++) {
      let fighter = this.fighters[i];
      if (focusableFighterPredicate(fighter)) {
        this.focusFighter(i, true);
        break;
      }
    }

    this.focusableFighterPredicate = focusableFighterPredicate;
  }

  focusFighter(index, emit = false) {
    let fighter = this.fighters[index];
    if (!fighter) {
      throw new Error('UIBattleArea::focusFighter(): fighter not found !');
    }

    this.focusedFighter = fighter;

    if (emit) {
      eventManager.emit(this, 'E_FIGHTER_FOCUSED', { fighter: fighter, index: index });
    }
  }

  unfocusFighter(emit = false) {
    if (!this.focusedFighter) {
      return;
    }

    this.focusedFighter = null;

    if (emit) {
      eventManager.emit(this, 'E_FIGHTER_UNFOCUSED');
    }
  }

  prevFocus() {
    let focusIndex = this.fighters.indexOf(this.focusedFighter);
    let i = 0;

    while (i < this.fighters.length) {
      focusIndex = focusIndex - 1 < 0 ? this.fighters.length - 1 : focusIndex - 1;
      if (this.focusableFighterPredicate(this.fighters[focusIndex])) {
        this.focusFighter(focusIndex, true);
        break;
      }

      i++;
    }
  }

  nextFocus() {
    let focusIndex = this.fighters.indexOf(this.focusedFighter);
    let i = 0;

    while (i < this.fighters.length) {
      focusIndex = focusIndex + 1 > this.fighters.length - 1 ? 0 : focusIndex + 1;
      if (this.focusableFighterPredicate(this.fighters[focusIndex])) {
        this.focusFighter(focusIndex, true);
        break;
      }

      i++;
    }
  }

  async cameraOnAlly() {
    this.camera.play(ALLY_VIEWSPOT_POS, ALLY_VIEWSPOT_LOOKAT, 1500);
    await eventManager.wait(this.camera, 'E_FINISHED');
  }

  async cameraOnEnemy() {
    this.camera.play(ENEMY_VIEWSPOT_POS, ENEMY_VIEWSPOT_LOOKAT, 1500);
    await eventManager.wait(this.camera, 'E_FINISHED');
  }

  async cameraOnDefault() {
    this.camera.playBack(1500);
    await eventManager.wait(this.camera, 'E_FINISHED');
  }

  requestSelection() {
    document.addEventListener('keydown', this.handleKeyDownCb);
  }

  getFighters() {
    return this.fighters;
  }

  getFocusedFighter() {
    return this.focusedFighter;
  }

  handleKeyDown(e) {
    if (e.key == 'Escape') {
      document.removeEventListener('keydown', this.handleKeyDownCb);
      eventManager.emit(this, 'E_CLOSED');
    }
    else if (e.key == 'Enter') {
      document.removeEventListener('keydown', this.handleKeyDownCb);
      eventManager.emit(this, 'E_ENTER_PRESSED');      
    }
    else if (e.key == 'ArrowLeft') {
      this.prevFocus();
    }
    else if (e.key == 'ArrowRight') {
      this.nextFocus();
    }    
  }
}

export { BattleArea };