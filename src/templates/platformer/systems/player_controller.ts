import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { inputManager } from '@lib/input/input_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap, TileCollision } from '@lib/gfx2_tile/gfx2_tile_map';
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
    const position = dnaManager.getComponent(eid, Position);
    const drawable = dnaManager.getComponent(eid, Drawable<Gfx2SpriteJAS>);
    const velocity = dnaManager.getComponent(eid, Velocity);
    const collider = dnaManager.getComponent(eid, Collider);
    const player = dnaManager.getComponent(eid, Player);
    const jump = dnaManager.getComponent(eid, Jump);

    const bounds = collider.getBounds(position);
    const collisions = this.map.getCollisions(this.collisionLayerIndex, bounds.left, bounds.right, bounds.top, bounds.bottom);

    this.updateInput(ts, collisions, drawable, jump, velocity, player);
    this.updateGravity(ts, jump, velocity);
    this.updatePosition(position, velocity, jump);

    const nextBounds = collider.getBounds(position);
    const nextCollisions = this.map.getCollisions(this.collisionLayerIndex, nextBounds.left, nextBounds.right, nextBounds.top, nextBounds.bottom);

    this.updateCollision(nextCollisions, position, collider, velocity, jump);
    this.updateCamera(ts, position, jump);
  }

  updateInput(ts: number, collisions: TileCollision, drawable: Drawable<Gfx2SpriteJAS>, jump: Jump, velocity: Velocity, player: Player) {
    let inputForce = 0;

    if (inputManager.isActiveAction('DOWN')) {
      drawable.sprite.play('crouch', true, true);
    }
    else {
      if (inputManager.isActiveAction('LEFT')) {
        inputForce -= player.accel;
        if (!jump.jumping) drawable.sprite.play('walk', true, true);
      }
      if (inputManager.isActiveAction('RIGHT')) {
        inputForce += player.accel;
        if (!jump.jumping) drawable.sprite.play('walk', true, true);
      }
      if (inputForce === 0 && !jump.jumping && !player.shooting) {
        drawable.sprite.play('idle', true, true);
      }
    }

    velocity.x = UT.CLAMP(velocity.x + (inputForce * ts), -player.maxSpeed * ts, player.maxSpeed * ts);
    velocity.x = UT.LERP(velocity.x, 0, ts / 100);

    if (inputManager.isJustActiveAction('JUMP') && (collisions.isGrounded || jump.platform !== -1)) {
      velocity.y -= player.jumpStrenght * (ts / 100);
      drawable.sprite.play('jump', false);
      jump.jumping = true;
      collisions.bottom = null;
    }

    if (inputManager.isJustActiveAction('JUMP') && collisions.isAgainstWall && jump.jumping && !collisions.isGrounded) {
      drawable.sprite.play('jump', false);
      jump.wallJumping = true;
      velocity.y = -player.wallJumpStrenght * ts;
      velocity.x += (collisions.isAgainstWall === 'right' ? -player.maxSpeed : player.maxSpeed) * ts;
      collisions[collisions.isAgainstWall] = null;
    }
  }

  updateGravity(ts: number, jump: Jump, velocity: Velocity) {
    const gravMultiplier = jump.jumping && inputManager.isActiveAction('JUMP') ? 1 : 3;
    velocity.y = UT.LERP(velocity.y, 5 * gravMultiplier, ts / 1000);
  }

  updatePosition(position: Position, velocity: Velocity, jump: Jump) {
    position.x += velocity.x;
    position.y += velocity.y;

    if (jump.platform !== -1) {
      const platformVelocity = dnaManager.getComponent(jump.platform, Velocity);
      position.x += platformVelocity.x;
      position.y += platformVelocity.y;
    }
  }

  updateCollision(collisions: TileCollision, position: Position, collider: Collider, velocity: Velocity, jump: Jump) {
    if (velocity.y >= 0) {
      const bounds = collider.getBounds(position);
      const platformId = this.collideWithPlatform(position, bounds);

      if (platformId !== -1) {
        if (inputManager.isActiveAction('DOWN')) {
          jump.dropDown = platformId;
        }
        if (platformId !== jump.dropDown) {
          const platformCollider = dnaManager.getComponent(platformId, Collider);
          const platformPosition = dnaManager.getComponent(platformId, Position);
          const platformBounds = platformCollider.getBounds(platformPosition);
          position.y = platformBounds.top - collider.min[1];
          jump.platform = platformId;
          collisions.isGrounded = true;
          jump.jumping = false;
        }
      }
    }

    if (collisions.isGrounded) {
      velocity.y = 0;
      jump.jumping = false;
      jump.dropDown = -1;
      jump.wallJumping = false;
    } else {
      jump.platform = -1;
    }

    if (collisions.left) {
      position.x = collisions.left + collider.min[0];
      velocity.x = 0;
    }
    if (collisions.right) {
      position.x = collisions.right - collider.min[0];
      velocity.x = 0;
    }
    if (collisions.bottom) {
      position.y = collisions.bottom - collider.min[1];
      velocity.y = 0;
    }
    if (collisions.top) {
      position.y = collisions.top + collider.max[1];
      velocity.y = 0;
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