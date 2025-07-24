import Jolt from 'jolt-physics';
// ---------------------------------------------------------------------------------------
import { gfx3DebugRenderer } from '@lib/gfx3/gfx3_debug_renderer';
import { Gfx3Jolt } from '@lib/gfx3_physics/gfx3_physics_jolt';

export const drawShape = (shape: Jolt.Shape, matrix: Jolt.RMat44) => {
  let vertexCount = 0;
  const finalVertices = [];

  // Get triangle data
  const scale = new Gfx3Jolt.Vec3(1, 1, 1);
  const triContext = new Gfx3Jolt.ShapeGetTriangles(shape, Gfx3Jolt.AABox.prototype.sBiggest(), shape.GetCenterOfMass(), Gfx3Jolt.Quat.prototype.sIdentity(), scale);
  Gfx3Jolt.destroy(scale);

  // Get a view on the triangle data (does not make a copy)
  const vertices = new Float32Array(Gfx3Jolt.HEAPF32.buffer, triContext.GetVerticesData(), triContext.GetVerticesSize() / Float32Array.BYTES_PER_ELEMENT);

  // Now move the triangle data to a buffer and clone it so that we can free the memory from the C++ heap (which could be limited in size)
  for (let i = 0; i < vertices.length / 3; i += 3) {
    const v0 = [vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2]];
    const v1 = [vertices[i * 3 + 3], vertices[i * 3 + 4], vertices[i * 3 + 5]];
    const v2 = [vertices[i * 3 + 6], vertices[i * 3 + 7], vertices[i * 3 + 8]];

    finalVertices.push(...v0, 0, 1, 0);
    finalVertices.push(...v1, 0, 1, 0);

    finalVertices.push(...v1, 0, 1, 0);
    finalVertices.push(...v2, 0, 1, 0);

    finalVertices.push(...v2, 0, 1, 0);
    finalVertices.push(...v0, 0, 1, 0);
    vertexCount += 6;
  }

  Gfx3Jolt.destroy(triContext);

  gfx3DebugRenderer.drawVertices(finalVertices, vertexCount, [
    matrix.GetColumn4(0).GetX(), matrix.GetColumn4(0).GetY(), matrix.GetColumn4(0).GetZ(), matrix.GetColumn4(0).GetW(),
    matrix.GetColumn4(1).GetX(), matrix.GetColumn4(1).GetY(), matrix.GetColumn4(1).GetZ(), matrix.GetColumn4(1).GetW(),
    matrix.GetColumn4(2).GetX(), matrix.GetColumn4(2).GetY(), matrix.GetColumn4(2).GetZ(), matrix.GetColumn4(2).GetW(),
    matrix.GetColumn4(3).GetX(), matrix.GetColumn4(3).GetY(), matrix.GetColumn4(3).GetZ(), matrix.GetColumn4(3).GetW()
  ]);
}