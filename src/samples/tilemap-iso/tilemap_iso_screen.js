import { inputManager } from '../../lib/input/input_manager';
import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx2TileMap, Gfx2TileLayer } from '../../lib/gfx2_tile/gfx2_tile_map';
import { Gfx2IsoTileMapLayer } from '../../lib/gfx2_iso/gfx2_iso_tile_map_layer';
import { Gfx2IsoDrawer } from '../../lib/gfx2_iso/gfx2_iso_drawer';
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
    await this.tilemap.loadFromFile('./samples/tilemap-iso/tilemap.json');
    this.collisionLayer.loadFromTileMap(this.tilemap, 3);
    this.collisionLayer.setShowDebug(true);
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
      this.movePlayer(UT.VEC2_ISO_FORWARD, 'FORWARD');
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      this.movePlayer(UT.VEC2_ISO_BACKWARD, 'BACKWARD');
    }
    else if (inputManager.isActiveAction('UP')) {
      this.movePlayer(UT.VEC2_ISO_RIGHT, 'RIGHT');
    }
    else if (inputManager.isActiveAction('DOWN')) {
      this.movePlayer(UT.VEC2_ISO_LEFT, 'LEFT');
    }
    else {
      this.controller.play('IDLE_' + this.controller.getDirection(), true);
    }

    this.controller.update(ts);
  }

  draw() {
    gfx2Manager.setCameraPosition(this.controller.getPositionX(), this.controller.getPositionY());
    Gfx2IsoDrawer.draw([
      ...this.occludersLayer.getTiles(),
      ...this.wallsLayer.getTiles(),
      ...this.floorLayer.getTiles(),
      this.controller
    ]);

    this.collisionLayer.draw();
  }

  movePlayer(vdir, direction) {
    const move = UT.VEC2_2D_TO_ISO(vdir);
    this.controller.translate(move[0], move[1]);
    this.controller.setDirection(direction);
    this.controller.play('RUN_' + direction, true);

    const pts = this.controller.getCollisionPoints();
    const loc0 = this.tilemap.getLocationFromIso(pts[0][0], pts[0][1]);
    const loc1 = this.tilemap.getLocationFromIso(pts[1][0], pts[1][1]);

    if (this.collisionTileLayer.getTile(loc0[0], loc0[1]) == 1 || this.collisionTileLayer.getTile(loc1[0], loc1[1]) == 1) {
      this.controller.translate(-move[0], -move[1]);
    }
  }
}

export { TilemapIsoScreen };