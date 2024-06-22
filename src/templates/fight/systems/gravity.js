import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { MoveComponent } from './move';
import { PositionComponent } from './position';
import { FighterComponent } from './fighter';
import { PlatformComponent } from './platform';
// ---------------------------------------------------------------------------------------

const GRAVITY_SPEED_MAX = 20;

export class GravityComponent extends DNAComponent {
  constructor(gravityFactor = 1) {
    super('Gravity');
    this.gravityFactor = gravityFactor;
    this.onFloor = true;
  }
}

export class GravitySystem extends DNASystem {
  constructor(floorElevation = 540) {
    super();
    this.floorElevation = floorElevation;
    super.addRequiredComponentTypename('Gravity');
    super.addRequiredComponentTypename('Move');
    super.addRequiredComponentTypename('Position');
    super.addRequiredComponentTypename('Fighter');
    super.addRequiredComponentTypename('Drawable');
  }

  onEntityUpdate(ts, eid) {
    const gravity = dnaManager.getComponent(eid, GravityComponent);
    const move = dnaManager.getComponent(eid, MoveComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);
    const fighter = dnaManager.getComponent(eid, FighterComponent);

    const footLocalPos = fighter.h * 0.5;
    const footPos = position.y + move.velocityY + footLocalPos;

    let minDelta = Math.abs(footPos - this.floorElevation);
    let minElevation = this.floorElevation;

    for (const platformId of dnaManager.findEntities(PlatformComponent)) {
      const platform = dnaManager.getComponent(platformId, PlatformComponent);
      const platformPos = dnaManager.getComponent(platformId, PositionComponent);

      const delta = Math.abs(footPos - platform.elevation);
      const minX = platformPos.x - (platform.w / 2);
      const maxX = platformPos.x + (platform.w / 2);

      if (position.x >= minX && position.x <= maxX && minDelta > delta) {
        minDelta = delta;
        minElevation = platform.elevation;
      }
    }

    if (footPos >= minElevation && minDelta <= move.velocityY * 2) {
      position.y = minElevation - footLocalPos;
      move.velocityY = 0;
      gravity.onFloor = true;
    }
    else {
      move.velocityY = Math.min(move.velocityY + gravity.gravityFactor, GRAVITY_SPEED_MAX);
      gravity.onFloor = false;
    }
  }
}