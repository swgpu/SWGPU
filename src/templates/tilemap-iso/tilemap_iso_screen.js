import { inputManager } from '@lib/input/input_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileLayer } from '@lib/gfx2_tile/gfx2_tile_layer';
import { Gfx2IsoTileMapLayer } from '@lib/gfx2_iso/gfx2_iso_tile_map_layer';
// ---------------------------------------------------------------------------------------
import { Controller } from './controller';
// ---------------------------------------------------------------------------------------

class TilemapIsoScreen extends Screen {
  constructor() {
    super();
    this.tilemap = new Gfx2TileMap();
    this.collisionLayer = new Gfx2IsoTileMapLayer();
    this.occludersLayer = new Gfx2IsoTileMapLayer();
    this.wallsLayer = new Gfx2IsoTileMapLayer();
    this.floorLayer = new Gfx2IsoTileMapLayer();
    this.collisionTileLayer = new Gfx2TileLayer();
    this.controller = new Controller();
  }

  async onEnter() {
    await this.tilemap.loadFromFile('./templates/tilemap-iso/tilemap.json');
    this.collisionLayer.loadFromTileMap(this.tilemap, 3);
    this.collisionLayer.setShowDebug(true);
    this.collisionLayer.setElevation(3);
    this.occludersLayer.loadFromTileMap(this.tilemap, 2);
    this.wallsLayer.loadFromTileMap(this.tilemap, 1);
    this.floorLayer.loadFromTileMap(this.tilemap, 0);
    this.collisionTileLayer = this.tilemap.getTileLayer(3);

    await this.controller.load();
    this.controller.setElevation(2);

    const spawnPosition = this.tilemap.getPositionIso(5, 5);
    this.controller.setPosition(spawnPosition[0], spawnPosition[1]);
  }

  update(ts) {
    if (inputManager.isActiveAction('LEFT')) {
      this.move(ts, this.controller, UT.VEC2_ISO_FORWARD, 'FORWARD');
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      this.move(ts, this.controller, UT.VEC2_ISO_BACKWARD, 'BACKWARD');
    }
    else if (inputManager.isActiveAction('UP')) {
      this.move(ts, this.controller, UT.VEC2_ISO_RIGHT, 'RIGHT');
    }
    else if (inputManager.isActiveAction('DOWN')) {
      this.move(ts, this.controller, UT.VEC2_ISO_LEFT, 'LEFT');
    }
    else {
      this.controller.play('IDLE_' + this.controller.getDirection(), true);
    }

    this.controller.update(ts);
  }

  draw() {
    gfx2Manager.setMode('ISOMETRIC');
    gfx2Manager.setCameraPosition(this.controller.getPositionX(), this.controller.getPositionY());

    for (const drawable of this.occludersLayer.getTiles()) {
      drawable.draw();
    }

    for (const drawable of this.wallsLayer.getTiles()) {
      drawable.draw();
    }

    for (const drawable of this.floorLayer.getTiles()) {
      drawable.draw();
    }

    this.controller.draw();
    this.collisionLayer.draw();
  }

  move(ts, controller, dir, direction) {
    const move = UT.VEC2_2D_TO_ISO(dir);
    const mx = move[0] * controller.getSpeed() * (ts / 100);
    const mz = move[1] * controller.getSpeed() * (ts / 100);

    controller.translate(mx, mz);
    controller.setDirection(direction);
    controller.play('RUN_' + direction, true);  

    const pts = controller.getCollisionPoints();
    const loc0 = this.tilemap.getLocationFromIso(pts[0][0], pts[0][1]);
    const loc1 = this.tilemap.getLocationFromIso(pts[1][0], pts[1][1]);

    if (this.collisionTileLayer.getTile(loc0[0], loc0[1]) == 1 || this.collisionTileLayer.getTile(loc1[0], loc1[1]) == 1) {
      controller.translate(-mx, -mz);
    }
  }
}

export { TilemapIsoScreen };