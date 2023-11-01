import { eventManager } from '../core/event_manager';
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
 * The `Gfx3MeshJAM` class is a subclass of `Gfx3Mesh` that represents an animated mesh and provides
 * methods for loading, updating, and playing animations.
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

  /**
   * The constructor.
   */
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
  }

  /**
   * The "loadFromFile" function asynchronously loads animated mesh data from a json file (jam).
   * @param {string} path - The `path` parameter is the file path.
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
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
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

    this.endVertices();

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
   * The "play" function is used to start playing a specific animation, with options for looping and
   * preventing the same animation from being played again.
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - The `looped` parameter is a boolean that determines whether
   * the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - The `preventSameAnimation` parameter is a boolean
   * flag that determines whether the same animation should be prevented from playing again.
   * @param {boolean} [interpolationEnabled=true] - The `ìnterpolationEnabled` is a boolean that determines
   * whether the animation interpolation is enabled or not.
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
   * The "getInterpolationEnabled" function returns the value of the interpolationEnabled property.
   * @returns The `interpolationEnabled` property.
   */
  getInterpolationEnabled(): boolean {
    return this.interpolationEnabled;
  }

  /**
   * The "getLooped" function returns the value of the looped property.
   * @returns The `looped`property.
   */
  getLooped(): boolean {
    return this.looped;
  }

  /**
   * The "getCurrentAnimation" function returns the current animation or null if there is no current
   * animation.
   * @returns The current animation object or null.
   */
  getCurrentAnimation(): JAMAnimation | null {
    return this.currentAnimation;
  }

  /**
   * The "getCurrentFrameIndex" function returns the current frame index as a number.
   * @returns The current frame index.
   */
  getCurrentFrameIndex(): number {
    return this.currentFrameIndex;
  }

  /**
   * The "getFrameProgress" function returns the current frame progress as a number.
   * @returns The current frame progress.
   */
  getFrameProgress(): number {
    return this.frameProgress;
  }
}

export { Gfx3MeshJAM };