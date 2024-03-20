import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { Gfx3RendererAbstract } from './gfx3_renderer_abstract';
import { Gfx3DynamicGroup } from '../gfx3/gfx3_group';
import { PIPELINE_DESC, VERTEX_SHADER, FRAGMENT_SHADER, SHADER_VERTEX_ATTR_COUNT } from './gfx3_debug_shader';

interface Command {
  vertices: Float32Array;
  vertexCount: number;
  matrix: mat4;
};

/**
 * Singleton debug renderer.
 */
class Gfx3DebugRenderer extends Gfx3RendererAbstract {
  device: GPUDevice;
  vertexBuffer: GPUBuffer;
  vertexCount: number;
  commands: Array<Command>;
  showDebug: boolean;
  grp0: Gfx3DynamicGroup;
  mvpcMatrix: Float32Array;

  constructor() {
    super('DEBUG_PIPELINE', VERTEX_SHADER, FRAGMENT_SHADER, PIPELINE_DESC);
    this.device = gfx3Manager.getDevice();
    this.vertexBuffer = this.device.createBuffer({ size: 0, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });
    this.vertexCount = 0;
    this.commands = [];
    this.showDebug = false;
    this.grp0 = gfx3Manager.createDynamicGroup('DEBUG_PIPELINE', 0);
    this.mvpcMatrix = this.grp0.setFloat(0, 'MVPC_MATRIX', 16);
    this.grp0.allocate();
  }

  /**
   * The render function.
   */
  render(): void {
    if (!this.showDebug) {
      return;
    }

    const currentView = gfx3Manager.getCurrentView();
    const passEncoder = gfx3Manager.getPassEncoder();
    const vpcMatrix = currentView.getViewProjectionClipMatrix();
    passEncoder.setPipeline(this.pipeline);

    this.vertexBuffer.destroy();
    this.vertexBuffer = this.device.createBuffer({ size: this.vertexCount * SHADER_VERTEX_ATTR_COUNT * 4, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC });    
    
    this.grp0.allocate(this.commands.length);
    this.grp0.beginWrite();

    for (let i = 0, offset = 0; i < this.commands.length; i++) {
      const cmd = this.commands[i];
      this.grp0.write(0, UT.MAT4_MULTIPLY(vpcMatrix, cmd.matrix, this.mvpcMatrix) as Float32Array);
      passEncoder.setBindGroup(0, this.grp0.getBindGroup(i));

      this.device.queue.writeBuffer(this.vertexBuffer, offset, cmd.vertices);
      passEncoder.setVertexBuffer(0, this.vertexBuffer, offset, cmd.vertices.byteLength);
      passEncoder.draw(cmd.vertexCount);
      offset += cmd.vertices.byteLength;
    }

    this.grp0.endWrite();

    this.commands = [];
    this.vertexCount = 0;
  }

  /**
   * Draw a set of vertices in line-list topology.
   * 
   * @param vertices - A list of vertices.
   * @param {number} vertexCount - The number of vertices.
   * @param {mat4} matrix - The transformation matrix.
   */
  drawVertices(vertices: Array<number>, vertexCount: number, matrix: mat4): void {
    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe cylinder.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {number} radius - The radius of the cylinder.
   * @param {number} height - The height of the cylinder.
   * @param {number} step - The number of divisions or segments in the cylinder.
   * @param {boolean} closed - Indicating whether the cylinder should be closed or not.
   * @param {vec3} color - The color of the cylinder.
   */
  drawCylinder(matrix: mat4, radius: number, height: number, step: number, closed: boolean, color: vec3 = [1, 1, 1]): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const angleStep = (Math.PI * 2) / step;
    const cbx = 0;
    const cby = 0;
    const cbz = 0;
    const ctx = 0;
    const cty = height;
    const ctz = 0;

    for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
      const b1x = radius * Math.cos(angle);
      const b1y = 0;
      const b1z = radius * Math.sin(angle) * -1;

      const b2x = radius * Math.cos(angle + angleStep);
      const b2y = 0;
      const b2z = radius * Math.sin(angle + angleStep) * -1;

      const t1x = radius * Math.cos(angle);
      const t1y = height;
      const t1z = radius * Math.sin(angle) * -1;

      const t2x = radius * Math.cos(angle + angleStep);
      const t2y = height;
      const t2z = radius * Math.sin(angle + angleStep) * -1;

      vertices.push(b1x, b1y, b1z, color[0], color[1], color[2]);
      vertices.push(t1x, t1y, t1z, color[0], color[1], color[2]);
      vertices.push(b1x, b1y, b1z, color[0], color[1], color[2]);
      vertices.push(b2x, b2y, b2z, color[0], color[1], color[2]);
      vertices.push(t1x, t1y, t1z, color[0], color[1], color[2]);
      vertices.push(t2x, t2y, t2z, color[0], color[1], color[2]);
      vertexCount += 6;

      if (closed) {
        vertices.push(cbx, cby, cbz, color[0], color[1], color[2]);
        vertices.push(b1x, b1y, b1z, color[0], color[1], color[2]);
        vertices.push(ctx, cty, ctz, color[0], color[1], color[2]);
        vertices.push(t1x, t1y, t1z, color[0], color[1], color[2]);
        vertexCount += 4;
      }
    }

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe grid.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {number} [extend=3] - The number of cells in each direction from the center of the grid.
   * For example, if `extend` is set to 3, then there will be 7 cells in each direction (total of 49 cells).
   * @param {number} [spacing=1] - The distance between each grid line.
   * @param {vec3} color - The color of the grid.
   */
  drawGrid(matrix: mat4, extend: number = 3, spacing: number = 1, color: vec3 = [1, 1, 1]): void {
    let vertexCount: number = 0;
    const vertices: Array<number> = [];
    const nbCells = extend * 2;
    const gridSize = nbCells * spacing;
    const left = -gridSize * 0.5;
    const top = -gridSize * 0.5;

    for (let i = 0; i <= nbCells; i++) {
      const vLineFromX = left + (i * spacing);
      const vLineFromY = top;
      const vLineFromZ = 0;
      const vLineDestX = left + (i * spacing);
      const vLineDestY = top + gridSize;
      const vLineDestZ = 0;
      const hLineFromX = left;
      const hLineFromY = top + (i * spacing);
      const hLineFromZ = 0;
      const hLineDestX = left + gridSize;
      const hLineDestY = top + (i * spacing);
      const hLineDestZ = 0;
      vertices.push(vLineFromX, vLineFromY, vLineFromZ, color[0], color[1], color[2]);
      vertices.push(vLineDestX, vLineDestY, vLineDestZ, color[0], color[1], color[2]);
      vertices.push(hLineFromX, hLineFromY, hLineFromZ, color[0], color[1], color[2]);
      vertices.push(hLineDestX, hLineDestY, hLineDestZ, color[0], color[1], color[2]);
      vertexCount += 4;
    }

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a gizmo.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {number} [size=1] - The length of each axis of the gizmo.
   */
  drawGizmo(matrix: mat4, size: number = 1): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const axes = [[1 * size, 0, 0], [0, 1 * size, 0], [0, 0, 1 * size]];
    const colors = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

    for (let i = 0; i < axes.length; i++) {
      vertices.push(0, 0, 0, colors[i][0], colors[i][1], colors[i][2]);
      vertices.push(axes[i][0], axes[i][1], axes[i][2], colors[i][0], colors[i][1], colors[i][2]);
      vertexCount += 2;
    }

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe circle.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {number} [radius=1] - The radius of the circle that will be drawn.
   * @param {number} [step=4] - The level of detail or smoothness of the circle.
   * @param {vec3} color - The color of the circle.
   */
  drawCircle(matrix: mat4, radius: number = 1, step: number = 4, color: vec3 = [1, 1, 1]): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const angleStep = (Math.PI * 2) / step;

    for (let i = 0; i < step; i++) {
      const x1 = Math.cos(i * angleStep) * radius;
      const y1 = Math.sin(i * angleStep) * radius;
      const z1 = 0;
      const x2 = Math.cos((i + 1) * angleStep) * radius;
      const y2 = Math.sin((i + 1) * angleStep) * radius;
      const z2 = 0;

      vertices.push(x1, y1, z1, color[0], color[1], color[2]);
      vertices.push(x2, y2, z2, color[0], color[1], color[2]);
      vertexCount += 2;
    }

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe rectangle.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {vec2} min - The minimum point of the bounding rectangle.
   * @param {vec2} max - The maximum point of the bounding rectangle.
   * @param {vec3} color - The color of the bounding rectangle.
   */
  drawBoundingRect(matrix: mat4, min: vec2, max: vec2, color: vec3 = [1, 1, 1]): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const a = [min[0], min[1], 0];
    const b = [min[0], max[1], 0];
    const c = [max[0], min[1], 0];
    const d = [max[0], max[1], 0];

    vertices.push(a[0], a[1], a[2], color[0], color[1], color[2]);
    vertices.push(b[0], b[1], b[2], color[0], color[1], color[2]);
    vertexCount += 2;

    vertices.push(b[0], b[1], b[2], color[0], color[1], color[2]);
    vertices.push(d[0], d[1], d[2], color[0], color[1], color[2]);
    vertexCount += 2;

    vertices.push(d[0], d[1], d[2], color[0], color[1], color[2]);
    vertices.push(c[0], c[1], c[2], color[0], color[1], color[2]);
    vertexCount += 2;

    vertices.push(c[0], c[1], c[2], color[0], color[1], color[2]);
    vertices.push(a[0], a[1], a[2], color[0], color[1], color[2]);
    vertexCount += 2;

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe sphere.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {number} [radius=1] - The radius of the sphere.
   * @param {number} [step=4] - The level of detail or smoothness of the sphere.
   * @param {vec3} color - The color of sphere.
   */
  drawSphere(matrix: mat4, radius: number = 1, step: number = 4, color: vec3 = [1, 1, 1]): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const points: Array<[number, number, number]> = [];
    const angleStep = (Math.PI * 0.5) / step;

    for (let i = -step; i <= step; i++) {
      const r = Math.cos(i * angleStep) * radius;
      const y = Math.sin(i * angleStep) * radius;
      for (let j = 0; j <= step * 4; j++) {
        const z = Math.sin(j * angleStep) * r;
        const x = Math.cos(j * angleStep) * r;
        points.push([x, y, z]);
      }
    }

    for (let i = -step; i <= step; i++) {
      for (let j = 0; j <= step * 4; j++) {
        const x = Math.cos(j * angleStep) * radius * Math.cos(i * angleStep);
        const y = Math.sin(j * angleStep) * radius;
        const z = Math.cos(j * angleStep) * radius * Math.sin(i * angleStep);
        points.push([x, y, z]);
      }
    }

    for (let i = 0; i < points.length - 1; i++) {
      vertices.push(points[i][0], points[i][1], points[i][2], color[0], color[1], color[2]);
      vertices.push(points[i + 1][0], points[i + 1][1], points[i + 1][2], color[0], color[1], color[2]);
      vertexCount += 2;
    }

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Draw a wireframe bounding box.
   * 
   * @param {mat4} matrix - The transformation matrix.
   * @param {vec3} min - The minimum point of the bounding box.
   * @param {vec3} max - The maximum point of the bounding box.
   * @param {vec3} color - The color of the bounding box.
   */
  drawBoundingBox(matrix: mat4, min: vec3, max: vec3, color: vec3 = [1, 1, 1]): void {
    let vertexCount = 0;
    const vertices: Array<number> = [];
    const a = [min[0], min[1], min[2]];
    const b = [max[0], min[1], min[2]];
    const c = [max[0], max[1], min[2]];
    const d = [min[0], max[1], min[2]];
    const e = [min[0], max[1], max[2]];
    const f = [max[0], max[1], max[2]];
    const g = [max[0], min[1], max[2]];
    const h = [min[0], min[1], max[2]];

    vertices.push(a[0], a[1], a[2], color[0], color[1], color[2]);
    vertices.push(b[0], b[1], b[2], color[0], color[1], color[2]);
    vertices.push(h[0], h[1], h[2], color[0], color[1], color[2]);
    vertices.push(g[0], g[1], g[2], color[0], color[1], color[2]);
    vertexCount += 4;

    vertices.push(d[0], d[1], d[2], color[0], color[1], color[2]);
    vertices.push(c[0], c[1], c[2], color[0], color[1], color[2]);
    vertices.push(e[0], e[1], e[2], color[0], color[1], color[2]);
    vertices.push(f[0], f[1], f[2], color[0], color[1], color[2]);
    vertexCount += 4;

    vertices.push(a[0], a[1], a[2], color[0], color[1], color[2]);
    vertices.push(d[0], d[1], d[2], color[0], color[1], color[2]);
    vertices.push(h[0], h[1], h[2], color[0], color[1], color[2]);
    vertices.push(e[0], e[1], e[2], color[0], color[1], color[2]);
    vertexCount += 4;

    vertices.push(b[0], b[1], b[2], color[0], color[1], color[2]);
    vertices.push(c[0], c[1], c[2], color[0], color[1], color[2]);
    vertices.push(g[0], g[1], g[2], color[0], color[1], color[2]);
    vertices.push(f[0], f[1], f[2], color[0], color[1], color[2]);
    vertexCount += 4;

    vertices.push(d[0], d[1], d[2], color[0], color[1], color[2]);
    vertices.push(e[0], e[1], e[2], color[0], color[1], color[2]);
    vertices.push(c[0], c[1], c[2], color[0], color[1], color[2]);
    vertices.push(f[0], f[1], f[2], color[0], color[1], color[2]);
    vertexCount += 4;

    vertices.push(a[0], a[1], a[2], color[0], color[1], color[2]);
    vertices.push(h[0], h[1], h[2], color[0], color[1], color[2]);
    vertices.push(b[0], b[1], b[2], color[0], color[1], color[2]);
    vertices.push(g[0], g[1], g[2], color[0], color[1], color[2]);
    vertexCount += 4;

    this.commands.push({
      vertices: new Float32Array(vertices),
      vertexCount: vertexCount,
      matrix: matrix
    });

    this.vertexCount += vertexCount;
  }

  /**
   * Check if debug display is enabled.
   */
  isShowDebug(): boolean {
    return this.showDebug;
  }

  /**
   * Set the show debug flag.
   * 
   * @param {boolean} showDebug - The showDebug flag.
   */
  setShowDebug(showDebug: boolean): void {
    this.showDebug = showDebug;
  }
}

export { Gfx3DebugRenderer };
export const gfx3DebugRenderer = new Gfx3DebugRenderer();