import { inputManager } from '@lib/input/input_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileLayer, Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '@lib/gfx2_tile/gfx2_tile_map_layer';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { Bernard } from './bernard';
// ---------------------------------------------------------------------------------------

const LAYER = {
  BACKGROUND: 0,
  MIDDLE: 1,
  FOREGROUND: 2
};

class AnimationsScreen extends Screen {
  constructor() {
    super();
    // this.tileMap = new Gfx2TileMap();
    // this.backgroundLayer = new Gfx2TileMapLayer();
    // this.middleLayer = new Gfx2TileMapLayer();
    // this.foregroundLayer = new Gfx2TileMapLayer();
    // this.collisionMap = new Gfx2TileMap();
    // this.collisionTileLayer = new Gfx2TileLayer();
    this.jas = new Gfx2SpriteJAS();
  }

  async onEnter() {
    await this.jas.loadFromFile('./templates/animations/bernard-ase.json', FileType.Aseprite);
    // await this.tileMap.loadFromFile('./templates/tilemap/map.json');
    // this.backgroundLayer.loadFromTileMap(this.tileMap, LAYER.BACKGROUND);
    // this.middleLayer.loadFromTileMap(this.tileMap, LAYER.MIDDLE);
    // this.foregroundLayer.loadFromTileMap(this.tileMap, LAYER.FOREGROUND);

    // await this.collisionMap.loadFromFile('./templates/tilemap/collision.json');
    // this.collisionTileLayer = this.collisionMap.getTileLayer(0);

    this.jas.setPosition(0, 0);
    // this.bernard.setPosition(this.collisionMap.getPositionX(12), this.collisionMap.getPositionY(16));
    this.jas.play('RUN_BACKWARD');
  }

  update(ts) {
    this.jas.update(ts);
    // if (inputManager.isActiveAction('LEFT')) {
    //   this.moveController(-1 * this.bernard.getSpeed() * ts, 0, 'LEFT');
    // }
    // else if (inputManager.isActiveAction('RIGHT')) {
    //   this.moveController(1 * this.bernard.getSpeed() * ts, 0, 'RIGHT');
    // }
    // else if (inputManager.isActiveAction('UP')) {
    //   this.moveController(0, -1 * this.bernard.getSpeed() * ts, 'FORWARD');
    // }
    // else if (inputManager.isActiveAction('DOWN')) {
    //   this.moveController(0, 1 * this.bernard.getSpeed() * ts, 'BACKWARD');
    // }
    // else {
    //   this.bernard.play('IDLE_' + this.bernard.getDirection(), true);
    // }

    // let cameraMinX = gfx2Manager.getWidth() * 0.5;
    // let cameraMaxX = this.tileMap.getWidth() - gfx2Manager.getWidth() * 0.5;
    // let cameraMinY = gfx2Manager.getHeight() * 0.5;
    // let cameraMaxY = this.tileMap.getHeight() - gfx2Manager.getHeight() * 0.5;

    // gfx2Manager.setCameraPosition(
    //   UT.CLAMP(this.bernard.getPositionX(), cameraMinX, cameraMaxX),
    //   UT.CLAMP(this.bernard.getPositionY(), cameraMinY, cameraMaxY)
    // );

    // this.backgroundLayer.update(ts);
    // this.middleLayer.update(ts);
    // this.bernard.update(ts);
    // this.foregroundLayer.update(ts);
  }

  draw() {
    // this.backgroundLayer.draw();
    this.jas.draw();
    // this.middleLayer.draw();
    // this.bernard.draw();
    // this.foregroundLayer.draw();
  }

  moveController(mx, my, direction) {
    // this.bernard.translate(mx, my);
    // this.bernard.setDirection(direction);
    // this.bernard.play('RUN_' + direction, true);

    // let position = this.bernard.getPosition();
    // let loc00X = this.collisionMap.getLocationCol(position[0] + this.bernard.getCollider1X());
    // let loc00Y = this.collisionMap.getLocationCol(position[1] + this.bernard.getCollider1Y());
    // let loc01X = this.collisionMap.getLocationCol(position[0] + this.bernard.getCollider2X());
    // let loc01Y = this.collisionMap.getLocationCol(position[1] + this.bernard.getCollider2Y());

    // if (this.collisionTileLayer.getTile(loc00X, loc00Y) == 1 || this.collisionTileLayer.getTile(loc01X, loc01Y) == 1) {
    //   this.bernard.translate(-mx, -my);
    // }
  }
}

export { AnimationsScreen };