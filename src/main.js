import { coreManager } from '@lib/core/core_manager';
import { inputManager } from '@lib/input/input_manager';
import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3MeshShadowRenderer } from '@lib/gfx3_mesh/gfx3_mesh_shadow_renderer';
import { gfx3SpriteRenderer } from '@lib/gfx3_sprite/gfx3_sprite_renderer';
import { gfx3SkyboxRenderer } from '@lib/gfx3_skybox/gfx3_skybox_renderer';
import { gfx3FlareRenderer } from '@lib/gfx3_flare/gfx3_flare_renderer';
import { gfx3ParticlesRenderer } from '@lib/gfx3_particules/gfx3_particles_renderer';   
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { gfx3PostRenderer } from '@lib/gfx3_post/gfx3_post_renderer';
import { gfx3ShadowVolumeRenderer } from '@lib/gfx3_shadow_volume/gfx3_shadow_volume_renderer';
// ---------------------------------------------------------------------------------------
import { BootScreen } from './boot_screen';
// ---------------------------------------------------------------------------------------

const FPS = 60;
const MS_PER_FRAME = 1000 / FPS;
const FPS_FIXED = false;

class GameManager {
  constructor() {
    this.then = 0;
    this.elapsedTime = 0;
  }

  async startup() {
    coreManager.enableScanlines(true);
    gfx3DebugRenderer.setShowDebug(true);
    this.run(0);
  }

  run(timeStamp) {
    const ts = timeStamp - this.then;
    this.then = timeStamp;

    // update phase
    // if (this.elapsedTime > MS_PER_FRAME) {
      inputManager.update(ts);
      gfx2Manager.update(ts);
      uiManager.update(ts);
      screenManager.update(ts);
    // }

    // this.elapsedTime += ts;

    // draw phase
    gfx3Manager.beginDrawing();
    gfx2Manager.beginDrawing();
    screenManager.draw();
    gfx2Manager.endDrawing();
    gfx3Manager.endDrawing();

    // render phase
    gfx3Manager.beginRender();
    gfx3MeshShadowRenderer.render();
    gfx3ShadowVolumeRenderer.render();
    gfx3Manager.setDestinationTexture(gfx3PostRenderer.getSourceTexture());
    gfx3Manager.beginPassRender(0);
    gfx3SkyboxRenderer.render();
    gfx3DebugRenderer.render();
    gfx3MeshRenderer.render(ts);
    gfx3SpriteRenderer.render();
    gfx3ParticlesRenderer.render();
    gfx3FlareRenderer.render();
    gfx3Manager.endPassRender();
    gfx3PostRenderer.render(ts, gfx3Manager.getCurrentRenderingTexture());
    gfx3Manager.endRender();

    document.getElementById('fps').textContent = (1000 / ts).toFixed(2);
    document.getElementById('rt').textContent = (1000 / gfx3Manager.getLastRenderTime()).toFixed(2);

    requestAnimationFrame(timeStamp => this.run(timeStamp));
  }
}

export const gameManager = new GameManager();
gameManager.startup();
screenManager.requestSetScreen(new BootScreen());