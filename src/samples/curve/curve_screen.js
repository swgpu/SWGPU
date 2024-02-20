import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3DebugRenderer } from '../../lib/gfx3/gfx3_debug_renderer';
import { Curve } from '../../lib/core/curve';
import { UT } from '../../lib/core/utils';
import { Screen } from '../../lib/screen/screen';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { Gfx3MeshOBJ } from '../../lib/gfx3_mesh/gfx3_mesh_obj';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class CurveScreen extends Screen {
  constructor() {
    super();
    this.obj = null;
    this.skySphere = null;
    this.lookAtTween = null;
    this.camera = new Gfx3Camera(0);
    this.curveInterpolator = null;
    this.curveVertices = [];
    this.curveVertexCount = 0;
    this.t = 0.1;
  }

  async onEnter() {
    this.obj = new Gfx3MeshOBJ();
    await this.obj.loadFromFile('./samples/curve/level.obj', './samples/curve/level.mtl');

    this.skySphere = new Gfx3MeshJSM();
    await this.skySphere.loadFromFile('./samples/curve/sky_sphere.jsm');
    this.skySphere.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/curve/sky_sphere.jpg')
    }));

    this.curveInterpolator = await Curve.createInterpolatorFromFile('./samples/curve/curve.json');

    for (let t = 0; t <= 0.99; t += 0.01) {
      const p0 = this.curveInterpolator.getPointAt(t);
      const p1 = this.curveInterpolator.getPointAt(t + 0.01);
      this.curveVertices.push(p0[0], p0[1], p0[2], 1, 1, 1);
      this.curveVertices.push(p1[0], p1[1], p1[2], 1, 1, 1);
      this.curveVertexCount += 2;
    }
  }

  update(ts) {
    this.obj.update(ts);
    this.skySphere.update(ts);

    if (this.t < 0.99) {
      const position = this.curveInterpolator.getPointAt(this.t);
      const tangent = UT.VEC3_NORMALIZE(this.curveInterpolator.getTangentAt(this.t));
      this.camera.setPosition(position[0], position[1] + 0.1, position[2]);
      this.camera.lookAt(position[0] + tangent[0], position[1] + tangent[1], position[2] + tangent[2]);
      this.t += ts / 10000;
    }
  }

  draw() {
    gfx3DebugRenderer.drawVertices(this.curveVertices, this.curveVertexCount, UT.MAT4_IDENTITY());
    gfx3MeshRenderer.drawDirLight([0, -1, 0], [1, 1, 1], [1, 1, 1], [0, 0, 0]);
    this.obj.draw();
    this.skySphere.draw();
  }
}

export { CurveScreen };