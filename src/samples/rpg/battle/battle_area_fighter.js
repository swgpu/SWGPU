import { uiManager } from '../../../lib/ui/ui_manager';
import { eventManager } from '../../../lib/core/event_manager';
import { gfx3Manager } from '../../../lib/gfx3/gfx3_manager';
import { gfx3TextureManager } from '../../../lib/gfx3/gfx3_texture_manager';
import { Gfx3Transformable } from '../../../lib/gfx3/gfx3_transformable';
import { Gfx3MeshJAM } from '../../../lib/gfx3_mesh/gfx3_mesh_jam';
import { Gfx3Material } from '../../../lib/gfx3_mesh/gfx3_mesh_material';
import { Gfx3SpriteJAS } from '../../../lib/gfx3_sprite/gfx3_sprite_jas';
// ---------------------------------------------------------------------------------------

class BattleAreaFighter extends Gfx3Transformable {
  constructor() {
    super();
    this.character = null;
    this.effectSprite = new Gfx3SpriteJAS();;
    this.effectVisible = false;
    this.mesh = new Gfx3MeshJAM();
  }

  delete() {
    this.effectSprite.delete();
    this.mesh.delete();
  }

  update(ts) {
    const meshAABB = this.mesh.getBoundingBox();
    const meshSize = meshAABB.getSize();

    this.effectSprite.setPosition(this.position[0], this.position[1] + (meshSize[1] * 0.5), this.position[2]);
    this.effectSprite.update(ts);

    this.mesh.setPosition(this.position[0], this.position[1], this.position[2]);
    this.mesh.setRotation(this.rotation[0], this.rotation[1], this.rotation[2]);
    this.mesh.update(ts);
  }

  draw() {
    if (this.effectVisible) {
      this.effectSprite.draw();
    }

    this.mesh.draw();
  }

  async loadFromCharacter(character) {
    eventManager.unsubscribe(this.character, 'E_EFFECT_INFLICT', this);
    eventManager.unsubscribe(this.character, 'E_INCREASE_HP', this);
    eventManager.unsubscribe(this.character, 'E_DECREASE_HP', this);
    eventManager.unsubscribe(this.character, 'E_INCREASE_MP', this);
    eventManager.unsubscribe(this.character, 'E_DECREASE_MP', this);
    eventManager.unsubscribe(this.character, 'E_SEAL_ADD_FAILED', this);
    eventManager.unsubscribe(this.character, 'E_SEAL_ADDED', this);
    eventManager.unsubscribe(this.character, 'E_SEAL_REMOVE_FAILED', this);
    eventManager.unsubscribe(this.character, 'E_SEAL_REMOVED', this);

    if (character) {
      eventManager.subscribe(character, 'E_EFFECT_INFLICT', this, this.handleEffectInflict);
      eventManager.subscribe(character, 'E_INCREASE_HP', this, this.handleCharacterIncreaseHP);
      eventManager.subscribe(character, 'E_DECREASE_HP', this, this.handleCharacterDecreaseHP);
      eventManager.subscribe(character, 'E_INCREASE_MP', this, this.handleCharacterIncreaseMP);
      eventManager.subscribe(character, 'E_DECREASE_MP', this, this.handleCharacterDecreaseMP);
      eventManager.subscribe(character, 'E_SEAL_ADD_FAILED', this, this.handleCharacterSealAddFailed);
      eventManager.subscribe(character, 'E_SEAL_ADDED', this, this.handleCharacterSealAdded);
      eventManager.subscribe(character, 'E_SEAL_REMOVE_FAILED', this, this.handleCharacterSealRemoveFailed);
      eventManager.subscribe(character, 'E_SEAL_REMOVED', this, this.handleCharacterSealRemoved);

      this.effectSprite = new Gfx3SpriteJAS();
      this.effectSprite.loadFromFile('samples/rpg/sprites/effects.jas');
      this.effectSprite.setTexture(await gfx3TextureManager.loadTexture('samples/rpg/sprites/effects.png'));

      this.mesh = new Gfx3MeshJAM();
      await this.mesh.loadFromFile(character.getJAMFile());
      this.mesh.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(character.getJAMTextureFile()) }));
      this.mesh.play('IDLE', true, true);

      this.character = character;
    }
    else {
      this.character = null;
    }
  }

  getCharacter() {
    return this.character;
  }

  getSize() {
    const meshAABB = this.mesh.getBoundingBox();
    const meshSize = meshAABB.getSize();
    return meshSize;
  }

  async handleEffectInflict(data) {
    this.effectVisible = true;
    this.effectSprite.play(data.effect.getSpriteAnimationName());
    this.effectSprite.setOffsetNormalized(0.5, 0.5);
    await eventManager.wait(this.effectSprite, 'E_FINISHED');
    this.effectVisible = false;
  }

  async handleCharacterIncreaseHP(data) {
    await this.DRAW_TOAST(data.amount, '#5ef500', 300);
  }

  async handleCharacterDecreaseHP(data) {
    await this.DRAW_TOAST(data.amount, '#f50000', 1000);
  }

  async handleCharacterIncreaseMP(data) {
    await this.DRAW_TOAST('MP + ' + data.amount, '#fff', 300);
  }

  async handleCharacterDecreaseMP(data) {
    await this.DRAW_TOAST('MP - ' + data.amount, '#fff', 300);
  }

  async handleCharacterSealAddFailed(data) {
    await this.DRAW_TOAST('Seal add failed !', '#fff', 300);
  }

  async handleCharacterSealAdded(data) {
    await this.DRAW_TOAST('Seal added !', '#fff', 300);
  }

  async handleCharacterSealRemoveFailed(data) {
    await this.DRAW_TOAST('Seal remove failed !', '#fff', 300);
  }

  async handleCharacterSealRemoved(data) {
    await this.DRAW_TOAST('Seal removed !', '#fff', 300);
  }

  DRAW_TOAST(text, color, ms) {
    return new Promise(resolve => {
      const toast = document.createElement('div');
      toast.className = 'BattleAreaFighter-toast';
      toast.textContent = text;
      toast.style.color = color;

      const pos = this.mesh.getPosition();
      const currentView = gfx3Manager.getCurrentView();
      const screenPos = currentView.getClientScreenPosition(pos[0], pos[1] + 0.8, pos[2]);

      toast.style.top = screenPos[1] + 'px';
      toast.style.left = screenPos[0] + 'px';
      uiManager.addNode(toast);

      setTimeout(() => { toast.remove(); resolve(); }, ms);
    });
  }
}

export { BattleAreaFighter };