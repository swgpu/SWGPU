import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx2Drawable } from '../../lib/gfx2/gfx2_drawable';
import { Gfx2TileMap } from '../../lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '../../lib/gfx2_tile/gfx2_tile_map_layer';
import { AIPathGrid2D } from '../../lib/ai/ai_path_grid';
import { AIPathGridSolver } from '../../lib/ai/ai_path_grid_solver';
// ---------------------------------------------------------------------------------------
import { Controller } from './controller';
// ---------------------------------------------------------------------------------------

const LAYER = {
  BACKGROUND: 0,
  MIDDLE: 1,
  FOREGROUND: 2
};

class TilemapPathfindingScreen extends Screen {
  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.collisionMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.middleLayer = new Gfx2TileMapLayer();
    this.foregroundLayer = new Gfx2TileMapLayer();
    this.controller = new Controller();
    this.selectionRect = new SelectionRect();
    this.pathfinder = new AIPathGridSolver();
  }

  async onEnter() {
    await this.tileMap.loadFromFile('./samples/tilemap/map.json');
    this.backgroundLayer.loadFromTileMap(this.tileMap, LAYER.BACKGROUND);
    this.middleLayer.loadFromTileMap(this.tileMap, LAYER.MIDDLE);
    this.foregroundLayer.loadFromTileMap(this.tileMap, LAYER.FOREGROUND);

    await this.collisionMap.loadFromFile('./samples/tilemap/collision.json');
    await this.controller.loadFromFile('./samples/tilemap/bernard.json');
    this.controller.setPosition(this.tileMap.getPositionX(6), this.tileMap.getPositionY(16));
    this.movePlayer(10, 16);

    document.addEventListener('mousemove', e => this.handleMouseMove(e));
    document.addEventListener('click', () => this.handleMouseClick());
  }

  update(ts) {
    const cameraMinX = gfx2Manager.getWidth() * 0.5;
    const cameraMaxX = this.tileMap.getWidth() - gfx2Manager.getWidth() * 0.5;
    const cameraMinY = gfx2Manager.getHeight() * 0.5;
    const cameraMaxY = this.tileMap.getHeight() - gfx2Manager.getHeight() * 0.5;

    gfx2Manager.setCameraPosition(
      UT.CLAMP(this.controller.getPositionX(), cameraMinX, cameraMaxX),
      UT.CLAMP(this.controller.getPositionY(), cameraMinY, cameraMaxY)
    );

    this.backgroundLayer.update(ts);
    this.middleLayer.update(ts);
    this.controller.update(ts);
    this.foregroundLayer.update(ts);
    this.selectionRect.update(ts);
  }

  draw() {
    this.backgroundLayer.draw();
    this.middleLayer.draw();
    this.controller.draw();
    this.foregroundLayer.draw();
    this.selectionRect.draw();
  }

  movePlayer(endX, endY) {
    const startX = this.collisionMap.getLocationCol(this.controller.getPositionX());
    const startY = this.collisionMap.getLocationRow(this.controller.getPositionY());

    const collisionLayer = this.collisionMap.getTileLayer(0);
    const pathfinderGrid = new AIPathGrid2D([collisionLayer.getColumns(), collisionLayer.getRows()], collisionLayer.getGrid());

    const path = this.pathfinder.solve(pathfinderGrid, [startX, startY], [endX, endY]);
    if (path) {
      this.controller.moveAlong(path.map(([col, row]) => [
        this.collisionMap.getPositionX(col + 0.5),
        0,
        this.collisionMap.getPositionY(row + 0.5)
      ]));
    }
  }

  handleMouseMove(e) {
    const position = gfx2Manager.findWorldPosFromClientPos(e.clientX, e.clientY);
    const x = this.collisionMap.getPositionX(this.collisionMap.getLocationCol(position[0]));
    const y = this.collisionMap.getPositionY(this.collisionMap.getLocationRow(position[1]));
    this.selectionRect.setPosition(x, y);
  }

  handleMouseClick() {
    const col = this.collisionMap.getLocationCol(this.selectionRect.getPositionX());
    const row = this.collisionMap.getLocationRow(this.selectionRect.getPositionY());
    const collisionLayer = this.collisionMap.getTileLayer(0);
    if (collisionLayer.getTile(col, row) == 1) {
      return;
    }

    this.movePlayer(col, row);
  }
}

class SelectionRect extends Gfx2Drawable {
  constructor() {
    super();
  }

  draw() {
    const ctx = gfx2Manager.getContext();
    ctx.fillStyle = 'rgba(225,225,225,0.5)';
    ctx.fillRect(this.position[0], this.position[1], 16, 16);
  }
}

export { TilemapPathfindingScreen };