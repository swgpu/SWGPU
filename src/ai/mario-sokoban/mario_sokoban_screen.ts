import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { inputManager } from '@lib/input/input_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx2TileMap } from '@lib/gfx2_tile/gfx2_tile_map';
import { Gfx2TileMapLayer } from '@lib/gfx2_tile/gfx2_tile_map_layer';

class MarioSokobanScreen extends Screen {
  tileMap: Gfx2TileMap;
  backgroundLayer: Gfx2TileMapLayer;
  playerX: number;
  playerY: number;
  boxes: Array<{x: number, y: number}>;
  targets: Array<{x: number, y: number}>;
  level: number[][];

  constructor() {
    super();
    this.tileMap = new Gfx2TileMap();
    this.backgroundLayer = new Gfx2TileMapLayer();
    this.playerX = 1;
    this.playerY = 1;
    this.boxes = [];
    this.targets = [];
    this.level = [];
  }

  async onEnter() {
    await this.loadLevel();
    this.centerCamera();
  }

  async loadLevel() {
    // Simple level: 0=empty, 1=wall, 2=target, 3=box, 4=player
    // Maintenant il y a exactement 2 boîtes et 2 cibles
    this.level = [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,2,3,0,0,0,1],
      [1,0,0,4,0,0,0,1],
      [1,0,0,0,3,2,0,1],
      [1,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1]
    ];

    this.parseLevel();
  }

  parseLevel() {
    this.boxes = [];
    this.targets = [];
    
    for (let y = 0; y < this.level.length; y++) {
      for (let x = 0; x < this.level[y].length; x++) {
        const tile = this.level[y][x];
        if (tile === 2) this.targets.push({x, y});
        if (tile === 3) this.boxes.push({x, y});
        if (tile === 4) {
          this.playerX = x;
          this.playerY = y;
        }
      }
    }
  }

  setupInput() {
    // Plus besoin de cette méthode, on utilise les actions par défaut
  }

  centerCamera() {
    const mapWidth = this.level[0].length * 32;
    const mapHeight = this.level.length * 32;
    gfx2Manager.setCameraPosition(mapWidth / 2, mapHeight / 2);
  }

  update(ts: number) {
    this.handleInput();
  }

  handleInput() {
    if (inputManager.isJustActiveAction('UP')) this.movePlayer(0, -1);
    if (inputManager.isJustActiveAction('DOWN')) this.movePlayer(0, 1);
    if (inputManager.isJustActiveAction('LEFT')) this.movePlayer(-1, 0);
    if (inputManager.isJustActiveAction('RIGHT')) this.movePlayer(1, 0);
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
    this.drawUI();
  }

  drawLevel() {
    gfx2Manager.drawCommand((ctx) => {
      for (let y = 0; y < this.level.length; y++) {
        for (let x = 0; x < this.level[y].length; x++) {
          if (this.level[y][x] === 1) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(x * 32, y * 32, 32, 32);
          }
        }
      }
    });
  }

  drawTargets() {
    gfx2Manager.drawCommand((ctx) => {
      this.targets.forEach(target => {
        // Vérifier si une boîte est sur cette cible
        const hasBox = this.boxes.some(box =>
          box.x === target.x && box.y === target.y
        );

        // Dessiner la cible avec une apparence différente si occupée
        if (hasBox) {
          // Cible occupée : petit cercle doré au centre
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(target.x * 32 + 16, target.y * 32 + 16, 6, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Cible libre : carré doré
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(target.x * 32 + 4, target.y * 32 + 4, 24, 24);

          // Bordure pour mieux voir
          ctx.strokeStyle = '#B8860B';
          ctx.lineWidth = 2;
          ctx.strokeRect(target.x * 32 + 4, target.y * 32 + 4, 24, 24);
        }
      });
    });
  }

  drawBoxes() {
    gfx2Manager.drawCommand((ctx) => {
      this.boxes.forEach(box => {
        // Vérifier si la boîte est sur une cible
        const isOnTarget = this.targets.some(target =>
          target.x === box.x && target.y === box.y
        );

        // Couleur différente si la boîte est correctement placée
        ctx.fillStyle = isOnTarget ? '#228B22' : '#8B4513'; // Vert si sur cible, marron sinon
        ctx.fillRect(box.x * 32 + 2, box.y * 32 + 2, 28, 28);

        // Bordure pour mieux voir les boîtes
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x * 32 + 2, box.y * 32 + 2, 28, 28);
      });
    });
  }

  drawPlayer() {
    gfx2Manager.drawCommand((ctx) => {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(this.playerX * 32 + 8, this.playerY * 32 + 8, 16, 16);

      // Bordure pour mieux voir le joueur
      ctx.strokeStyle = '#800000';
      ctx.lineWidth = 2;
      ctx.strokeRect(this.playerX * 32 + 8, this.playerY * 32 + 8, 16, 16);
    });
  }

  drawUI() {
    gfx2Manager.drawCommand((ctx) => {
      // Compter les boîtes correctement placées
      const correctBoxes = this.boxes.filter(box =>
        this.targets.some(target => target.x === box.x && target.y === box.y)
      ).length;

      // Afficher le score
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px Arial';
      ctx.fillText(`Boîtes placées: ${correctBoxes}/${this.boxes.length}`, 10, 30);

      // Afficher les instructions
      ctx.font = '16px Arial';
      ctx.fillText('Utilisez les flèches pour déplacer Mario', 10, 60);
      ctx.fillText('Poussez les boîtes marron sur les cibles dorées', 10, 80);

      if (this.checkWin()) {
        ctx.fillStyle = '#00FF00';
        ctx.font = '24px Arial';
        ctx.fillText('NIVEAU TERMINÉ !', 10, 120);
      }
    });
  }

  render() {
    gfx2Manager.beginRender();
    gfx2Manager.render();
    gfx2Manager.endRender();
  }
}

export { MarioSokobanScreen };





