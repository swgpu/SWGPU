import { inputManager } from '../../lib/input/input_manager';
import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx2TileLayer, Gfx2TileMap } from '../../lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '../../lib/gfx2_tile/gfx2_tile_map_layer';
// ---------------------------------------------------------------------------------------
import { Controller } from './controller';
// ---------------------------------------------------------------------------------------

const LAYER = {
  BACKGROUND: 0,
  MIDDLE: 1,
  FOREGROUND: 2
};

class TilemapScreen extends Screen {
  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.middleLayer = new Gfx2TileMapLayer();
    this.foregroundLayer = new Gfx2TileMapLayer();
    this.collisionMap = new Gfx2TileMap();
    this.collisionTileLayer = new Gfx2TileLayer();
    this.controller = new Controller();
  }

  async onEnter() {
    await this.tileMap.loadFromFile('./samples/tilemap/map.json');
    this.backgroundLayer.loadFromTileMap(this.tileMap,  LAYER.BACKGROUND);
    this.middleLayer.loadFromTileMap(this.tileMap, LAYER.MIDDLE);
    this.foregroundLayer.loadFromTileMap(this.tileMap, LAYER.FOREGROUND);

    await this.collisionMap.loadFromFile('./samples/tilemap/collision.json');
    this.collisionTileLayer = this.collisionMap.getTileLayer(0);

    await this.controller.loadFromFile('./samples/tilemap/bernard.json');
    this.controller.setPosition(this.collisionMap.getPositionX(12), this.collisionMap.getPositionY(16));
  }

  update(ts) {
    if (inputManager.isActiveAction('LEFT')) {
      this.moveController(-1 * this.controller.getSpeed() * ts, 0, 'LEFT');
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      this.moveController(1 * this.controller.getSpeed() * ts, 0, 'RIGHT');
    }
    else if (inputManager.isActiveAction('UP')) {
      this.moveController(0, -1 * this.controller.getSpeed() * ts, 'FORWARD');
    }
    else if (inputManager.isActiveAction('DOWN')) {
      this.moveController(0, 1 * this.controller.getSpeed() * ts, 'BACKWARD');
    }
    else {
      this.controller.play('IDLE_' + this.controller.getDirection(), true);
    }

    let cameraMinX = gfx2Manager.getWidth() * 0.5;
    let cameraMaxX = this.tileMap.getWidth() - gfx2Manager.getWidth() * 0.5;
    let cameraMinY = gfx2Manager.getHeight() * 0.5;
    let cameraMaxY = this.tileMap.getHeight() - gfx2Manager.getHeight() * 0.5;

    gfx2Manager.setCameraPosition(
      UT.CLAMP(this.controller.getPositionX(), cameraMinX, cameraMaxX),
      UT.CLAMP(this.controller.getPositionY(), cameraMinY, cameraMaxY)
    );

    this.backgroundLayer.update(ts);
    this.middleLayer.update(ts);
    this.controller.update(ts);
    this.foregroundLayer.update(ts);
  }

  draw() {
    this.backgroundLayer.draw();
    this.middleLayer.draw();
    this.controller.draw();
    this.foregroundLayer.draw();
  }

  moveController(mx, my, direction) {
    this.controller.translate(mx, my);
    this.controller.setDirection(direction);
    this.controller.play('RUN_' + direction, true);

    let position = this.controller.getPosition();
    let loc00X = this.collisionMap.getLocationCol(position[0] + this.controller.getCollider1X());
    let loc00Y = this.collisionMap.getLocationCol(position[1] + this.controller.getCollider1Y());
    let loc01X = this.collisionMap.getLocationCol(position[0] + this.controller.getCollider2X());
    let loc01Y = this.collisionMap.getLocationCol(position[1] + this.controller.getCollider2Y());

    if (this.collisionTileLayer.getTile(loc00X, loc00Y) == 1 || this.collisionTileLayer.getTile(loc01X, loc01Y) == 1) {
      this.controller.translate(-mx, -my);
    }
  }
}

export { TilemapScreen };