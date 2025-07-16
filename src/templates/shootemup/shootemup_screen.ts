import { uiManager } from '@lib/ui/ui_manager';
import { inputManager } from '@lib/input/input_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { Screen } from '@lib/screen/screen';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { GameScreen } from './game_screen';
// ---------------------------------------------------------------------------------------

class ShootemupScreen extends Screen {
  startText: HTMLDivElement;
  bg: Gfx2SpriteJSS;

  constructor() {
    super();
    this.startText = document.createElement('div');
    this.bg = new Gfx2SpriteJSS();
  }

  async onEnter() {
    await gfx2TextureManager.loadTexture('./templates/shootemup/title.png');
    this.bg.setPosition(-300, -300);
    this.bg.setTexture(gfx2TextureManager.getTexture('./templates/shootemup/title.png'));

    this.startText.textContent = 'Press Enter to start.';
    uiManager.addNode(this.startText, 'display:flex; justify-content:center; align-items:center; margin-top:20px; margin-left:20px; margin-right:20px; font-size:14px;');
  }

  onExit() {
    gfx2TextureManager.releaseTextures();
    uiManager.removeNode(this.startText);
  }

  update(dt: number) {
    if (inputManager.isActiveAction('OK')) {
      screenManager.requestSetScreen(new GameScreen());
    }
  }

  draw() {
    this.bg.draw();
  }

  render() {
    gfx2Manager.beginRender();
    gfx2Manager.render();
    gfx2Manager.endRender();
  }
}

export { ShootemupScreen };