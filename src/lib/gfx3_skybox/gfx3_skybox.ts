import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3SkyboxRenderer } from './gfx3_skybox_renderer';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_skybox_shader';

/**
 * The `Gfx3Skybox` class represents a skybox in a 3D graphics system.
 */
class Gfx3Skybox extends Gfx3Drawable {
  cubemapChanged: boolean;
  grp1: Gfx3StaticGroup;
  cubemap: Gfx3Texture;

  /**
   * The constructor.
   */
  constructor() {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.cubemapChanged = false;
    this.grp1 = gfx3Manager.createStaticGroup('SKYBOX_PIPELINE', 1);
    this.cubemap = this.grp1.setTexture(0, 'CUBEMAP_TEXTURE', gfx3Manager.createCubeMapFromBitmap(), { dimension: 'cube' });
    
    this.beginVertices(6);
    this.defineVertex(-1, -1, -1, -1, -1, -1);
    this.defineVertex(+1, -1, -1, -1, -1, +1);
    this.defineVertex(-1, +1, -1, +1, -1, +1);
    this.defineVertex(-1, +1, -1, -1, -1, -1);
    this.defineVertex(+1, -1, -1, +1, -1, +1);
    this.defineVertex(+1, +1, -1, +1, -1, -1);
    this.endVertices();

    this.grp1.allocate();
  }

  /**
   * The "delete" function free all resources.
   * Warning: you need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp1.destroy();
    super.delete();
  }

  /**
   * The "draw" function.
   */
  draw(): void {
    gfx3SkyboxRenderer.draw(this);
  }

  /**
   * The "setCubemap" function sets the cubemap texture.
   * @param {Gfx3Texture} cubemap - The cubemap texture.
   */
  setCubemap(cubemap: Gfx3Texture): void {
    this.cubemap = cubemap;
    this.cubemapChanged = true;
  }

  /**
   * The "getCubemap" function returns a cubemap texture.
   * @returns The cubemap texture.
   */
  getCubemap(): Gfx3Texture {
    return this.cubemap;
  }

  /**
   * The "getGroup01" function returns the static group index 1.
   * @returns The static group.
   */
  getGroup01(): Gfx3StaticGroup {
    if (this.cubemapChanged) {
      this.grp1.setTexture(0, 'CUBEMAP_TEXTURE', this.cubemap, { dimension: 'cube' });
      this.grp1.allocate();
      this.cubemapChanged = false;
    }

    return this.grp1;
  }
}

export { Gfx3Skybox };