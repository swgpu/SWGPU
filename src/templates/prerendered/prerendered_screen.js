import { gfx3Manager } from '@lib/gfx3/gfx3_manager';
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { Room } from './room';

class PrerenderedScreen extends Screen {
  constructor(zBuffer = false) {
    super();
    this.zBuffer = zBuffer;
    this.room = new Room(zBuffer);
  }

  async onEnter() {
    if (this.zBuffer) {
      await this.room.loadFromFile('./templates/prerendered/zbuffer/scene.room', 'Spawn0000');
    }
    else {
      await this.room.loadFromFile('./templates/prerendered/scene.room', 'Spawn0000');
    }
  }

  update(ts) {
    this.room.update(ts);
  }

  draw() {
    gfx3Manager.beginDrawing();
    this.room.draw();
    gfx3Manager.endDrawing();
  }

  render(ts) {
    gfx3Manager.beginRender();
    gfx3Manager.beginPassRender(0);
    gfx3DebugRenderer.render();
    gfx3MeshRenderer.render(ts);
    gfx3Manager.endPassRender();
    gfx3Manager.endRender();
  }
}

export { PrerenderedScreen };