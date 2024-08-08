import { inputManager } from '@lib/input/input_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileLayer, Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '@lib/gfx2_tile/gfx2_tile_map_layer';
// ---------------------------------------------------------------------------------------
import { Controller } from './controller';
// ---------------------------------------------------------------------------------------

class TilemapScreen extends Screen {
  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.collisionMap = new Gfx2TileMap();
    this.collisionTileLayer = new Gfx2TileLayer();
    this.controller = new Controller();
  }

  async onEnter() {
    // await this.tileMap.loadFromTileKit('map.tilekit', './templates/tilemap');
    await this.tileMap.loadFromTileKit('tk-basic.json', './templates/tilemap');
    this.backgroundLayer.loadFromTileMap(this.tileMap, 0);

    await this.collisionMap.loadFromFile('./templates/tilemap/collision.json');
    this.collisionTileLayer = this.collisionMap.getTileLayer(0);

    await this.controller.loadFromFile('./templates/tilemap/bernard.json');
    this.controller.setPosition(this.collisionMap.getPositionX(12), this.collisionMap.getPositionY(16));

    console.log('tilemap is: ', this.tileMap);
    console.log('tileSet is : ', this.tileMap.tileset);
    console.log('backgroundLayer is: ', this.backgroundLayer);

    const tileset = this.tileMap.tileset;
    console.log(tileset.getTilePositionX(8));
    console.log(tileset.getTilePositionY(8));

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
    this.controller.update(ts);
  }

  draw() {
    this.backgroundLayer.draw();
    this.controller.draw();
    this.controller.draw();
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