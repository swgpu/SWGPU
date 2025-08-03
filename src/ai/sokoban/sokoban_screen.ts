import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { inputManager } from '@lib/input/input_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '@lib/gfx2_tile/gfx2_tile_map_layer';

enum PlayerDirection {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3
};

class SokobanScreen extends Screen {
  tileMap: Gfx2TileMap;
  backgroundLayer: Gfx2TileMapLayer;
  wallTexture: ImageBitmap | HTMLImageElement;
  playerTextures: Array<ImageBitmap | HTMLImageElement>;
  boxTexture: ImageBitmap | HTMLImageElement;
  targetTexture: ImageBitmap | HTMLImageElement;
  playerX: number;
  playerY: number;
  playerDirection: PlayerDirection;
  boxes: Array<{ x: number, y: number }>;
  targets: Array<{ x: number, y: number }>;
  level: number[][];

  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.wallTexture = gfx2Manager.getDefaultTexture();
    this.playerTextures = [];
    this.boxTexture = gfx2Manager.getDefaultTexture();
    this.targetTexture = gfx2Manager.getDefaultTexture();
    this.playerX = 1;
    this.playerY = 1;
    this.playerDirection = PlayerDirection.DOWN;
    this.boxes = [];
    this.targets = [];
    this.level = [];
  }

  async onEnter() {
    this.wallTexture = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/wall.png');
    this.playerTextures[PlayerDirection.UP] = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/up.png');
    this.playerTextures[PlayerDirection.DOWN] = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/down.png');
    this.playerTextures[PlayerDirection.LEFT] = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/left.png');
    this.playerTextures[PlayerDirection.RIGHT] = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/right.png');
    this.boxTexture = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/box.png');
    this.targetTexture = await gfx2TextureManager.loadTexture('/ai/mario-sokoban/target.png');
    this.level = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 2, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 3, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 2, 0, 1, 0, 0, 4, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1],
      [1, 0, 1, 0, 3, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.boxes = [];
    this.targets = [];

    for (let y = 0; y < this.level.length; y++) {
      for (let x = 0; x < this.level[y].length; x++) {
        const tile = this.level[y][x];
        if (tile === 2) this.targets.push({ x, y });
        if (tile === 3) this.boxes.push({ x, y });
        if (tile === 4) {
          this.playerX = x;
          this.playerY = y;
        }
      }
    }

    // center camera
    const mapWidth = this.level[0].length * 32;
    const mapHeight = this.level.length * 32;
    gfx2Manager.setCameraPosition(mapWidth / 2, mapHeight / 2);
  }

  update(ts: number) {
    this.handleInput();
  }

  handleInput() {
    if (inputManager.isJustActiveAction('UP')) {
      this.playerDirection = PlayerDirection.UP;
      this.movePlayer(0, -1);
    }

    if (inputManager.isJustActiveAction('DOWN')) {
      this.playerDirection = PlayerDirection.DOWN;
      this.movePlayer(0, 1);
    }

    if (inputManager.isJustActiveAction('LEFT')) {
      this.playerDirection = PlayerDirection.LEFT;
      this.movePlayer(-1, 0);
    }

    if (inputManager.isJustActiveAction('RIGHT')) {
      this.playerDirection = PlayerDirection.RIGHT;
      this.movePlayer(1, 0);
    }
  }

  movePlayer(dx: number, dy: number) {
    const newX = this.playerX + dx;
    const newY = this.playerY + dy;

    if (this.isWall(newX, newY)) return;

    const boxIndex = this.getBoxAt(newX, newY);
    if (boxIndex !== -1) {
      const boxNewX = newX + dx;
      const boxNewY = newY + dy;

      if (this.isWall(boxNewX, boxNewY) || this.getBoxAt(boxNewX, boxNewY) !== -1) return;

      this.boxes[boxIndex].x = boxNewX;
      this.boxes[boxIndex].y = boxNewY;
    }

    this.playerX = newX;
    this.playerY = newY;

    if (this.checkWin()) {
      console.log('Level completed!');
    }
  }

  isWall(x: number, y: number): boolean {
    return this.level[y]?.[x] === 1;
  }

  getBoxAt(x: number, y: number): number {
    return this.boxes.findIndex(box => box.x === x && box.y === y);
  }

  checkWin(): boolean {
    // Vérifier que toutes les cibles ont une boîte ET que toutes les boîtes sont sur une cible
    const allTargetsHaveBoxes = this.targets.every(target =>
      this.boxes.some(box => box.x === target.x && box.y === target.y)
    );

    const allBoxesOnTargets = this.boxes.every(box =>
      this.targets.some(target => target.x === box.x && target.y === box.y)
    );

    return allTargetsHaveBoxes && allBoxesOnTargets;
  }

  draw() {
    this.drawLevel();
    this.drawTargets();
    this.drawBoxes();
    this.drawPlayer();
  }

  drawLevel() {
    gfx2Manager.drawCommand((ctx) => {
      for (let y = 0; y < this.level.length; y++) {
        for (let x = 0; x < this.level[y].length; x++) {
          if (this.level[y][x] === 1) {
            ctx.drawImage(this.wallTexture, x * 32, y * 32);
          }
        }
      }
    });
  }

  drawTargets() {
    gfx2Manager.drawCommand((ctx) => {
      this.targets.forEach(target => {
        ctx.drawImage(this.targetTexture, target.x * 32, target.y * 32);
      });
    });
  }

  drawBoxes() {
    gfx2Manager.drawCommand((ctx) => {
      this.boxes.forEach(box => {
        const isOnTarget = this.targets.some(target =>
          target.x === box.x && target.y === box.y
        );

        ctx.drawImage(this.boxTexture, box.x * 32, box.y * 32);

        if (isOnTarget) {
          ctx.globalCompositeOperation = 'multiply';
          ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // teinte rouge
          ctx.fillRect(box.x * 32, box.y * 32, 32, 32);
          ctx.globalCompositeOperation = 'source-over';
        }
      });
    });
  }

  drawPlayer() {
    gfx2Manager.drawCommand((ctx) => {
      ctx.drawImage(this.playerTextures[this.playerDirection], this.playerX * 32, this.playerY * 32);
    });
  }

  render() {
    gfx2Manager.beginRender();
    gfx2Manager.render();
    gfx2Manager.endRender();
  }
}

export { SokobanScreen };





