import { eventManager } from '../core/event_manager';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Mesh } from './gfx3_mesh';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_mesh_shader';

interface JAMFrame {
  vertices: Array<number>;
};

interface JAMAnimation {
  name: String;
  startFrame: number;
  endFrame: number;
  frameDuration: number;
};

/**
 * A 3D animated mesh.
 */
class Gfx3MeshJAM extends Gfx3Mesh {
  numVertices: number;
  frames: Array<JAMFrame>;
  animations: Array<JAMAnimation>;
  interpolationEnabled: boolean;
  looped: boolean;
  currentAnimation: JAMAnimation | null;
  currentFrameIndex: number;
  frameProgress: number;
  boundingBoxes: Array<Gfx3BoundingBox>;

  constructor() {
    super();
    this.numVertices = 0;
    this.frames = [];
    this.animations = [];
    this.interpolationEnabled = true;
    this.looped = true;
    this.currentAnimation = null;
    this.currentFrameIndex = 0;
    this.frameProgress = 0;
    this.boundingBoxes = [];
  }

  /**
   * Load asynchronously animated mesh data from a json file (jam).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JAM') {
      throw new Error('Gfx3MeshJAM::loadFromFile(): File not valid !');
    }

    this.frames = [];
    for (const obj of json['Frames']) {
      const vertices = obj['Vertices'] ?? json['Vertices'];
      const textureCoords = obj['TextureCoords'] ?? json['TextureCoords'];
      const colors = obj['Colors'] ?? json['Colors'];
      const normals = obj['Normals'] ?? json['Normals'];
      this.frames.push({
        vertices: Gfx3Mesh.buildVertices(json['NumVertices'], vertices, textureCoords, colors, normals)
      });

      const aabb = new Gfx3BoundingBox();
      aabb.fromVertices(vertices, 3);
      this.boundingBoxes.push(aabb);
    }

    this.boundingBoxes = [];
    for (const obj of json['Frames']) {
      const vertices = obj['Vertices'] ?? json['Vertices'];
      const aabb = new Gfx3BoundingBox();
      aabb.fromVertices(vertices, 3);
      this.boundingBoxes.push(aabb);
    }

    this.animations = [];
    for (const obj of json['Animations']) {
      this.animations.push({
        name: obj['Name'],
        startFrame: parseInt(obj['StartFrame']),
        endFrame: parseInt(obj['EndFrame']),
        frameDuration: parseInt(obj['FrameDuration'])
      });
    }

    this.numVertices = json['NumVertices'];
    this.currentAnimation = null;
    this.interpolationEnabled = true;
    this.looped = true;
    this.currentFrameIndex = 0;
    this.frameProgress = 0;
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    if (!this.currentAnimation) {
      return;
    }

    const interpolateFactor = this.frameProgress / this.currentAnimation.frameDuration;
    let nextFrameIndex = 0;

    if (this.currentFrameIndex == this.currentAnimation.endFrame) {
      eventManager.emit(this, 'E_FINISHED');
      nextFrameIndex = this.looped ? this.currentAnimation.startFrame : this.currentAnimation.endFrame;
    }
    else {
      nextFrameIndex = this.currentFrameIndex + 1;
    }

    this.beginVertices(this.numVertices);
    const currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[nextFrameIndex];

    for (let i = 0; i < this.numVertices; i++) {
      const vax = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 0];
      const vay = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 1];
      const vaz = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 2];

      const tu = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 3];
      const tv = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 4];

      const car = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 5];
      const cag = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 6];
      const cab = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 7];

      const nax = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 8];
      const nay = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 9];
      const naz = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 10];

      const tax = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 11];
      const tay = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 12];
      const taz = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 13];

      const bax = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 14];
      const bay = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 15];
      const baz = currentFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 16];

      if (this.interpolationEnabled) {
        const vbx = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 0];
        const vby = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 1];
        const vbz = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 2];
        const vix = vax + ((vbx - vax) * interpolateFactor);
        const viy = vay + ((vby - vay) * interpolateFactor);
        const viz = vaz + ((vbz - vaz) * interpolateFactor);

        const cbr = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 5];
        const cbg = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 6];
        const cbb = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 7];
        const cir = car + ((cbr - car) * interpolateFactor);
        const cig = cag + ((cbg - cag) * interpolateFactor);
        const cib = cab + ((cbb - cab) * interpolateFactor);
  
        const nbx = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 8];
        const nby = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 9];
        const nbz = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 10];
        const nix = nax + ((nbx - nax) * interpolateFactor);
        const niy = nay + ((nby - nay) * interpolateFactor);
        const niz = naz + ((nbz - naz) * interpolateFactor);

        const tbx = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 11];
        const tby = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 12];
        const tbz = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 13];
        const tix = tax + ((tbx - tax) * interpolateFactor);
        const tiy = tay + ((tby - tay) * interpolateFactor);
        const tiz = taz + ((tbz - taz) * interpolateFactor);

        const bbx = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 14];
        const bby = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 15];
        const bbz = nextFrame.vertices[i * SHADER_VERTEX_ATTR_COUNT + 16];
        const bix = tax + ((bbx - bax) * interpolateFactor);
        const biy = tay + ((bby - bay) * interpolateFactor);
        const biz = taz + ((bbz - baz) * interpolateFactor);
  
        this.defineVertex(vix, viy, viz, tu, tv, cir, cig, cib, nix, niy, niz, tix, tiy, tiz, bix, biy, biz);
      }
      else {
        this.defineVertex(vax, vay, vaz, tu, tv, car, cag, cab, nax, nay, naz, tax, tay, taz, bax, bay, baz);
      }
    }

    this.endVertices(false);

    if (interpolateFactor >= 1) {
      this.currentFrameIndex = nextFrameIndex;
      this.frameProgress = 0;
    }
    else {
      this.frameProgress += ts;
    }

    super.update(ts);
  }

  /**
   * Play a specific animation.
   * 
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
   * @param {boolean} [interpolationEnabled=true] - Determines whether the animation interpolation is enabled or not.
   */
  play(animationName: string, looped: boolean = false, preventSameAnimation: boolean = false, interpolationEnabled: boolean = true): void {
    if (preventSameAnimation && this.currentAnimation && this.currentAnimation.name == animationName) {
      return;
    }

    const animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Gfx3MeshJAM::play: animation not found !');
    }

    this.currentAnimation = animation;
    this.interpolationEnabled = interpolationEnabled;
    this.looped = looped;
    this.currentFrameIndex = animation.startFrame;
    this.frameProgress = 0;
  }

  /**
   * Check if interpolation is enabled.
   */
  getInterpolationEnabled(): boolean {
    return this.interpolationEnabled;
  }

  /**
   * Check if animation is looped.
   */
  getLooped(): boolean {
    return this.looped;
  }

  /**
   * Returns the current animation or null if there is no current animation.
   */
  getCurrentAnimation(): JAMAnimation | null {
    return this.currentAnimation;
  }

  /**
   * Returns the current frame index.
   */
  getCurrentFrameIndex(): number {
    return this.currentFrameIndex;
  }

  /**
   * Returns the current frame progress.
   */
  getFrameProgress(): number {
    return this.frameProgress;
  }

  /**
   * Returns the bounding box.
   */
  getBoundingBox(): Gfx3BoundingBox {
    return this.boundingBoxes[this.currentFrameIndex];
  }

  /**
   * Returns the bounding box in the world space coordinates.
   */
  getWorldBoundingBox(): Gfx3BoundingBox {
    return this.boundingBoxes[this.currentFrameIndex].transform(this.getTransformMatrix());
  }
}

export { Gfx3MeshJAM };