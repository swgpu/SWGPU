import { dnaManager } from '@lib/dna/dna_manager';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Collider } from '../components/collider';
import { Enemy } from '../components/enemy';
import { Health } from '../components/health';
import { Position } from '../components/position';
// ---------------------------------------------------------------------------------------

export class TakeDamageSytem extends DNASystem {
  map: Gfx2TileMap;
  layerIndex: number;

  constructor(map: Gfx2TileMap, layerIndex: number) {
    super();
    this.addRequiredComponentTypename('Player');
    this.addRequiredComponentTypename('Health');
    this.map = map;
    this.layerIndex = layerIndex;
  }

  onEntityUpdate(ts: number, eid: number) {
    const pos = dnaManager.getComponent(eid, Position);
    const collider = dnaManager.getComponent(eid, Collider);
    const health = dnaManager.getComponent(eid, Health);

    const enemies = dnaManager.getAllComponents(Enemy);
    const playerRow = this.map.getLocationRow(pos.y);
    const playerCol = this.map.getLocationRow(pos.x);
    const layer = this.map.getTileLayer(this.layerIndex);

    // take damage when falling in lava
    if (layer.getTile(playerCol, playerRow) !== undefined) {
      health.takeDamage();
    }

    for (const enemyId of enemies.keys()) {
      const enemyPos = dnaManager.getComponent(enemyId, Position);
      const enemyCollider = dnaManager.getComponent(enemyId, Collider);
      if (Collider.isCollide([pos.x, pos.y], collider, [enemyPos.x, enemyPos.y], enemyCollider)) {
        health.takeDamage();
      }
    }

    if (health.currentHealth === 0) {
      console.log('You are dead !');
    }
  }
}