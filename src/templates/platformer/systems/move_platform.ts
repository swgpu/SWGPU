import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Platform } from '../components/platform';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
// ---------------------------------------------------------------------------------------

export class MovePlatformSystem extends DNASystem {
  constructor() {
    super();
    this.addRequiredComponentTypename('Platform');
    this.addRequiredComponentTypename('Position');
    this.addRequiredComponentTypename('Velocity');
  }

  onEntityUpdate(ts: number, eid: number) {
    const pos = dnaManager.getComponent(eid, Position);
    const vel = dnaManager.getComponent(eid, Velocity);
    const platform = dnaManager.getComponent(eid, Platform);

    const dest = platform.direction ? platform.from : platform.to;
    const deltaX = dest[0] - pos.x;
    const deltaY = dest[1] - pos.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist <= 0.2) {
      platform.direction = !platform.direction;
      vel.y = 0;
      vel.x = 0;
    }
    else {
      vel.x = Math.sign(deltaX) * platform.speed;
      vel.y = Math.sign(deltaY) * platform.speed;
      pos.x += vel.x * (ts / 100);
      pos.y += vel.y * (ts / 100);
    }
  }
}