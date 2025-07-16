import { eventManager } from '../core/event_manager';
import { UT } from '../core/utils';
import { Poolable } from '../core/object_pool';
import { Gfx3BoundingBox } from '../gfx3/gfx3_bounding_box';
import { Gfx3Mesh, MeshBuild } from './gfx3_mesh';
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
 * It emit 'E_FINISHED'
 */
class Gfx3MeshJAM extends Gfx3Mesh implements Poolable<Gfx3MeshJAM> {
  numVertices: number;
  frames: Array<JAMFrame>;
  animations: Array<JAMAnimation>;
  interpolationEnabled: boolean;
  looped: boolean;
  currentAnimation: JAMAnimation | null;
  currentFrameIndex: number;
  frameProgress: number;
  geos: Array<MeshBuild>;
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
    this.geos = [];
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
    this.boundingBoxes = [];
    for (const obj of json['Frames']) {
      const vertices = obj['Vertices'] ?? json['Vertices'];
      const textureCoords = obj['TextureCoords'] ?? json['TextureCoords'];
      const colors = obj['Colors'] ?? json['Colors'];
      const normals = obj['Normals'] ?? json['Normals'];
      const geo = Gfx3Mesh.buildVertices(json['NumVertices'], vertices, textureCoords, colors, normals);
      this.geos.push(geo);
      this.frames.push({ vertices: geo.vertices });
      this.boundingBoxes.push(Gfx3BoundingBox.createFromVertices(vertices, 3));
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

    this.beginVertices(json['NumVertices']);
    this.setVertices(this.frames[0].vertices);
    this.endVertices();

    this.geo = this.geos[0];
    this.boundingBox = this.boundingBoxes[0];
    this.numVertices = json['NumVertices'];
    this.currentAnimation = null;
    this.interpolationEnabled = true;
    this.looped = true;
    this.currentFrameIndex = 0;
    this.frameProgress = 0;
  }

  /**
   * Load asynchronously animated mesh data from a binary file (bam).
   * 
   * @param {string} path - The file path.
   */
  async loadFromBinaryFile(path: string): Promise<void> {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const data = new Float32Array(buffer);
    const dataInt = new Uint32Array(buffer);
    let offset = 0;

    const numVertices = dataInt[0];
    const numFrames = dataInt[1];
    const numAnimations = dataInt[2];
    offset += 3;

    const textureCoords = [];
    for (let i = 0; i < numVertices * 2; i++) {
      textureCoords.push(data[offset]);
      offset++;
    }

    this.frames = [];
    this.boundingBoxes = [];
    for (let i = 0; i < numFrames; i++) {
      const vertices = [];
      for (let i = 0; i < numVertices * 3; i++) {
        vertices.push(data[offset]);
        offset++;
      }

      const normals = [];
      for (let i = 0; i < numVertices * 3; i++) {
        normals.push(data[offset]);
        offset++;
      }

      const geo = Gfx3Mesh.buildVertices(numVertices, vertices, textureCoords, undefined, normals);
      this.frames.push({ vertices: geo.vertices });

      this.boundingBoxes.push(
        Gfx3BoundingBox.createFromVertices(vertices, 3)
      );
    }

    this.animations = [];
    for (let i = 0; i < numAnimations; i++) {
      const nameLength = dataInt[offset];
      offset += 1;

      let name = '';
      for (let j = 0; j < nameLength; j++) {
        name += String.fromCharCode(dataInt[offset++]);
      }

      this.animations.push({
        name: name,
        startFrame: dataInt[offset++],
        endFrame: dataInt[offset++],
        frameDuration: dataInt[offset++]
      });
    }

    this.beginVertices(numVertices);
    this.setVertices(this.frames[0].vertices);
    this.endVertices();

    this.boundingBox = this.boundingBoxes[0];
    this.numVertices = numVertices;
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

    this.flushVertices();
    const currentFrame = this.frames[this.currentFrameIndex];
    const nextFrame = this.frames[nextFrameIndex];

    for (let i = 0; i < this.numVertices; i++) {
      const offset = i * SHADER_VERTEX_ATTR_COUNT;
      const vax = currentFrame.vertices[offset + 0];
      const vay = currentFrame.vertices[offset + 1];
      const vaz = currentFrame.vertices[offset + 2];

      const tu = currentFrame.vertices[offset + 3];
      const tv = currentFrame.vertices[offset + 4];

      const car = currentFrame.vertices[offset + 5];
      const cag = currentFrame.vertices[offset + 6];
      const cab = currentFrame.vertices[offset + 7];

      const nax = currentFrame.vertices[offset + 8];
      const nay = currentFrame.vertices[offset + 9];
      const naz = currentFrame.vertices[offset + 10];

      const tax = currentFrame.vertices[offset + 11];
      const tay = currentFrame.vertices[offset + 12];
      const taz = currentFrame.vertices[offset + 13];

      const bax = currentFrame.vertices[offset + 14];
      const bay = currentFrame.vertices[offset + 15];
      const baz = currentFrame.vertices[offset + 16];

      if (this.interpolationEnabled) {
        const vbx = nextFrame.vertices[offset + 0];
        const vby = nextFrame.vertices[offset + 1];
        const vbz = nextFrame.vertices[offset + 2];
        const vix = vax + ((vbx - vax) * interpolateFactor);
        const viy = vay + ((vby - vay) * interpolateFactor);
        const viz = vaz + ((vbz - vaz) * interpolateFactor);

        const cbr = nextFrame.vertices[offset + 5];
        const cbg = nextFrame.vertices[offset + 6];
        const cbb = nextFrame.vertices[offset + 7];
        const cir = car + ((cbr - car) * interpolateFactor);
        const cig = cag + ((cbg - cag) * interpolateFactor);
        const cib = cab + ((cbb - cab) * interpolateFactor);
  
        const nbx = nextFrame.vertices[offset + 8];
        const nby = nextFrame.vertices[offset + 9];
        const nbz = nextFrame.vertices[offset + 10];
        const nix = nax + ((nbx - nax) * interpolateFactor);
        const niy = nay + ((nby - nay) * interpolateFactor);
        const niz = naz + ((nbz - naz) * interpolateFactor);

        const tbx = nextFrame.vertices[offset + 11];
        const tby = nextFrame.vertices[offset + 12];
        const tbz = nextFrame.vertices[offset + 13];
        const tix = tax + ((tbx - tax) * interpolateFactor);
        const tiy = tay + ((tby - tay) * interpolateFactor);
        const tiz = taz + ((tbz - taz) * interpolateFactor);

        const bbx = nextFrame.vertices[offset + 14];
        const bby = nextFrame.vertices[offset + 15];
        const bbz = nextFrame.vertices[offset + 16];
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
   * 
   * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
   */
  getBoundingBox(dynamicMode: boolean = false): Gfx3BoundingBox {
    if (dynamicMode && this.currentAnimation) {
      return this.boundingBoxes[this.currentFrameIndex];
    }

    return this.boundingBox;
  }

  /**
   * Returns the bounding box in the world space coordinates.
   * 
   * @param {boolean} [dynamicMode=false] - Determines if bounding box fit the current animation.
   */
  getWorldBoundingBox(dynamicMode: boolean = false): Gfx3BoundingBox {
    if (dynamicMode && this.currentAnimation) {
      const box = this.boundingBoxes[this.currentFrameIndex];
      return box.transform(this.getTransformMatrix());
    }

    return this.boundingBox.transform(this.getTransformMatrix());
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx3MeshJAM} jam - The copy object.
   * @param {mat4} transformMatrix - The transformation matrix.
   */
  clone(jam: Gfx3MeshJAM = new Gfx3MeshJAM(), transformMatrix: mat4 = UT.MAT4_IDENTITY()): Gfx3MeshJAM {
    super.clone(jam, transformMatrix);
    jam.numVertices = this.numVertices;
    jam.frames = this.frames;
    jam.animations = this.animations;
    jam.interpolationEnabled = this.interpolationEnabled;
    jam.looped = false;
    jam.currentAnimation = null;
    jam.currentFrameIndex = 0;
    jam.frameProgress = 0;

    for (const boundingBox of this.boundingBoxes) {
      jam.boundingBoxes.push(new Gfx3BoundingBox(
        boundingBox.min, boundingBox.max
      ));
    }

    return jam;
  }
}

export { Gfx3MeshJAM };