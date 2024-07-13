import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
// ---------------------------------------------------------------------------------------
import { ShipComponent } from '../systems/ship';
// ---------------------------------------------------------------------------------------

export async function spawnShip() {
  await gfx2TextureManager.loadTexture('./templates/shootemup/ship.png');
  const eid = dnaManager.createEntity();
  dnaManager.addComponent(eid, new ShipComponent());
}