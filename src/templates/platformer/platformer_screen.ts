import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { UT } from '@lib/core/utils';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '@lib/gfx2_tile/gfx2_tile_map_layer';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteScrolling } from '@lib/gfx2_sprite/gfx2_sprite_scrolling';
// ---------------------------------------------------------------------------------------
import { spawnEnemy } from './entities/enemy';
import { spawnPlayer } from './entities/player';
import { spawnPlatform } from './entities/platform';
import { DrawableSystem } from './systems/drawable';
import { HealthSystem } from './systems/health';
import { KillEnemySystem } from './systems/kill_enemy';
import { MoveBulletsSystem } from './systems/move_bullets';
import { MoveEnemySystem } from './systems/move_enemy';
import { MovePlatformSystem } from './systems/move_platform';
import { PlayerControllerSystem } from './systems/player_controller';
import { PlayerShootSystem } from './systems/player_shoot';
import { TakeDamageSytem } from './systems/take_damage';
// ---------------------------------------------------------------------------------------

class PlatformerScreen extends Screen {
  tileMap: Gfx2TileMap;
  backgroundLayer: Gfx2TileMapLayer;
  middleLayer: Gfx2TileMapLayer;
  foregroundLayer: Gfx2TileMapLayer;
  scrolling: Gfx2SpriteScrolling;

  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.middleLayer = new Gfx2TileMapLayer();
    this.foregroundLayer = new Gfx2TileMapLayer();
    this.scrolling = new Gfx2SpriteScrolling();
  }

  async onEnter() {
    await this.tileMap.loadFromSpriteFusion('templates/platformer/map.jtm', 'templates/platformer/map.png');
    this.backgroundLayer.loadFromTileMap(this.tileMap, 3);
    this.middleLayer.loadFromTileMap(this.tileMap, 4);
    this.foregroundLayer.loadFromTileMap(this.tileMap, 2);

		const parallaxSprite = new Gfx2SpriteJSS()
		parallaxSprite.setTexture(await gfx2TextureManager.loadTexture('templates/platformer/background.png'));
    this.scrolling.setSprite(parallaxSprite);

    dnaManager.setup([
      new DrawableSystem(),
      new HealthSystem(),
      new MovePlatformSystem(),
      new PlayerControllerSystem(this.tileMap, 0),
      new PlayerShootSystem(),
      new MoveBulletsSystem(),
      new MoveEnemySystem(this.tileMap, 0),
      new KillEnemySystem(),
      new TakeDamageSytem(this.tileMap, 1) // lava layer
    ]);

    await Promise.all([
      spawnPlayer(50, 100),
      spawnEnemy(160, 68),
      spawnEnemy(180, 68),
      spawnEnemy(270, 100),
      spawnEnemy(300, 100),
      spawnEnemy(330, 100),
      spawnPlatform(250, 70, [0, -20], [0, 20])
    ]);

    gfx2Manager.setCameraScale(5, 5);
  }

  update(ts: number) {
    const previousCameraPositionX = gfx2Manager.getCameraPositionX();
    const previousCameraPositionY = gfx2Manager.getCameraPositionY();

    dnaManager.update(ts);

    const cameraX = UT.CLAMP(gfx2Manager.getCameraPositionX(), 70, 600);
    gfx2Manager.setCameraPosition(cameraX, gfx2Manager.getCameraPositionY());

    const cameraDeltaX = gfx2Manager.getCameraPositionX() - previousCameraPositionX;
    const cameraDeltaY = gfx2Manager.getCameraPositionY() - previousCameraPositionY;

    this.scrolling.setMove(-cameraDeltaX, -cameraDeltaY);
    this.scrolling.update();
  }

  draw() {
    this.scrolling.draw();
    this.backgroundLayer.draw();
    this.middleLayer.draw();
    dnaManager.draw();
    this.foregroundLayer.draw();
  }
}

export { PlatformerScreen };