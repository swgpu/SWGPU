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

const GRAVITY_ACCEL = 3;

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
    const position = dnaManager.getComponent(eid, Position);
    const drawable = dnaManager.getComponent(eid, Drawable<Gfx2SpriteJAS>);
    const velocity = dnaManager.getComponent(eid, Velocity);
    const collider = dnaManager.getComponent(eid, Collider);
    const player = dnaManager.getComponent(eid, Player);
    const jump = dnaManager.getComponent(eid, Jump);

    this.updateInput(ts, position, collider, drawable, jump, velocity, player);
    this.updateGravity(ts, jump, velocity);
    this.updatePosition(ts, position, collider, velocity, jump);
    this.updatePlatforms(ts, position, velocity, collider, jump);
    this.updateCamera(ts, position, jump);
  }

  updateInput(ts: number, position: Position, collider: Collider, drawable: Drawable<Gfx2SpriteJAS>, jump: Jump, velocity: Velocity, player: Player) {
    const bounds = collider.getBounds(position);
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
      velocity.y = player.jumpStrenght * -1;
      jump.jumping = true;
    }

    if (inputManager.isJustActiveAction('JUMP') && collisions.isAgainstWall && jump.jumping && !jump.isGrounded) {
      velocity.y = player.wallJumpStrenght * -1;
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

    velocity.x += accelerationX * (ts / 100);
    velocity.x = UT.CLAMP(velocity.x, -player.maxSpeed, player.maxSpeed);
    velocity.y += accelerationY * (ts / 100);

    if (accelerationX === 0) {
      velocity.x = UT.LERP(velocity.x, 0, (ts / 100));
    }
  }

  updateGravity(ts: number, jump: Jump, velocity: Velocity) {
    if (jump.platform == -1) {
      const gravityFactor = jump.jumping && inputManager.isActiveAction('JUMP') ? 1 : 3;
      velocity.y += GRAVITY_ACCEL * gravityFactor * (ts / 100);
    }
  }

  updatePosition(ts: number, position: Position, collider: Collider, velocity: Velocity, jump: Jump) {
    const bounds = collider.getBounds(position);
    const mx = velocity.x * (ts / 100);
    const my = velocity.y * (ts / 100);
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
      velocity.y = 0;
    }

    if (collisions.left || collisions.right) {
      velocity.x = 0;
    }

    position.x += collisions.mx;
    position.y += collisions.my;
  }

  updatePlatforms(ts: number, position: Position, velocity: Velocity, collider: Collider, jump: Jump) {
    jump.platform = -1;

    if (velocity.y < 0) {
      return;
    }
    
    const bounds = collider.getBounds(position);
    const platformId = this.collideWithPlatform(position, bounds);

    if (platformId !== -1) {
      if (inputManager.isActiveAction('DOWN')) {
        jump.dropDown = platformId;
      }
      if (platformId !== jump.dropDown) {
        const platformVelocity = dnaManager.getComponent(platformId, Velocity);
        const platformCollider = dnaManager.getComponent(platformId, Collider);
        const platformPosition = dnaManager.getComponent(platformId, Position);
        const platformBounds = platformCollider.getBounds(platformPosition);
        position.y = platformBounds.top - collider.min[1];
        velocity.x += platformVelocity.x * (ts / 100);
        jump.platform = platformId;
        jump.jumping = false;
      }
    }
  }

  updateCamera(ts: number, position: Position, jump: Jump) {
    if (!jump.wallJumping) {
      const newPositionX = UT.LERP(gfx2Manager.getCameraPositionX(), position.x, ts / 100);
      gfx2Manager.setCameraPosition(newPositionX, 70);
    }
  }

  collideWithPlatform(position: Position, bounds: ReturnType<Collider['getBounds']>): number {
    const platforms = dnaManager.getAllComponents(Platform);

    for (const eid of platforms.keys()) {
      const platformPosition = dnaManager.getComponent(eid, Position);
      const platformCollider = dnaManager.getComponent(eid, Collider);
      const platformBounds = platformCollider.getBounds(platformPosition);
      const isAbove = position.y < platformBounds.top;
      const isWithinX = [bounds.left, bounds.right].some(b => platformBounds.left < b && b < platformBounds.right);
      const isWithinY = platformBounds.top < bounds.bottom && bounds.bottom < platformBounds.bottom;
      if (isAbove && isWithinX && isWithinY) {
        return eid;
      }
    }

    return -1;
  }
}