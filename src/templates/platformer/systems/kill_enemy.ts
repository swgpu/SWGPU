import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { spawnExplosion } from '../entities/enemy';
import { Bullet } from '../components/bullet';
import { Collider } from '../components/collider';
import { Position } from '../components/position';
// ---------------------------------------------------------------------------------------

export class KillEnemySystem extends DNASystem {
  constructor() {
    super();
    this.addRequiredComponentTypename('Enemy');
  }

  onEntityUpdate(ts: number, eid: number) {
    const position = dnaManager.getComponent(eid, Position);
    const collider = dnaManager.getComponent(eid, Collider);
    const bullets = dnaManager.getAllComponents(Bullet);

    for (const bulletId of bullets.keys()) {
      const bulletPosition = dnaManager.getComponent(bulletId, Position);
      const bulletCollider = dnaManager.getComponent(bulletId, Collider);
      if (Collider.isCollide(bulletPosition, bulletCollider, position, collider)) {
        dnaManager.removeEntity(eid);
        dnaManager.removeEntity(bulletId);
        spawnExplosion(position.x, position.y);
      }
    }
  }
}