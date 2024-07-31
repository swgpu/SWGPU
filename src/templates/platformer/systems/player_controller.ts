import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { inputManager } from '@lib/input/input_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Collider } from '../components/collider';
import { Jump } from '../components/jump';
import { Platform } from '../components/platform';
import { Player } from '../components/player';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
import { Velocity } from '../components/velocity';
// ---------------------------------------------------------------------------------------

export class PlayerControllerSystem extends DNASystem {
  map: Gfx2TileMap;
  collisionLayerIndex: number;

  constructor(map: Gfx2TileMap, collisionLayerIndex: number) {
    super();
    this.addRequiredComponentTypename('Position');
    this.addRequiredComponentTypename('Player');
    this.addRequiredComponentTypename('Drawable');
    this.addRequiredComponentTypename('Velocity');
    this.map = map;
    this.collisionLayerIndex = collisionLayerIndex;

    inputManager.registerAction('keyboard', 'KeyA', 'LEFT');
    inputManager.registerAction('keyboard', 'KeyD', 'RIGHT');
    inputManager.registerAction('keyboard', 'KeyW', 'UP');
    inputManager.registerAction('keyboard', 'KeyS', 'DOWN');
    inputManager.registerAction('keyboard', 'Space', 'JUMP');
  }

  onEntityUpdate(ts: number, eid: number) {
    const pos = dnaManager.getComponent(eid, Position);
    const vel = dnaManager.getComponent(eid, Velocity);
    const drawable = dnaManager.getComponent(eid, Drawable<Gfx2SpriteJAS>);
    const collider = dnaManager.getComponent(eid, Collider);
    const player = dnaManager.getComponent(eid, Player);
    const jump = dnaManager.getComponent(eid, Jump);

    this.updateInput(ts, pos, collider, drawable, jump, vel, player);
    this.updateGravity(ts, jump, vel, player);
    
    this.updatePosition(ts, pos, collider, vel, jump);
    this.updatePlatforms(ts, pos, vel, collider, jump);
    this.updateCamera(ts, pos, jump);
  }

  updateInput(ts: number, pos: Position, collider: Collider, drawable: Drawable<Gfx2SpriteJAS>, jump: Jump, vel: Velocity, player: Player) {
    const bounds = collider.getBounds([pos.x, pos.y]);
    const collisions = this.map.box(0, 0.1, this.collisionLayerIndex, bounds.left, bounds.right, bounds.top, bounds.bottom);

    let accelerationX = 0;
    let accelerationY = 0;

    if (inputManager.isActiveAction('LEFT')) {
      accelerationX -= player.accel;
    }

    if (inputManager.isActiveAction('RIGHT')) {
      accelerationX += player.accel;
    }

    if (inputManager.isJustActiveAction('JUMP') && (jump.isGrounded || jump.platform !== -1)) {
      vel.y = player.jumpStrenght * -1;
      jump.jumping = true;
    }

    if (inputManager.isJustActiveAction('JUMP') && collisions.isAgainstWall && jump.jumping && !jump.isGrounded) {
      vel.y = player.wallJumpStrenght * -1;
      accelerationX = (collisions.isAgainstWall === 'right' ? -player.maxSpeed : player.maxSpeed) * 10;
      jump.wallJumping = true;
    }

    if (jump.jumping || jump.wallJumping) {
      drawable.sprite.play('jump', false);
    } 

    if (accelerationX !== 0 && !jump.jumping) {
      drawable.sprite.play('walk', true, true);
    }

    if (accelerationX === 0 && !jump.jumping && !player.shooting) {
      drawable.sprite.play('idle', true, true);
    }

    if (accelerationX === 0 && inputManager.isActiveAction('DOWN')) {
      drawable.sprite.play('crouch', true, true);
    }

    vel.x += accelerationX * (ts / 100);
    vel.x = UT.CLAMP(vel.x, -player.maxSpeed, player.maxSpeed);
    vel.y += accelerationY * (ts / 100);

    if (accelerationX === 0) {
      vel.x = UT.LERP(vel.x, 0, (ts / 100));
    }
  }

  updateGravity(ts: number, jump: Jump, vel: Velocity, player: Player) {
    const gravityFactor = jump.jumping && inputManager.isActiveAction('JUMP') ? 1 : 3;
    vel.y += player.gravity * gravityFactor * (ts / 100);
    
  }

  updatePosition(ts: number, pos: Position, collider: Collider, vel: Velocity, jump: Jump) {
    // clamp the velocity to a safety max value
    vel.y = Math.min(vel.y, 60);
    vel.x = Math.min(vel.x, 60);

    const bounds = collider.getBounds([pos.x, pos.y]);
    const mx = vel.x * (ts / 100);
    const my = vel.y * (ts / 100);
    const collisions = this.map.box(mx, my, this.collisionLayerIndex, bounds.left, bounds.right, bounds.top, bounds.bottom);

    if (collisions.isGrounded) {
      jump.jumping = false;
      jump.dropDown = -1;
      jump.wallJumping = false;
      jump.isGrounded = true;
    }
    else {
      jump.isGrounded = false;
    }

    if (collisions.top || collisions.bottom) {
      vel.y = 0;
    }

    if (collisions.left || collisions.right) {
      vel.x = 0;
    }

    pos.x += collisions.mx;
    pos.y += collisions.my;
  }

  updatePlatforms(ts: number, pos: Position, vel: Velocity, collider: Collider, jump: Jump) {
    if (vel.y < 0 && jump.platform == -1) {
      return;
    }

    const bounds = collider.getBounds([pos.x, pos.y]);
    const platformId = this.collideWithPlatform(pos.y, bounds);

    if (platformId !== -1) {
      if (inputManager.isActiveAction('DOWN')) {
        jump.dropDown = platformId;
      }
      if (platformId !== jump.dropDown) {
        const platformPos = dnaManager.getComponent(platformId, Position);
        const platformVel = dnaManager.getComponent(platformId, Velocity);
        const platformCollider = dnaManager.getComponent(platformId, Collider);        
        const platformBounds = platformCollider.getBounds([platformPos.x, platformPos.y]);
        pos.y = platformBounds.top - collider.min[1];
        pos.x += platformVel.x;
        jump.platform = platformId;
        jump.jumping = false;
      }
    }
    else {
      jump.platform = -1;
    }
  }

  updateCamera(ts: number, pos: Position, jump: Jump) {
    if (!jump.wallJumping) {
      const x = UT.LERP(gfx2Manager.getCameraPositionX(), pos.x, ts / 100);
      gfx2Manager.setCameraPosition(x, 250);
    }
  }

  collideWithPlatform(y: number, bounds: ReturnType<Collider['getBounds']>): number {
    const platforms = dnaManager.getAllComponents(Platform);

    for (const eid of platforms.keys()) {
      const platformPos = dnaManager.getComponent(eid, Position);
      const platformCollider = dnaManager.getComponent(eid, Collider);
      const platformBounds = platformCollider.getBounds([platformPos.x, platformPos.y]);
      const isWithinX = [bounds.left, bounds.right].some(b => platformBounds.left < b && b < platformBounds.right);
      const isWithinY = platformBounds.top < bounds.bottom && bounds.bottom < platformBounds.bottom;
      if (isWithinX && isWithinY) {
        return eid;
      }
    }

    return -1;
  }
}