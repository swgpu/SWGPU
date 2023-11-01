import { eventManager } from '../core/event_manager.js';
import { Gfx3Sprite } from './gfx3_sprite.js';

interface JASFrame {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface JASAnimation {
  name: string;
  frames: Array<JASFrame>;
  frameDuration: number;
};

/**
 * The `Gfx3SpriteJAS` is a subclass of `Gfx3Sprite` that represents a animated sprite.
 */
class Gfx3SpriteJAS extends Gfx3Sprite {
  animations: Array<JASAnimation>;
  currentAnimation: JASAnimation | null;
  currentAnimationFrameIndex: number;
  looped: boolean;
  frameProgress: number;
  offsetXFactor: number;
  offsetYFactor: number;

  /**
   * The constructor.
   */
  constructor() {
    super();
    this.animations = [];
    this.currentAnimation = null;
    this.currentAnimationFrameIndex = 0;
    this.looped = false;
    this.frameProgress = 0;
    this.offsetXFactor = 0;
    this.offsetYFactor = 0;
  }

  /**
   * The "loadFromFile" function asynchronously loads animated sprite data from a json file (jas).
   * @param {string} path - The `path` parameter is the file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    if (!json.hasOwnProperty('Ident') || json['Ident'] != 'JAS') {
      throw new Error('Gfx3SpriteJAS::loadFromFile(): File not valid !');
    }

    this.animations = [];
    for (const obj of json['Animations']) {
      const animation: JASAnimation = {
        name: obj['Name'],
        frames: [],
        frameDuration: parseInt(obj['FrameDuration'])
      };

      for (const objFrame of obj['Frames']) {
        animation.frames.push({
          x: objFrame['X'],
          y: objFrame['Y'],
          width: objFrame['Width'],
          height: objFrame['Height']
        });
      }

      this.animations.push(animation);
    }

    this.currentAnimation = null;
    this.currentAnimationFrameIndex = 0;
    this.frameProgress = 0;
  }

  /**
   * The "update" function.
   */
  update(ts: number): void {
    if (!this.currentAnimation || !this.texture) {
      return;
    }

    const currentFrame = this.currentAnimation.frames[this.currentAnimationFrameIndex];
    const minX = 0;
    const minY = 0;
    const maxX = currentFrame.width;
    const maxY = currentFrame.height;
    const ux = (currentFrame.x / this.texture.gpuTexture.width);
    const uy = (currentFrame.y / this.texture.gpuTexture.height);
    const vx = (currentFrame.x + currentFrame.width) / this.texture.gpuTexture.width;
    const vy = (currentFrame.y + currentFrame.height) / this.texture.gpuTexture.height;
    const fux = this.flip[0] ? 1 - ux : ux;
    const fuy = this.flip[1] ? 1 - uy : uy;
    const fvx = this.flip[0] ? 1 - vx : vx;
    const fvy = this.flip[1] ? 1 - vy : vy;

    if (this.offsetXFactor != 0 || this.offsetYFactor != 0) {
      this.offset[0] = currentFrame.width * this.offsetXFactor;
      this.offset[1] = currentFrame.height * this.offsetYFactor;
    }

    this.beginVertices(6);
    this.defineVertex(minX, maxY, 0, fux, fuy);
    this.defineVertex(minX, minY, 0, fux, fvy);
    this.defineVertex(maxX, minY, 0, fvx, fvy);
    this.defineVertex(maxX, minY, 0, fvx, fvy);
    this.defineVertex(maxX, maxY, 0, fvx, fuy);
    this.defineVertex(minX, maxY, 0, fux, fuy);
    this.endVertices();

    if (this.frameProgress >= this.currentAnimation.frameDuration) {
      if (this.currentAnimationFrameIndex == this.currentAnimation.frames.length - 1) {
        eventManager.emit(this, 'E_FINISHED');
        this.currentAnimationFrameIndex = this.looped ? 0 : this.currentAnimation.frames.length - 1;
        this.frameProgress = 0;
      }
      else {
        this.currentAnimationFrameIndex = this.currentAnimationFrameIndex + 1;
        this.frameProgress = 0;
      }
    }
    else {
      this.frameProgress += ts;
    }
  }

  /**
   * The "play" function is used to start playing a specific animation, with options for looping and
   * preventing the same animation from being played again.
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - The `looped` parameter is a boolean that determines whether
   * the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - The `preventSameAnimation` parameter is a boolean
   * flag that determines whether the same animation should be prevented from playing again.
   */
  play(animationName: string, looped: boolean = false, preventSameAnimation: boolean = false): void {
    if (preventSameAnimation && this.currentAnimation && animationName == this.currentAnimation.name) {
      return;
    }

    const animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Gfx3SpriteJAS::play: animation not found.');
    }

    this.currentAnimation = animation;
    this.currentAnimationFrameIndex = 0;
    this.looped = looped;
    this.frameProgress = 0;
  }

  /**
   * The "getAnimations" function returns an array of animation descriptors.
   * @returns An array of animation descriptors.
   */
  getAnimations(): Array<JASAnimation> {
    return this.animations;
  }

  /**
   * The "setAnimations" function sets the animations property.
   * @param animations - The `animations` parameter is an array of animation descriptors.
   */
  setAnimations(animations: Array<JASAnimation>): void {
    this.animations = animations;
  }

  /**
   * The "getCurrentAnimation" function returns the current animation or null if there is no current
   * animation.
   * @returns The current animation or null.
   */
  getCurrentAnimation(): JASAnimation | null {
    return this.currentAnimation;
  }

  /**
   * The "getCurrentAnimationFrameIndex" function returns the current animation frame index.
   * @returns The current animation frame index.
   */
  getCurrentAnimationFrameIndex(): number {
    return this.currentAnimationFrameIndex;
  }

  /**
   * The "setOffsetNormalized" function sets the normalized origin offset value.
   * @param {number} offsetXFactor - The offsetXFactor represent the normalized x-coordinate offset value.
   * @param {number} offsetYFactor - The offsetYFactor represent the normalized y-coordinate offset value.
   */
  setOffsetNormalized(offsetXFactor: number, offsetYFactor: number) {
    this.offsetXFactor = offsetXFactor;
    this.offsetYFactor = offsetYFactor;
  }
}

export { Gfx3SpriteJAS };