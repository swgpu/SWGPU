import { inputManager } from '../../lib/input/input_manager';
import { eventManager } from '../../lib/core/event_manager';
import { gfx2Manager } from '../../lib/gfx2/gfx2_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx2TileMap } from '../../lib/gfx2_tile/gfx2_tile_map';
import { Gfx2SpriteJSS } from '../../lib/gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2Drawer } from '../../lib/gfx2/gfx2_drawer';
import { Gfx2IsoTileMapLayer } from '../../lib/gfx2_iso/gfx2_iso_tile_map_layer';
import { AIPathGrid2D } from '../../lib/ai/ai_path_grid';
import { AIPathGridSolver } from '../../lib/ai/ai_path_grid_solver';
// ---------------------------------------------------------------------------------------
import { Controller } from './controller';
// ---------------------------------------------------------------------------------------

const CAMERA_FOLLOW_BEGIN_X = 150;
const CAMERA_FOLLOW_BEGIN_Y = 20;

class BgIsoScreen extends Screen {
  constructor() {
    super();
    this.bg0 = new Gfx2SpriteJSS();
    this.bg1 = new Gfx2SpriteJSS();
    this.cursor = new Gfx2SpriteJSS();
    this.cursorRow = 0;
    this.cursorCol = 0;
    this.tilemap = new Gfx2TileMap();
    this.layer1 = new Gfx2IsoTileMapLayer();
    this.gridIds = [];
    this.gridCollisions = [];
    this.gridLayers = [];
    this.gridSubSprites = [];
    this.controller = new Controller();
    this.controllerRow = 0;
    this.controllerCol = 0;

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
  }

  async onEnter() {
    await this.tilemap.loadFromFile('./samples/bg-iso/tilemap.json');
    this.layer1.loadFromTileMap(this.tilemap, 0);
    this.layer1.setShowDebug(true);

    this.bg0.setTexture(await gfx2TextureManager.loadTexture('./samples/bg-iso/background.png'));
    this.bg0.setOffset(this.tilemap.getWidth() / 2, 0);
    this.bg0.setPositionZ(0);

    this.bg1.setTexture(await gfx2TextureManager.loadTexture('./samples/bg-iso/foreground.png'));
    this.bg1.setOffset(this.tilemap.getWidth() / 2, 0);
    this.bg1.setPositionZ(2);

    this.cursor.setTexture(await gfx2TextureManager.loadTexture('./samples/bg-iso/control.png'));
    this.cursor.setOffset(16, 16);
    this.cursor.setPositionZ(1);

    this.buildMap();
    this.locateCursor(19, 1);

    const controllerSprite = new Gfx2SpriteJAS();
    await controllerSprite.loadFromFile('./samples/bg-iso/controller.jas');
    controllerSprite.setTexture(await gfx2TextureManager.loadTexture('./samples/bg-iso/controller.png'));
    this.controller.setSprite(controllerSprite);

    this.locatePlayer(19, 1);
  }

  update(ts) {
    this.controller.update(ts);
    this.moveCamera(this.controller.getPosition());
  }

  draw() {
    Gfx2Drawer.draw([
      this.bg0,
      this.bg1,
      this.cursor,
      this.controller
    ]);

    this.layer1.draw();
  }

  locateCursor(row, col) {
    const collide = this.gridCollisions[row * this.tilemap.getColumns() + col];
    const layerIndex = this.gridLayers[row][col];
    if (collide == 1) {
      return;
    }

    const layer = this.tilemap.getTileLayer(layerIndex);
    const pos = this.tilemap.getPositionIso(row, col);
    this.cursor.setPosition(pos[0], pos[1] - layer.getOffsetY());
    this.cursorRow = row;
    this.cursorCol = col;
  }

  locatePlayer(row, col) {
    const layerIndex = this.gridLayers[row][col];
    const layer = this.tilemap.getTileLayer(layerIndex);
    const pos = this.tilemap.getPositionIso(row, col);
    this.controller.setPosition(pos[0], pos[1] - layer.getOffsetY());
    this.controllerRow = row;
    this.controllerCol = col;
  }

  moveCamera(follower) {
    const cameraPos = gfx2Manager.getCameraPosition();

		if (follower[0] - cameraPos[0] > CAMERA_FOLLOW_BEGIN_X) {
      gfx2Manager.moveCamera(1, 0);
		}
		else if (follower[0] - cameraPos[0] < -CAMERA_FOLLOW_BEGIN_X) {
      gfx2Manager.moveCamera(-1, 0);
		}

		if (follower[1] - cameraPos[1] > CAMERA_FOLLOW_BEGIN_Y) {
      gfx2Manager.moveCamera(0, 1);
		}
		else if (follower[1] - cameraPos[1] < -CAMERA_FOLLOW_BEGIN_Y) {
      gfx2Manager.moveCamera(0, -1);
		}
	}

  movePlayer(row, col) {
    const startRow = this.controllerRow;
    const startCol = this.controllerCol;
    const pathfinderGrid = new AIPathGrid2D([this.tilemap.getColumns(), this.tilemap.getRows()], this.gridCollisions);
    const pathfinder = new AIPathGridSolver();
    const path = pathfinder.solve(pathfinderGrid, [startCol, startRow], [col, row]);
    if (!path) {
      return;
    }

    const positions = path.map(([col, row]) => {
      const pos = this.tilemap.getPositionIso(row, col);
      return [pos[0], 0, pos[1]];
    });

    const elevations = path.map(([col, row]) => {
      const layerIndex = this.gridLayers[row][col];
      const layer = this.tilemap.getTileLayer(layerIndex);
      return layer.getOffsetY();
    });

    this.controller.moveAlong(positions, elevations, (currentIndex, t) => {
      const i = t > 0.5 ? Math.min(currentIndex + 1, path.length - 1) : currentIndex;
      const tileId = this.gridIds[path[i][1]][path[i][0]];
      this.controller.setPositionZ(tileId == 2 ? 1 : 3);
      this.controllerRow = path[i][1];
      this.controllerCol = path[i][0];
    });
  }

  buildMap() {
    for (let i = 0; i < this.tilemap.getRows(); i++) {
      this.gridIds[i] = [];
      this.gridLayers[i] = [];
      for (let j = 0; j < this.tilemap.getColumns(); j++) {
        this.gridIds[i][j] = 0;
        this.gridLayers[i][j] = 0;
        this.gridCollisions[i * this.tilemap.getColumns() + j] = 1;
      }
    }

    for (let i = 0; i < this.tilemap.getRows(); i++) {
      for (let j = 0; j < this.tilemap.getColumns(); j++) {
        for (let k = 0; k < this.tilemap.getTileLayers().length; k++) {
          const layer = this.tilemap.getTileLayer(k);
          const id = layer.getTile(j, i);
          if (id > 0) {
            this.gridIds[i][j] = id;
            this.gridLayers[i][j] = k;
            this.gridCollisions[i * this.tilemap.getColumns() + j] = 0;
          }
        }
      }
    }
  }

  handleActionOnce({ actionId }) {
    if (actionId == 'RIGHT') {
      const nextCol = UT.CLAMP(this.cursorCol + 1, 0, this.tilemap.getColumns() - 1);
      this.locateCursor(this.cursorRow, nextCol);
    }
    else if (actionId == 'LEFT') {
      const nextCol = UT.CLAMP(this.cursorCol - 1, 0, this.tilemap.getColumns() - 1);
      this.locateCursor(this.cursorRow, nextCol);
    }
    else if (actionId == 'UP') {
      const nextRow = UT.CLAMP(this.cursorRow - 1, 0, this.tilemap.getRows() - 1);
      this.locateCursor(nextRow, this.cursorCol);
    }
    else if (actionId == 'DOWN') {
      const nextRow = UT.CLAMP(this.cursorRow + 1, 0, this.tilemap.getRows() - 1);
      this.locateCursor(nextRow, this.cursorCol);
    }
    else if (actionId == 'OK') {
      this.movePlayer(this.cursorRow, this.cursorCol);
    }
  }
}

export { BgIsoScreen };