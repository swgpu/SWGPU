import { dnaManager } from '@lib/dna/dna_manager';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Collider } from '../components/collider';
import { Position } from '../components/position';
import { Velocity } from '../components/velocity';
// ---------------------------------------------------------------------------------------

export class MoveEnemySystem extends DNASystem {
  map: Gfx2TileMap;
  layerIndex: number;

  constructor(map: Gfx2TileMap, layerIndex: number) {
    super();
    this.addRequiredComponentTypename('Enemy');
    this.map = map;
    this.layerIndex = layerIndex;
  }

  onEntityUpdate(ts: number, eid: number) {
    const pos = dnaManager.getComponent(eid, Position);
    const vel = dnaManager.getComponent(eid, Velocity);
    const collider = dnaManager.getComponent(eid, Collider);

    const bounds = collider.getBounds([pos.x, pos.y]);
    const leftCol = this.map.getLocationCol(bounds.left);
    const rightCol = this.map.getLocationCol(bounds.right);
    const bottomRow = this.map.getLocationRow(bounds.bottom) + 1;
    const currentRow = this.map.getLocationRow(pos.y);
    const layer = this.map.getTileLayer(this.layerIndex);

    const emptyLeft = layer.getTile(leftCol, bottomRow) === undefined;
    const emptyRight = layer.getTile(rightCol, bottomRow) === undefined;

    const wallLeft = layer.getTile(leftCol, currentRow) !== undefined;
    const wallRight = layer.getTile(rightCol, currentRow) !== undefined;

    if (emptyLeft || emptyRight || wallLeft || wallRight) {
      vel.x *= -1;
    }

    pos.x += vel.x;
  }
}