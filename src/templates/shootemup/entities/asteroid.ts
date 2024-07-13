import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
// ---------------------------------------------------------------------------------------
import { AsteroidComponent } from '../systems/asteroid';
// ---------------------------------------------------------------------------------------

export async function spawnAsteroid(x: number, y: number) {
  await gfx2TextureManager.loadTexture('./templates/shootemup/asteroid.png');
  const eid = dnaManager.createEntity();
  dnaManager.addComponent(eid, new AsteroidComponent(x, y));
}

export async function generateWave(rows: number, cols: number, holes: Array<number>, leftPad: number, topPad: number) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (holes[i] != j) {
        const x = j * 60 - 300 + leftPad;
        const y = i * 60 - 300 + topPad;
        await spawnAsteroid(x, y - 300);
      }
    }
  }
}