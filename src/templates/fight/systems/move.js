import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from './position';
import { VelocityComponent } from './velocity';
import { PlatformComponent } from './platform';
import { DrawableComponent } from './drawable';
import { ColliderComponent } from './collider';
// ---------------------------------------------------------------------------------------

const GRAVITY = 160;

export class MoveComponent extends DNAComponent {
  constructor() {
    super('Move');
    this.onFloor = true;
  }
}

export class MoveSystem extends DNASystem {
  constructor(bgWidth, bgHeight, floorElevation = 540) {
    super();
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Velocity');
    super.addRequiredComponentTypename('Fighter');
    super.addRequiredComponentTypename('Drawable');
    super.addRequiredComponentTypename('Collider');
    this.bgWidth = bgWidth;
    this.bgHeight = bgHeight;
    this.floorElevation = floorElevation;
  }

  onEntityUpdate(ts, eid) {
    const move = dnaManager.getComponent(eid, MoveComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);
    const collider = dnaManager.getComponent(eid, ColliderComponent);
    const halfWidth = collider.width * 0.5;
    const halfHeight = collider.height * 0.5;
    
    // update gravity, update position, reset onFloor
    velocity.y = UT.LERP(velocity.y, GRAVITY, ts / 1000);
    position.x += velocity.x * (ts / 100);
    position.y += velocity.y * (ts / 100);
    move.onFloor = false;

    const bounds = collider.getBounds(position.x, position.y);

    for (const platformId of dnaManager.findEntities(PlatformComponent)) {
      const platformPos = dnaManager.getComponent(platformId, PositionComponent);
      const platformCollider = dnaManager.getComponent(platformId, ColliderComponent);
      const platformBounds = platformCollider.getBounds(platformPos.x, platformPos.y);

      const isAbove = position.y < platformBounds.top;
      const isWithinX = position.x >= platformBounds.left && position.x <= platformBounds.right;
      const isWithinY = platformBounds.top < bounds.bottom && bounds.bottom < platformBounds.bottom;

      if (velocity.y > 0 && isAbove && isWithinX && isWithinY) {
        position.y = platformBounds.top - halfHeight;
        velocity.y = 0;
        move.onFloor = true;
        break;
      }
    }

    if (velocity.y >= 0 && bounds.bottom >= this.floorElevation) {
      position.y = this.floorElevation - halfHeight;
      velocity.y = 0;
      move.onFloor = true;
    }

    if (velocity.y > 0) {
      drawable.jas.play('FALLOF', false, true);
    }

    if (bounds.left < 0) {
      position.x = halfWidth;
    }
    else if (bounds.right > this.bgWidth) {
      position.x = this.bgWidth - halfWidth;
    }
  }
}