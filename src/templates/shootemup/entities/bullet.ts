import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
// ---------------------------------------------------------------------------------------
import { BulletComponent } from '../systems/bullet';
// ---------------------------------------------------------------------------------------

export async function spawnBullet(x: number, y: number) {
  await gfx2TextureManager.loadTexture('./templates/shootemup/bullet.png');
  const eid = dnaManager.createEntity();
  const bullet = new BulletComponent();
  bullet.jss.setOffsetNormalized(0.5, 0);
  bullet.jss.setPosition(x, y);
  dnaManager.addComponent(eid, bullet);
}