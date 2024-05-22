import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { UT } from '../core/utils';
import { Gfx3BoundingCylinder } from '../gfx3/gfx3_bounding_cylinder';
// ---------------------------------------------------------------------------------------

class Gfx3PhysicsJTR {
  position: vec3;
  type: string;
  radius: number;
  height: number;
  onEnterBlockId: string;
  onLeaveBlockId: string;
  onActionBlockId: string;
  boundingCylinder: Gfx3BoundingCylinder;
  hovered: boolean;

  constructor() {
    this.position = [0, 0, 0];
    this.type = '';
    this.radius = 0;
    this.height = 0;
    this.onEnterBlockId = '';
    this.onLeaveBlockId = '';
    this.onActionBlockId = '';
    this.boundingCylinder = new Gfx3BoundingCylinder();
    this.hovered = false;
  }

  /**
   * Load asynchronously trigger data from a json file (jtr).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JTR') {
      throw new Error('Gfx3PhysicsJTR::loadFromFile(): File not valid !');
    }

    this.position = json['Position'];
    this.type = json['Type'];
    this.radius = json['Radius'];
    this.height = json['Height'];
    this.onEnterBlockId = json['OnEnterBlockId'];
    this.onLeaveBlockId = json['OnLeaveBlockId'];
    this.onActionBlockId = json['OnActionBlockId'];

    this.boundingCylinder = Gfx3BoundingCylinder.createFromCenter(
      this.position[0],
      this.position[1],
      this.position[2],
      this.height,
      this.radius
    );

    this.hovered = false;
  }

  /**
   * The draw function.
   */
  draw() {
    const matrix = UT.MAT4_TRANSLATE(this.position[0], this.position[1], this.position[2]);
    gfx3DebugRenderer.drawCylinder(matrix, this.radius, this.height, 5, true);
  }

  /**
   * Set the position with the given x, y and z coordinates.
   * 
   * @param {number} x - The X coordinate of the position.
   * @param {number} y - The Y coordinate of the position.
   * @param {number} z - The Z coordinate of the position.
   */
  setPosition(x: number, y: number, z: number): void {
    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;
    this.boundingCylinder.setPosition(x, y, z);
  }

  /**
   * Set triggered block id on enter.
   * 
   * @param {string} blockId - The script blockId.
   */
  setOnEnterBlockId(blockId: string): void {
    this.onEnterBlockId = blockId;
  }

  /**
   * Set triggered block id on leave.
   * 
   * @param {string} blockId - The script blockId.
   */
  setOnLeaveBlockId(blockId: string): void {
    this.onLeaveBlockId = blockId;
  }

  /**
   * Set triggered block id on action.
   * 
   * @param {string} blockId - The script blockId.
   */
  setOnActionBlockId(blockId: string): void {
    this.onActionBlockId = blockId;
  }

  /**
   * Set hovered flag.
   * 
   * @param {boolean} hovered - The flag.
   */
  setHovered(hovered: boolean): void {
    this.hovered = hovered;
  }

  /**
   * Returns the type.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Returns the enter block id.
   */
  getOnEnterBlockId(): string {
    return this.onEnterBlockId;
  }

  /**
   * Returns the leave block id.
   */
  getOnLeaveBlockId(): string {
    return this.onLeaveBlockId;
  }

  /**
   * Returns the action block id.
   */
  getOnActionBlockId(): string {
    return this.onActionBlockId;
  }

  /**
   * Returns the bounding cylinder.
   */
  getBoundingCylinder(): Gfx3BoundingCylinder {
    return this.boundingCylinder;
  }

  /**
   * Returns the hovered flag.
   */
  isHovered(): boolean {
    return this.hovered;
  }

  get cylinder(): Gfx3BoundingCylinder {
    return this.boundingCylinder;
  }
}

export { Gfx3PhysicsJTR };