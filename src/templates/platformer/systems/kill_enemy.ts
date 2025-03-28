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
    const pos = dnaManager.getComponent(eid, Position);
    const collider = dnaManager.getComponent(eid, Collider);
    const bullets = dnaManager.getAllComponents(Bullet);

    for (const bulletId of bullets.keys()) {
      const bulletPos = dnaManager.getComponent(bulletId, Position);
      const bulletCollider = dnaManager.getComponent(bulletId, Collider);
      if (Collider.isCollide([bulletPos.x, bulletPos.y], bulletCollider, [pos.x, pos.y], collider)) {
        dnaManager.removeEntity(eid);
        dnaManager.removeEntity(bulletId);
        spawnExplosion(pos.x, pos.y);
      }
    }
  }
}