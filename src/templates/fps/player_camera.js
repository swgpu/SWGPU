import { uiManager } from '@lib/ui/ui_manager';
// ---------------------------------------------------------------------------------------

export class PlayerCamera {
  constructor(player, rec) {
    this.player = player;
    this.rec = rec;
    this.crosshair = document.createElement('img');
    this.crosshair.src = 'templates/fps/crosshair.png';
    uiManager.addNode(this.crosshair, 'position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);');
  }

  delete() {
    uiManager.removeNode(this.crosshair);
  }

  update(ts) {
    this.rec.setPosition(this.player.x, this.player.y + this.player.height / 2, this.player.z);
    this.rec.setRotation(this.player.rotation[0], this.player.rotation[1], this.player.rotation[2]);
  }
}