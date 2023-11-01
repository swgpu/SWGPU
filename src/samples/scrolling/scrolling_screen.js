import { eventManager } from '../../lib/core/event_manager';
import { dnaManager } from '../../lib/dna/dna_manager';
import { inputManager } from '../../lib/input/input_manager';
import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { DNASystem } from '../../lib/dna/dna_system';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { BackgroundComponent } from './components/background';
import { BodyComponent } from './components/body';
import { CameraComponent } from './components/camera';
import { CMBControlsComponent } from './components/cmb_controls';
import { CMBComponent } from './components/cmb';
import { ComboComponent } from './components/combo';
import { GravityComponent } from './components/gravity';
import { HitComponent } from './components/hit';
import { FallofComponent } from './components/fallof';
import { FighterComponent } from './components/fighter';
import { FloorComponent } from './components/floor';
import { IdleControlsComponent } from './components/idle_controls';
import { IdleComponent } from './components/idle';
import { JumpControlsComponent } from './components/jump_controls';
import { JumpComponent } from './components/jump';
import { MoveComponent } from './components/move';
import { PlatformComponent } from './components/platform';
import { PositionComponent } from './components/position';
import { RunControlsComponent } from './components/run_controls';
import { RunComponent } from './components/run';
import { SpriteComponent } from './components/sprite';
import { DamageComponent } from './components/damage';
// ---------------------------------------------------------------------------------------

const FPS = 60;
const MS_PER_FRAME = 1000 / FPS;
const SCREEN_W = 600;
const SCREEN_H = 600;
const HALF_SCREEN_W = SCREEN_W / 2;
const HALF_SCREEN_H = SCREEN_H / 2;

class BackgroundSystem extends DNASystem {
  constructor() {
    super();
    this.context = gfx2Manager.getContext();
    super.addRequiredComponentTypename('Background');
  }

  onEntityDraw(entity) {
    const bg = dnaManager.getComponent(entity, 'Background');
    this.context.drawImage(bg.texture, 0, 0);
  }
}

class CameraSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Camera');
  }

  onEntityUpdate(ts, entity) {
    const background = dnaManager.findEntity('Background');
    const backgroundCmp = dnaManager.getComponent(background, 'Background');

    const fighters = dnaManager.findEntities('Fighter');
    let minX = Infinity, minY = Infinity;
    let maxX = 0, maxY = 0;

    for (let fighter of fighters) {
      const position = dnaManager.getComponent(fighter, 'Position');
      if (minX > position.x) minX = position.x;
      if (maxX < position.x) maxX = position.x;
      if (minY > position.y) minY = position.y;
      if (maxY < position.y) maxY = position.y;
    }

    let deltaX = (maxX - minX) + (88 * 2); // 88 * 2 is body margin
    let deltaY = (maxY - minY) + (88 * 2); // 88 * 2 is body margin

    const ratioDeltaWidth = UT.CLAMP(SCREEN_W / deltaX, 1, 1.3);
    const ratioDeltaHeight = UT.CLAMP(SCREEN_H / deltaY, 1, 1.3);
    const ratio = Math.min(ratioDeltaWidth, ratioDeltaHeight);

    let centerX = minX + ((maxX - minX) / 2);
    let centerY = minY + ((maxY - minY) / 2);

    if (centerX < (HALF_SCREEN_W / ratio)) {
      centerX = HALF_SCREEN_W / ratio;
    }
    else if (centerX > backgroundCmp.texture.width - (HALF_SCREEN_W / ratio)) {
      centerX = backgroundCmp.texture.width - (HALF_SCREEN_W / ratio);
    }

    if (centerY < HALF_SCREEN_H / ratio) {
      centerY = HALF_SCREEN_H / ratio;
    }
    else if (centerY > backgroundCmp.texture.height - (HALF_SCREEN_H / ratio)) {
      centerY = backgroundCmp.texture.height - (HALF_SCREEN_H / ratio);
    }

    gfx2Manager.setCameraScale(ratio, ratio);
    gfx2Manager.setCameraPosition(centerX, centerY);
  }
}

class SpriteSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Sprite');
  }

  onEntityUpdate(ts, entity) {
    const position = dnaManager.getComponent(entity, 'Position');
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    sprite.jas.setPosition(position.x, position.y);
    sprite.jas.update(ts);
  }

  onEntityDraw(entity) {
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    if (!sprite.visible) {
      return;
    }

    sprite.jas.draw();
  }
}

class MoveSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Position');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const position = dnaManager.getComponent(entity, 'Position');
    position.x += move.velocityX;
    position.y += move.velocityY;
  }
}

class IdleControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('IdleControls');
    super.addRequiredComponentTypename('Idle');
  }

  onEntityUpdate(ts, entity) {
    if (inputManager.isActiveAction('LEFT') || inputManager.isActiveAction('RIGHT')) {
      dnaManager.removeComponent(entity, 'IdleControls');
      dnaManager.removeComponent(entity, 'Idle');
      dnaManager.addComponent(entity, new RunControlsComponent());
      dnaManager.addComponent(entity, new RunComponent(6, 0));
    }
  }

  onActionOnce(actionId, entity) {
    if (actionId == 'UP') {
      dnaManager.removeComponent(entity, 'IdleControls');
      dnaManager.removeComponent(entity, 'Idle');
      dnaManager.addComponent(entity, new JumpControlsComponent());
      dnaManager.addComponent(entity, new JumpComponent(-20, 10));
    }
  }
}

class IdleSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Idle');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    move.velocityX = 0;
    sprite.jas.play('IDLE', true, true);
  }
}

class RunControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('RunControls');
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Move');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    let action = false;
    let direction = 0;

    if (inputManager.isActiveAction('LEFT')) {
      action = true;
      direction += -1;
      move.direction = direction;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      action = true;
      direction += +1;
      move.direction = direction;
    }

    if (inputManager.isActiveAction('UP')) {
      action = true;
      dnaManager.removeComponent(entity, 'RunControls');
      dnaManager.removeComponent(entity, 'Run');
      dnaManager.addComponent(entity, new JumpComponent(-20, 10));
      dnaManager.addComponent(entity, new JumpControlsComponent());
    }

    if (!action) {
      dnaManager.removeComponent(entity, 'RunControls');
      dnaManager.removeComponent(entity, 'Run');
      dnaManager.addComponent(entity, new IdleControlsComponent());
      dnaManager.addComponent(entity, new IdleComponent());
    }
  }
}

class RunSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Run');
    super.addRequiredComponentTypename('Sprite');
    super.addRequiredComponentTypename('Move');
  }

  onEntityBind(entity) {
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    sprite.jas.play('RUN', true, true);
  }

  onEntityUpdate(ts, entity) {
    const run = dnaManager.getComponent(entity, 'Run');
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    const move = dnaManager.getComponent(entity, 'Move');
    let velocity = 0;

    if (move.direction == -1) {
      velocity += run.speed * move.direction;
      move.velocityX = velocity;
      sprite.jas.setFlipX(true);
    }
    else if (move.direction == +1) {
      velocity += run.speed * move.direction;
      move.velocityX = velocity;
      sprite.jas.setFlipX(false);
    }
  }
}

class JumpControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Jump');
    super.addRequiredComponentTypename('JumpControls');
  }

  onActionOnce(actionId, entity) {
    const jump = dnaManager.getComponent(entity, 'Jump');
    const move = dnaManager.getComponent(entity, 'Move');

    if (actionId == 'UP' && Date.now() - jump.createdAt > jump.doubleJumpGapTime && jump.numJump <= 1) {
      move.velocityY = 0;
      dnaManager.removeComponent(entity, 'Jump');
      dnaManager.addComponent(entity, new JumpComponent(-13, 3, 2));
    }
  }
}

class JumpSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Jump');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Sprite');
  }

  onEntityBind(entity) {
    const jump = dnaManager.getComponent(entity, 'Jump');
    const move = dnaManager.getComponent(entity, 'Move');
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    move.velocityY += jump.accelerationY;
    sprite.jas.play('JUMP', false, true);
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    if (move.velocityY > 0) {
      dnaManager.removeComponent(entity, 'JumpControls');
      dnaManager.removeComponent(entity, 'Jump');
      dnaManager.addComponent(entity, new FallofComponent());
    }
  }
}

class FallofSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Fallof');
  }

  onEntityBind(entity) {
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    sprite.jas.play('FALLOF', false, true);
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    if (move.velocityY == 0) {
      dnaManager.removeComponent(entity, 'Fallof');
      dnaManager.addComponent(entity, new IdleControlsComponent());
      dnaManager.addComponent(entity, new IdleComponent());
    }
  }
}

class BackgroundCollision extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Body');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Position');
  }

  onEntityUpdate(ts, entity) {
    const background = dnaManager.findEntity('Background');
    const backgroundCmp = dnaManager.getComponent(background, 'Background');

    const position = dnaManager.getComponent(entity, 'Position');
    const move = dnaManager.getComponent(entity, 'Move');
    const body = dnaManager.getComponent(entity, 'Body');
    const nextPositionX = position.x + move.velocityX;

    if (nextPositionX - (body.w / 2) < 0) {
      move.velocityX = 0;
    }
    else if (nextPositionX + (body.w / 2) > backgroundCmp.texture.width) {
      move.velocityX = 0;
    }
  }
}

class BodyDebugSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Body');
    super.addRequiredComponentTypename('Position');
  }

  onEntityDraw(entity) {

    const body = dnaManager.getComponent(entity, 'Body');
    const position = dnaManager.getComponent(entity, 'Position');
    const ctx = gfx2Manager.getContext();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#000';
    ctx.fillRect(position.x - (body.w / 2), position.y - (body.h / 2), body.w, body.h);
    ctx.globalAlpha = 1.0;
  }
}

class CMBControlsSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CMBControls');
    super.addRequiredComponentTypename('CMB');
  }

  onActionOnce(actionId, entity) {
    const cmb = dnaManager.getComponent(entity, 'CMB');
    cmb.currentAction += actionId;
    cmb.currentActionAge = 0;
  }
}

class CMBSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CMB');
  }

  onEntityUpdate(ts, entity) {
    const cmb = dnaManager.getComponent(entity, 'CMB');
    if (dnaManager.hasComponent(entity, 'Combo')) {
      return;
    }

    if (cmb.currentActionAge > 1000) {
      cmb.currentActionAge = 0;
      cmb.currentAction = '';
    }

    for (let combo of cmb.comboComponents) {
      const found = cmb.currentAction.indexOf(combo.actions);
      if (found == -1) {
        continue;
      }

      const match = cmb.currentAction.endsWith(combo.actions);
      if (match && dnaManager.hasComponent(entity, combo.requiredComponent)) {
        dnaManager.removeComponentIfExist(entity, 'IdleControls');
        dnaManager.removeComponentIfExist(entity, 'Idle');
        dnaManager.removeComponentIfExist(entity, 'RunControls');
        dnaManager.removeComponentIfExist(entity, 'Run');

        const move = dnaManager.getComponent(entity, 'Move');
        move.velocityX = 0;
        cmb.currentActionAge = 0;
        cmb.currentAction = '';
        dnaManager.addComponent(entity, combo);
      }
    }

    cmb.currentActionAge += ts;
  }
}

class ComboSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('CMB');
    super.addRequiredComponentTypename('Combo');
    super.addRequiredComponentTypename('Sprite');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Move');
  }

  async onEntityBind(entity) {
    const combo = dnaManager.getComponent(entity, 'Combo');
    const sprite = dnaManager.getComponent(entity, 'Sprite');

    sprite.jas.play(combo.animationName, false, true);
    await eventManager.wait(sprite.jas, 'E_FINISHED');

    dnaManager.removeComponent(entity, 'Combo');
    dnaManager.addComponent(entity, new IdleControlsComponent());
    dnaManager.addComponent(entity, new IdleComponent());
  }

  onEntityUpdate(ts, entity) {
    const cmb = dnaManager.getComponent(entity, 'CMB');
    const combo = dnaManager.getComponent(entity, 'Combo');
    const sprite = dnaManager.getComponent(entity, 'Sprite');
    const position = dnaManager.getComponent(entity, 'Position');
    const move = dnaManager.getComponent(entity, 'Move');

    if (sprite.jas.getCurrentAnimationFrameIndex() == sprite.lastAnimationFrameIndex) {
      return;
    }

    sprite.lastAnimationFrameIndex = sprite.jas.getCurrentAnimationFrameIndex();

    const hits = combo.hits.filter(h => h.frameIndex == sprite.jas.getCurrentAnimationFrameIndex());
    if (hits.length == 0) {
      return;
    }

    for (const hit of hits) {
      const jas = new Gfx2SpriteJAS();
      jas.setAnimations(cmb.animations);
      jas.setTexture(cmb.texture);
  
      CREATE_HIT(position.x, position.y, jas, Object.assign(hit, {
        owner: entity,
        direction: move.direction
      }));
    }
  }
}

class HitSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Hit');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Sprite');
  }

  onEntityBind(entity) {
    const hit = dnaManager.getComponent(entity, 'Hit');
    const position = dnaManager.getComponent(entity, 'Position');
    position.x += hit.relativeX * hit.direction;
    position.y += hit.relativeY;

    if (hit.spriteAnimationOnLaunch) {
      const sprite = dnaManager.getComponent(entity, 'Sprite');
      sprite.visible = true;
      sprite.jas.setOffset(hit.spriteOffsetX, hit.spriteOffsetY);
      sprite.jas.play(hit.spriteAnimationOnLaunch, false, false);
    }
  }

  async onEntityUpdate(ts, entity) {
    const hit = dnaManager.getComponent(entity, 'Hit');
    if (hit.marked) {
      return;
    }

    const position = dnaManager.getComponent(entity, 'Position');
    const sprite = dnaManager.getComponent(entity, 'Sprite');

    if (hit.isCollide) {
      const fighters = dnaManager.findEntities('Fighter');
      const enemies = fighters.filter(f => f != hit.owner);
  
      for (let enemy of enemies) {
        const enemyBody = dnaManager.getComponent(enemy, 'Body');
        const enemyPosition = dnaManager.getComponent(enemy, 'Position');
        const min1 = [position.x - (hit.w / 2), position.y - (hit.h / 2)];
        const max1 = [position.x + (hit.w / 2), position.y + (hit.h / 2)];
        const min2 = [enemyPosition.x - (enemyBody.w / 2), enemyPosition.y - (enemyBody.h / 2)];
        const max2 = [enemyPosition.x + (enemyBody.w / 2), enemyPosition.y + (enemyBody.h / 2)];
  
        if (UT.COLLIDE_RECT_TO_RECT(min1, max1, min2, max2)) {
          hit.marked = true;
          dnaManager.removeComponentIfExist(enemy, 'Damage');
          dnaManager.removeComponentIfExist(enemy, 'RunControls');
          dnaManager.removeComponentIfExist(enemy, 'Run');
          dnaManager.removeComponentIfExist(enemy, 'IdleControls');
          dnaManager.removeComponentIfExist(enemy, 'Idle');
          dnaManager.removeComponentIfExist(enemy, 'JumpControls');
          dnaManager.removeComponentIfExist(enemy, 'Jump');
          dnaManager.addComponent(enemy, new DamageComponent(
            [hit.velocityImpact[0] * hit.direction, hit.velocityImpact[1]],
            hit.damageHP,
            hit.damageMaxAge,
            hit.damageSpriteAnimation,
            hit.damageSpriteOffset
          ));

          if (hit.spriteAnimationOnImpact) {
            sprite.visible = true;
            sprite.jas.setOffset(hit.spriteOffsetX, hit.spriteOffsetY);
            sprite.jas.play(hit.spriteAnimationOnImpact, false, false);
            await eventManager.wait(sprite.jas, 'E_FINISHED');
            sprite.visible = false;
          }
  
          dnaManager.removeEntity(entity);
          return;
        }
      }
    }

    if (hit.age > hit.maxAge) {
      dnaManager.removeEntity(entity);
      return;
    }

    if (hit.velocityTween) {
      const v = hit.velocityTween.interpolate(hit.age);
      position.x += v[0] * hit.direction;
      position.y += v[1];
    }

    hit.age += ts / 1000;
  }
}

class HitDebugSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Hit');
    super.addRequiredComponentTypename('Position');
  }

  onEntityDraw(entity) {
    const hit = dnaManager.getComponent(entity, 'Hit');
    const position = dnaManager.getComponent(entity, 'Position');
    const ctx = gfx2Manager.getContext();
    ctx.fillStyle = 'red';
    ctx.fillRect(position.x - (hit.w / 2), position.y - (hit.h / 2), hit.w, hit.h);
  }
}

class DamageSystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Damage');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Sprite');
    this.frictionX = 0.5;
  }

  onEntityBind(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');
    const move = dnaManager.getComponent(entity, 'Move');

    if (dmg.velocityImpact) {
      move.velocityX = dmg.velocityImpact[0];
      move.velocityY = dmg.velocityImpact[1];
    }

    fighter.health -= dmg.damageHP;
  }

  async onEntityUpdate(ts, entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const move = dnaManager.getComponent(entity, 'Move');
    const sprite = dnaManager.getComponent(entity, 'Sprite');

    if (dmg.age > dmg.maxAge) {
      dnaManager.removeComponent(entity, 'Damage');

      if (!dmg.airDropped) {
        dnaManager.addComponent(entity, new IdleComponent());
      }
      
      return;
    }

    if (move.velocityY < 0) {
      dmg.airDropped = true;
      sprite.jas.play('PAIN_UP', false, true);
    }
    else if (move.velocityY > 0) {
      dmg.airDropped = true;
      sprite.jas.play('PAIN_DOWN', false, true);
    }

    if (move.velocityY == 0 && dmg.airDropped) {
      sprite.jas.play('PAIN_GROUND', false, true);
    }
    else if (move.velocityY == 0) {
      sprite.jas.play('PAIN', false, false);
    }

    if (move.velocityX > 0) {
      move.velocityX = Math.max(move.velocityX - this.frictionX, 0);
    }

    if (move.velocityX < 0) {
      move.velocityX = Math.min(move.velocityX + this.frictionX, 0);
    }

    dmg.age += ts / 1000.0;
  }
}

class DamageDisplaySystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('Damage');
    super.addRequiredComponentTypename('Fighter');
    super.addRequiredComponentTypename('Position');
  }

  onEntityBind(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');
    if (dmg.spriteAnimation) {
      fighter.dmgSprite.setOffset(dmg.spriteOffset[0], dmg.spriteOffset[1]);
      fighter.dmgSprite.play(dmg.spriteAnimation, true, true);
    }
  }

  onEntityDraw(entity) {
    const dmg = dnaManager.getComponent(entity, 'Damage');
    const fighter = dnaManager.getComponent(entity, 'Fighter');
    const position = dnaManager.getComponent(entity, 'Position');

    if (dmg.spriteAnimation) {
      fighter.dmgSprite.setPosition(position.x, position.y);
      fighter.dmgSprite.draw();
    }
  }
}

class GravitySystem extends DNASystem {
  // @todo: need to be refactor in PlatformSystem, GravitySystem and FloorSystem.
  constructor() {
    super();
    super.addRequiredComponentTypename('Gravity');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Body');
  }

  onEntityUpdate(ts, entity) {
    const move = dnaManager.getComponent(entity, 'Move');
    const position = dnaManager.getComponent(entity, 'Position');
    const body = dnaManager.getComponent(entity, 'Body');
    const gravity = dnaManager.getComponent(entity, 'Gravity');

    const footLocalPos = body.h * 0.5;
    const footPos = position.y + footLocalPos;
    const floorEntity = dnaManager.findEntity('Floor');
    const floor = dnaManager.getComponent(floorEntity, 'Floor');

    if (move.velocityY > 0) {
      if (footPos > floor.elevation) {
        position.y = floor.elevation - footLocalPos;
        move.velocityY = 0;
        gravity.onFloor = true;
        return;
      }

      for (let entity of dnaManager.findEntities('Platform')) {
        const platform = dnaManager.getComponent(entity, 'Platform');
        const platformPos = dnaManager.getComponent(entity, 'Position');
        const delta = Math.abs(footPos - platform.elevation);
        const minX = platformPos.x - (platform.w / 2);
        const maxX = platformPos.x + (platform.w / 2);

        if (footPos > platform.elevation && delta <= move.velocityY && position.x >= minX && position.x <= maxX) {
          position.y = platform.elevation - footLocalPos;
          move.velocityY = 0;
          gravity.onFloor = true;
          return;
        }
      }
    }

    if (footPos < floor.elevation) {
      move.velocityY += gravity.gravityFactor;
      gravity.onFloor = false;
      return;
    }
  }
}

class ScrollingScreen extends Screen {
  constructor() {
    super();
    this.elapsedTime = 0;
  }

  async onEnter() {
    dnaManager.setup([
      new CameraSystem(),
      new IdleControlsSystem(),
      new IdleSystem(),
      new RunControlsSystem(),
      new RunSystem(),
      new JumpControlsSystem(),
      new JumpSystem(),
      new FallofSystem(),
      new CMBControlsSystem(),
      new CMBSystem(),
      new ComboSystem(),
      // - Physics
      new BackgroundCollision(),
      new MoveSystem(),
      new GravitySystem(),
      new HitSystem(),
      new DamageSystem(),
      // - Graphics
      new BackgroundSystem(),
      new SpriteSystem(),
      // - Debugs
      new BodyDebugSystem(),
      new HitDebugSystem(),
      new DamageDisplaySystem()
    ]);

    await CREATE_SCENE();
    await CREATE_PLATFORMS();
    await CREATE_FLOOR();
    await CREATE_PLAYER1();
    await CREATE_PLAYER2();
  }

  update(ts) {
    if (this.elapsedTime > MS_PER_FRAME) {
      dnaManager.update(this.elapsedTime);
      this.elapsedTime = 0;
    }

    this.elapsedTime += ts;
  }

  draw() {
    dnaManager.draw();
  }
}

export { ScrollingScreen };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

async function CREATE_SCENE() {
  const background = dnaManager.createEntity();
  dnaManager.addComponent(background, new BackgroundComponent(await gfx2TextureManager.loadTexture('./samples/scrolling/bg.png')));

  const camera = dnaManager.createEntity();
  dnaManager.addComponent(camera, new CameraComponent());
}

async function CREATE_PLATFORMS() {
  const jas = new Gfx2SpriteJAS();
  await jas.loadFromFile('./samples/scrolling/floating-rock.jas');
  jas.setTexture(await gfx2TextureManager.loadTexture('./samples/scrolling/floating-rock.png'));
  jas.setOffset(+52, +18);
  jas.play('DEFAULT', false, true);

  const platform1 = dnaManager.createEntity();
  dnaManager.addComponent(platform1, new PositionComponent(220, 400));
  dnaManager.addComponent(platform1, new PlatformComponent(395, 104, 37));
  dnaManager.addComponent(platform1, new SpriteComponent(jas));
}

async function CREATE_FLOOR() {
  const floor = dnaManager.createEntity();
  dnaManager.addComponent(floor, new FloorComponent(540));
}

async function CREATE_HIT(positionX, positionY, jas, hitOptions) {
  const entity = dnaManager.createEntity();
  dnaManager.addComponent(entity, new PositionComponent(positionX, positionY));
  dnaManager.addComponent(entity, new SpriteComponent(jas));
  dnaManager.addComponent(entity, new HitComponent(hitOptions));
}

async function CREATE_PLAYER1() {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile('./samples/scrolling/naruto.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture('./samples/scrolling/naruto.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile('./samples/scrolling/naruto.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture('./samples/scrolling/naruto.png'));
  damageJAS.setOffset(+44, +44);

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(100, damageJAS));
  dnaManager.addComponent(player, new PositionComponent(190, 490));
  dnaManager.addComponent(player, new SpriteComponent(playerJAS));
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new IdleControlsComponent());
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new BodyComponent(88, 88));
  dnaManager.addComponent(player, new GravityComponent(2));
  dnaManager.addComponent(player, new CMBComponent(playerJAS.animations, playerJAS.texture, [CREATE_COMBO1()]));
  dnaManager.addComponent(player, new CMBControlsComponent());
  return player;
}

async function CREATE_PLAYER2() {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile('./samples/scrolling/naruto.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture('./samples/scrolling/naruto.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile('./samples/scrolling/naruto.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture('./samples/scrolling/naruto.png'));
  damageJAS.setOffset(+44, +44);

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(100, damageJAS));
  dnaManager.addComponent(player, new PositionComponent(490, 490));
  dnaManager.addComponent(player, new SpriteComponent(playerJAS));
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new BodyComponent(88, 88));
  dnaManager.addComponent(player, new GravityComponent(2));
  return player;
}

function CREATE_COMBO1() {
  return new ComboComponent('Run', 'OKOK', 'PUNCH1', [{
    spriteAnimationOnImpact: 'HIT',
    frameIndex: 0,
    w: 10,
    h: 10,
    damageHP: 10,
    damageMaxAge: 1,
    damageSpriteAnimation: 'HIT',
    damageSpriteOffset: [21, 29],
    maxAge: 0.2,
    relativeX: 44,
    relativeY: 0,
    velocityImpact: [10, -10]
  }]);
}