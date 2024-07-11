import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
// ---------------------------------------------------------------------------------------

export class MoveBulletsSystem extends DNASystem {
  constructor() {
    super();
    this.addRequiredComponentTypename('Bullet');
    this.addRequiredComponentTypename('Velocity');
    this.addRequiredComponentTypename('Position');
  }

  onEntityUpdate(ts: number, eid: number) {
    const position = dnaManager.getComponent(eid, Position);
    const velocity = dnaManager.getComponent(eid, Velocity);
    position.x += velocity.x * ts;
    position.y += velocity.y * ts;
  }
}