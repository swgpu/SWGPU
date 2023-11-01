import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { TweenVEC3 } from '../../lib/core/tween';
import { Screen } from '../../lib/screen/screen';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3MeshOBJ } from '../../lib/gfx3_mesh/gfx3_mesh_obj';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

const CAMERA_POINTS = [
  [24, 1, -14],
  [24, 1, -14],
  [17, 1, -14],
  [12, 1, -10],
  [16, 1, -6],
  [19, 1, -1],
  [17, 1,  6],
  [13, 1, 10],
  [9,  1, 10],
  [9,  1, 10],
];

class CurveScreen extends Screen {
  constructor() {
    super();
    this.obj = null;
    this.skySphere = null;
    this.lookAtTween = null;
    this.camera = new Gfx3Camera(0);
    this.t = 0;
  }

  async onEnter() {
    gfx3MeshRenderer.enableDirLight(true, [0, -1, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]);

    this.obj = new Gfx3MeshOBJ();
    await this.obj.loadFromFile('./samples/curve/level.obj', './samples/curve/level.mtl');

    this.skySphere = new Gfx3MeshJSM();
    await this.skySphere.loadFromFile('./samples/curve/sky_sphere.jsm');
    this.skySphere.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/curve/sky_sphere.jpg')
    }));

    this.lookAtTween = new TweenVEC3([0, CAMERA_POINTS.length - 3], [[0, 0, 0], [-10, 0, 18]]);
  }

  update(ts) {
    this.obj.update(ts);
    this.skySphere.update(ts);

    if (this.t <= CAMERA_POINTS.length - 3) {
      const position = UT.CATMULL_ROM_VEC3(CAMERA_POINTS, this.t);
      this.camera.setPosition(position[0], position[1], position[2]);
      this.t += ts / 1000;
    }

    const target = this.lookAtTween.interpolate(this.t);
    this.camera.lookAt(target[0], target[1], target[2]);
  }

  draw() {
    this.obj.draw();
    this.skySphere.draw();
  }
}

export { CurveScreen };