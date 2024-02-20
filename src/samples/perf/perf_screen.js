import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { gfx3Manager } from '../../lib/gfx3/gfx3_manager';
import { gfx3MeshRenderer } from '../../lib/gfx3_mesh/gfx3_mesh_renderer';
import { UT } from '../../lib/core/utils';
import { Quaternion } from '../../lib/core/quaternion';
import { Screen } from '../../lib/screen/screen';
import { Gfx3Camera } from '../../lib/gfx3_camera/gfx3_camera';
import { SHADER_VERTEX_ATTR_COUNT } from '../../lib/gfx3_mesh/gfx3_mesh_shader';
import { Gfx3Mesh } from '../../lib/gfx3_mesh/gfx3_mesh';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;
const GRID_SPACE = 5;

class Transform {
  constructor(p = [0, 0, 0], a = [0, 0, 0], s = [0, 0, 0]) {
    this.p = p;
    this.a = a;
    this.s = s;
    this.q = new Quaternion();
    this.m = UT.MAT4_IDENTITY();
  }
}

class PerfScreen extends Screen {
  constructor() {
    super();
    this.camera = new Gfx3Camera(0);
    this.isDragging = false;
    this.dragStartPosition = [0, 0];
    this.dragStartRotation = [0, 0];
    this.mode = 1;
    this.colFac = 0;
    this.obj = null;
    this.bigMesh = null;
    this.skySphere = null;
    this.transformations = [];
    this.handleMouseDownCb = this.handleMouseDown.bind(this);
    this.handleMouseUpCb = this.handleMouseUp.bind(this);
    this.handleMouseMoveCb = this.handleMouseMove.bind(this);
    this.handleKeyUpCb = this.handleKeyUp.bind(this);
  }

  async onEnter() {
    const view = gfx3Manager.getView(0);
    view.setPerspectiveFar(700);
    view.setPerspectiveNear(0.1);
    this.camera.setPosition(0, 10, 0);

    this.skySphere = new Gfx3MeshJSM();
    await this.skySphere.loadFromFile('./samples/perf/sky_sphere.jsm');
    this.skySphere.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/perf/sky_sphere.jpg')
    }));

    this.obj = new Gfx3MeshJSM();
    await this.obj.loadFromFile('./samples/perf/cube.jsm');
    this.obj.setMaterial(new Gfx3Material({
      texture: await gfx3TextureManager.loadTexture('./samples/perf/cube.png'),
      lightning: true
    }));

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const mx = (x - GRID_WIDTH / 2) * GRID_SPACE;
        const my = (y - GRID_WIDTH / 2) * GRID_SPACE;

        const p = [mx, 0, my, 1];
        const a = [x, 0, y];
        const s = [1, 1, 1];

        this.transformations.push(new Transform(p, a, s));
      }
    }

    const bigMeshMatrices = this.transformations.map(t => UT.MAT4_TRANSFORM(t.p, t.a, t.s, t.q));
    this.bigMesh = DUPE(this.obj, bigMeshMatrices);

    document.addEventListener('mousedown', this.handleMouseDownCb);
    document.addEventListener('mouseup', this.handleMouseUpCb);
    document.addEventListener('mousemove', this.handleMouseMoveCb);
    document.addEventListener('keyup', this.handleKeyUpCb);
  }

  onExit() {
    document.removeEventListener('mousedown', this.handleMouseDownCb);
    document.removeEventListener('mouseup', this.handleMouseUpCb);
    document.removeEventListener('mousemove', this.handleMouseMoveCb);
  }

  update(ts) {
    const c1 = (Math.sin(this.colFac) + 1.0) * 0.5;
    const c2 = (Math.cos(this.colFac) + 1.0) * 0.5;
    this.obj.mat.setSpecular(c1, c2, 0);
    this.obj.mat.setDiffuse(0, c1, c2);

    const r = Math.PI * 2 * 4 / this.transformations.length;
    let n = 0;

    for (const t of this.transformations) {
      t.a[0] += ts / 500.0;
      t.a[2] += ts / 1000.0;
      t.p[1] = Math.sin(n + this.colFac) * 3;
      UT.MAT4_TRANSFORM(t.p, t.a, t.s, t.q, t.m);
      n += r;
    }

    this.colFac += ts * 0.003;
  }

  draw() {
    gfx3MeshRenderer.drawDirLight([0, -1, 0.2], [1, 1, 1], [0.8, 0.6, 0.4], [0.8, 0.6, 0.4]);
    this.skySphere.draw();

    if (this.mode == 0) {
      this.bigMesh.draw();
    }
    else {
      for (const t of this.transformations) {
        gfx3MeshRenderer.drawMesh(this.obj, t.m);
      }
    }
  }

  handleKeyUp(e) {
    if (e.code === 'KeyR') {
      this.mode = this.mode == 1 ? 0 : 1;
    }
  }

  handleMouseDown(e) {
    this.isDragging = true;
    this.dragStartPosition[0] = e.clientX;
    this.dragStartPosition[1] = e.clientY;
    this.dragStartRotation[0] = this.camera.getRotationX();
    this.dragStartRotation[1] = this.camera.getRotationY();
  }

  handleMouseUp() {
    this.isDragging = false;
  }

  handleMouseMove(e) {
    if (!this.isDragging) {
      return;
    }

    let newRotationX = this.dragStartRotation[0] + ((e.clientY - this.dragStartPosition[1]) * 0.001);
    let newRotationY = this.dragStartRotation[1] + ((e.clientX - this.dragStartPosition[0]) * 0.001);
    this.camera.setRotation(newRotationX, newRotationY, 0);
  }
}

export { PerfScreen };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function DUPE(mesh, matrices) {
  const outMesh = new Gfx3Mesh();
  const vertices = mesh.getVertices();

  outMesh.beginVertices(mesh.getVertexCount() * matrices.length);

  for (const matrix of matrices) {
    for (let i = 0; i < vertices.length; i += SHADER_VERTEX_ATTR_COUNT) {
      const v = UT.MAT4_MULTIPLY_BY_VEC4(matrix, UT.VEC4_CREATE(vertices[i + 0], vertices[i + 1], vertices[i + 2], 1.0));
      outMesh.defineVertex(v[0], v[1], v[2], vertices[i + 3], vertices[i + 4], vertices[i + 5], vertices[i + 6], vertices[i + 7], vertices[i + 8], vertices[i + 9], vertices[i + 10], vertices[i + 11], vertices[i + 12], vertices[i + 13], vertices[i + 14], vertices[i + 15], vertices[i + 16]);
    }
  }

  outMesh.endVertices();
  outMesh.setMaterial(mesh.getMaterial());
  return outMesh;
}