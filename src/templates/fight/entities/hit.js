import { dnaManager } from '@lib/dna/dna_manager';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from '../systems/position';
import { HitComponent } from '../systems/hit';
import { DrawableComponent } from '../systems/drawable';
import { ColliderComponent } from '../systems/collider';
// ---------------------------------------------------------------------------------------

export async function spawnHit(hit, x, y, jas, owner, direction) {
  const hitId = dnaManager.createEntity();
  dnaManager.addComponent(hitId, new PositionComponent(x, y));
  dnaManager.addComponent(hitId, new DrawableComponent({ jas: jas }));
  dnaManager.addComponent(hitId, new ColliderComponent(hit.w, hit.h));
  dnaManager.addComponent(hitId, new HitComponent(Object.assign(hit, {
    owner: owner,
    direction: direction
  })));
}