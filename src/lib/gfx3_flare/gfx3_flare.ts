import { gfx3Manager } from '../gfx3/gfx3_manager';
import { gfx3FlareRenderer } from './gfx3_flare_renderer';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_flare_shader';

/**
 * A flare drawable object.
 */
class Gfx3Flare extends Gfx3Drawable {
  textureChanged: boolean;
  size2D: vec2;
  position2D: vec2;
  scale2D: vec2;
  rotation2D: number;
  offset2D: vec2;
  color: vec4;
  grp2: Gfx3StaticGroup;
  texture: Gfx3Texture;

  constructor() {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.textureChanged = false;
    this.size2D = [0, 0];
    this.position2D = [0.0, 0.0];
    this.scale2D = [1.0, 1.0];
    this.rotation2D = 0;
    this.offset2D = [0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.grp2 = gfx3Manager.createStaticGroup('FLARE_PIPELINE', 2);
    this.texture = this.grp2.setTexture(0, 'TEXTURE', gfx3Manager.createTextureFromBitmap());

    this.beginVertices(6);
    this.defineVertex(0.0, 0.0, 0.0, 0.0);
    this.defineVertex(1.0, 0.0, 1.0, 0.0);
    this.defineVertex(0.0, 1.0, 0.0, 1.0);
    this.defineVertex(0.0, 1.0, 0.0, 1.0);
    this.defineVertex(1.0, 0.0, 1.0, 0.0);
    this.defineVertex(1.0, 1.0, 1.0, 1.0);
    this.endVertices();

    this.grp2.allocate();
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp2.delete();
    super.delete();
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3FlareRenderer.drawFlare(this);
  }

  /**
   * Set the position in screen coordinates.
   * Top-left corner is at coordinates 0;0.
   * 
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   */
  setPosition2D(x: number, y: number): void {
    this.position2D[0] = x;
    this.position2D[1] = y;
  }

  /**
   * Returns the position in screen coordinates.
   * Top-left corner is at coordinates 0;0.
   */
  getPosition2D(): vec2 {
    return this.position2D;
  }

  /**
   * Set the scale with the given x and y factors.
   * 
   * @param {number} x - The x factor in the x-axis direction.
   * @param {number} y - The y factor in the y-axis direction.
   */
  setScale2D(x: number, y: number): void {
    this.scale2D[0] = x;
    this.scale2D[1] = y;
  }

  /**
   * Returns the scale.
   */
  getScale2D(): vec2 {
    return this.scale2D;
  }

  /**
   * Set the rotation angle (in radians).
   * 
   * @param {number} angle - The rotation angle in radians.
   */
  setRotation2D(angle: number): void {
    this.rotation2D = angle;
  }

  /**
   * Returns the rotation angle (in radians).
   */
  getRotation2D(): number {
    return this.rotation2D;
  }

  /**
   * Set the origin offset in pixel.
   * Default origin is top-left corner. Ex: An offset of 10;10 set the origin of the flare to 10;10.
   * 
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   */
  setOffset2D(x: number, y: number): void {
    this.offset2D[0] = -x;
    this.offset2D[1] = -y;
  }

  /**
   * Returns the origin offset in pixel.
   */
  getOffset2D(): vec2 {
    return this.offset2D;
  }

  /**
   * Set the color blend (from 0 to 1).
   * 
   * @param {number} r - The parameter "r" represents the red component.
   * @param {number} g - The parameter "g" represents the green component.
   * @param {number} b - The parameter "b" represents the blue component.
   * @param {number} a - The parameter "a" represents the alpha value.
   */
  setColor(r: number, g: number, b: number, a: number): void {
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
    this.color[3] = a;
  }

  /**
   * Returns the color blend.
   */
  getColor(): vec4 {
    return this.color;
  }

  /**
   * Set the texture.
   * 
   * @param {Gfx3Texture} texture - The texture of the flare.
   */
  setTexture(texture: Gfx3Texture): void {
    this.texture = texture;
    this.size2D[0] = texture.gpuTexture.width;
    this.size2D[1] = texture.gpuTexture.height;
    this.textureChanged = true;
  }

  /**
   * Returns the texture.
   */
  getTexture(): Gfx3Texture {
    return this.texture;
  }

  /**
   * Returns the size in pixels.
   */
  getSize2D(): vec2 {
    return this.size2D;
  }

  /**
   * Set the size in pixels.
   * 
   * @param {number} w - The width of the flare.
   * @param {number} h - The height of the flare.
   */
  setSize2D(w: number, h: number): void {
    this.size2D[0] = w;
    this.size2D[1] = h;
  }

  /**
   * Returns the bindgroup(2).
   */
  getGroup02(): Gfx3StaticGroup {
    if (this.textureChanged) {
      this.grp2.setTexture(0, 'TEXTURE', this.texture);
      this.grp2.allocate();
      this.textureChanged = false;
    }

    return this.grp2;
  }
}

export { Gfx3Flare };