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
    const position = dnaManager.getComponent(eid, Position);
    const collider = dnaManager.getComponent(eid, Collider);
    const velocity = dnaManager.getComponent(eid, Velocity);

    const bounds = collider.getBounds(position);
    const leftCol = this.map.getLocationCol(bounds.left);
    const rightCol = this.map.getLocationCol(bounds.right);
    const bottomRow = this.map.getLocationRow(bounds.bottom + 1);
    const currentRow = this.map.getLocationRow(position.y);
    const layer = this.map.getTileLayer(this.layerIndex);

    const emptyLeft = layer.getTile(leftCol, bottomRow) === undefined;
    const emptyRight = layer.getTile(rightCol, bottomRow) === undefined;

    const wallLeft = layer.getTile(leftCol, currentRow) !== undefined;
    const wallRight = layer.getTile(rightCol, currentRow) !== undefined;

    if (emptyLeft || emptyRight || wallLeft || wallRight) {
      velocity.x *= -1;
    }

    position.x += velocity.x;
  }
}