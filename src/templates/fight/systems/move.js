import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from './position';
import { VelocityComponent } from './velocity';
import { FighterComponent } from './fighter';
import { PlatformComponent } from './platform';
import { DrawableComponent } from './drawable';
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
    this.bgWidth = bgWidth;
    this.bgHeight = bgHeight;
    this.floorElevation = floorElevation;
  }

  onEntityUpdate(ts, eid) {
    const move = dnaManager.getComponent(eid, MoveComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const velocity = dnaManager.getComponent(eid, VelocityComponent);
    const fighter = dnaManager.getComponent(eid, FighterComponent);
    const drawable = dnaManager.getComponent(eid, DrawableComponent);

    // update gravity, update position, reset onFloor
    velocity.y = UT.LERP(velocity.y, GRAVITY, ts / 1000);
    position.x += velocity.x * (ts / 100);
    position.y += velocity.y * (ts / 100);
    move.onFloor = false;

    const halfWidth = fighter.w * 0.5;
    const halfHeight = fighter.h * 0.5;
    const left = position.x - halfWidth;
    const right = position.x + halfWidth;
    const bottom = position.y + halfHeight;

    for (const platformId of dnaManager.findEntities(PlatformComponent)) {
      const platform = dnaManager.getComponent(platformId, PlatformComponent);
      const platformPos = dnaManager.getComponent(platformId, PositionComponent);
      const platformLeft = platformPos.x - platform.w / 2;
      const platformRight = platformPos.x + platform.w / 2;
      const platformTop = platformPos.y - platform.h / 2;
      const platformBottom = platformPos.y + platform.h / 2;

      const isAbove = position.y < platformTop;
      const isWithinX = position.x >= platformLeft && position.x <= platformRight;
      const isWithinY = platformTop < bottom && bottom < platformBottom;

      if (velocity.y > 0 && isAbove && isWithinX && isWithinY) {
        position.y = platformTop - halfHeight;
        velocity.y = 0;
        move.onFloor = true;
        break;
      }
    }

    if (velocity.y >= 0 && bottom >= this.floorElevation) {
      position.y = this.floorElevation - halfHeight;
      velocity.y = 0;
      move.onFloor = true;
    }

    if (velocity.y > 0) {
      drawable.jas.play('FALLOF', false, true);
    }

    if (left < 0) {
      position.x = halfWidth;
    }
    else if (right > this.bgWidth) {
      position.x = this.bgWidth - halfWidth;
    }
  }
}