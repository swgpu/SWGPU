import { eventManager } from '../core/event_manager';
import { gfx2Manager } from '../gfx2/gfx2_manager';
import { Poolable } from '../core/object_pool';
import { UT } from '../core/utils';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';

export enum FileType {
  JSS,
  JAS,
  Asprite,
  TileKit
}

interface JASFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface JASAnimation {
  name: string;
  frames: Array<JASFrame>;
  frameDuration: number;
  boundingRects: Array<Gfx2BoundingRect>;
}

interface AsepriteFrame {
  filename: string
  frame: any;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: object;
  sourceSize: object;
  duration: number;
}

interface AsepriteMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: object;
  scale: string;
  frameTags: Array<AsepriteTag>,
}

interface AsepriteTag {
  name: string;
  from: number;
  to: number;
  direction: string;
  color: string;
}

interface Aseprite {
  frames: Map<string, AsepriteFrame>;
  meta: AsepriteMeta
}

/*
{ "frames": [
  {
   "filename": "sprite 0.ase",
   "frame": { "x": 0, "y": 0, "w": 256, "h": 256 },
   "rotated": false,
   "trimmed": false,
   "spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 256 },
   "sourceSize": { "w": 256, "h": 256 },
   "duration": 100
  },
  {
   "filename": "sprite 1.ase",
   "frame": { "x": 256, "y": 0, "w": 256, "h": 256 },
   "rotated": false,
   "trimmed": false,
   "spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 256 },
   "sourceSize": { "w": 256, "h": 256 },
   "duration": 200
  },
  {
   "filename": "sprite 2.ase",
   "frame": { "x": 512, "y": 0, "w": 256, "h": 256 },
   "rotated": false,
   "trimmed": false,
   "spriteSourceSize": { "x": 0, "y": 0, "w": 256, "h": 256 },
   "sourceSize": { "w": 256, "h": 256 },
   "duration": 100
  }
],
"meta": {
 "app": "http://www.aseprite.org/",
 "version": "1.2-dev",
 "format": "RGBA8888",
 "size": { "w": 768, "h": 256 },
 "scale": "1"
}
}



{ "frames": {
   "helicoper 0.aseprite": {
    "frame": { "x": 0, "y": 0, "w": 32, "h": 32 },
    "rotated": false,
    "trimmed": false,
    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
    "sourceSize": { "w": 32, "h": 32 },
    "duration": 100
   },
   "helicoper 1.aseprite": {
    "frame": { "x": 32, "y": 0, "w": 32, "h": 32 },
    "rotated": false,
    "trimmed": false,
    "spriteSourceSize": { "x": 0, "y": 0, "w": 32, "h": 32 },
    "sourceSize": { "w": 32, "h": 32 },
    "duration": 100
   }
 },
 "meta": {
  "app": "https://www.aseprite.org/",
  "version": "1.3.7-x64",
  "image": "helicoper.png",
  "format": "RGBA8888",
  "size": { "w": 64, "h": 32 },
  "scale": "1",
  "frameTags": [
  ],
  "layers": [
   { "name": "Layer 1", "opacity": 255, "blendMode": "normal" }
  ],
  "slices": [
  ]
 }
}


*/

/**
 * A 2D sprite with animations.
 * It emit 'E_FINISHED'
 */
class Gfx2SpriteJAS extends Gfx2Drawable implements Poolable<Gfx2SpriteJAS> {
  animations: Array<JASAnimation>;
  texture: ImageBitmap | HTMLImageElement;
  offsetFactor: vec2;
  currentAnimation: JASAnimation | null;
  currentAnimationFrameIndex: number;
  looped: boolean;
  frameProgress: number;

  constructor() {
    super();
    this.animations = [];
    this.texture = gfx2Manager.getDefaultTexture();
    this.offsetFactor = [0, 0];
    this.currentAnimation = null;
    this.currentAnimationFrameIndex = 0;
    this.looped = false;
    this.frameProgress = 0;
  }

  /**
   * Loads asynchronously sprite data from a json file (jas).
   * 
   * @param {string} path - The file path.
   */
  async loadFromFile(path: string, format = FileType.JAS): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();
    if (format === FileType.JAS) { this.parseJAS(json) }
    else if (format === FileType.Asprite) { this.parseAseprite(json) }

    this.boundingRect = this.animations[0].boundingRects[0];
    this.currentAnimation = null;
    this.currentAnimationFrameIndex = 0;
    this.frameProgress = 0;
  }

  parseJAS(json: any): void {
    this.offset[0] = json['OffsetX'] ?? 0;
    this.offset[1] = json['OffsetY'] ?? 0;

    this.flip[0] = json['FlipX'] ?? false;
    this.flip[1] = json['FlipY'] ?? false;

    this.offsetFactor[0] = json['OffsetFactorX'] ?? 0;
    this.offsetFactor[1] = json['OffsetFactorY'] ?? 0;

    this.animations = [];
    for (const obj of json['Animations']) {
      const animation: JASAnimation = {
        name: obj['Name'],
        frames: [],
        frameDuration: parseInt(obj['FrameDuration']),
        boundingRects: []
      };

      for (const frame of obj['Frames']) {
        animation.frames.push({
          x: frame['X'],
          y: frame['Y'],
          width: frame['Width'],
          height: frame['Height']
        });

        animation.boundingRects.push(Gfx2BoundingRect.createFromCoord(
          frame['X'],
          frame['Y'],
          frame['Width'],
          frame['Height']
        ));
      }

      this.animations.push(animation);
    }


  }

  parseAseprite(json: any): void {
    const aseprite = json as Aseprite;
    console.log('Aseprite struct is ', aseprite);


    // TODO find the fields in aseprite json
    // general offset
    // general flips etc...
    this.offset = [0, 0];

    this.flip[0] = false;
    this.flip[1] = false;

    this.offsetFactor[0] = 0;
    this.offsetFactor[1] = 0;

    this.animations = [];

    // Todo handle tags
    if (aseprite.meta.frameTags) {
      console.warn('frame tags still not implemented')
    }

    const frames = Array.from(aseprite.frames.values());
    // const duration = Array.from(frames.values()).map(frame => frame.duration).reduce((fDuration1,fDuration2) => fDuration1 + fDuration2);

    const animation: JASAnimation = {
      name: 'animation',
      frames: [],
      frameDuration: frames[0].duration,
      boundingRects: []
    };


    const jasFrames:Array<JASFrame> = frames.map(aseFrame => {
      const jasFrame:JASFrame = {
        x: aseFrame.frame.x,
        y: aseFrame.frame.y,
        width: aseFrame.frame.w,
        height: aseFrame.frame.h,
      };
      return jasFrame;
    })

    animation.frames.push(...jasFrames);


    // // for (const obj of json['Animations']) {
    // for (const frame of aseprite.frames) {
    //   const animation: JASAnimation = {
    //     name: frame.'Name'],
    //     frames: [],
    //     frameDuration: parseInt(obj['FrameDuration']),
    //     boundingRects: []
    //   };

    //   for (const frame of obj['Frames']) {
    //     animation.frames.push({
    //       x: frame['X'],
    //       y: frame['Y'],
    //       width: frame['Width'],
    //       height: frame['Height']
    //     });

    //     animation.boundingRects.push(Gfx2BoundingRect.createFromCoord(
    //       frame['X'],
    //       frame['Y'],
    //       frame['Width'],
    //       frame['Height']
    //     ));
    //   }

    //   this.animations.push(animation);
    // }
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
   * The draw function.
   */
  onRender(): void {
    if (!this.currentAnimation) {
      return;
    }

    const ctx = gfx2Manager.getContext();
    const currentFrame = this.currentAnimation.frames[this.currentAnimationFrameIndex];

    ctx.scale(this.flip[0] ? -1 : 1, this.flip[1] ? -1 : 1);

    if (this.offsetFactor[0] != 0) {
      ctx.translate(-currentFrame.width * this.offsetFactor[0], 0);
    }

    if (this.offsetFactor[1] != 0) {
      ctx.translate(0, -currentFrame.height * this.offsetFactor[1]);
    }

    ctx.drawImage(
      this.texture,
      currentFrame.x,
      currentFrame.y,
      currentFrame.width,
      currentFrame.height,
      this.flip[0] ? currentFrame.width * -1 : 0,
      this.flip[1] ? currentFrame.height * -1 : 0,
      currentFrame.width,
      currentFrame.height
    );
  }

  /**
   * Play a specific animation.
   * 
   * @param {string} animationName - The name of the animation to be played.
   * @param {boolean} [looped=false] - Determines whether the animation should loop or not.
   * @param {boolean} [preventSameAnimation=false] - Determines whether the same animation should be prevented from playing again.
   */
  play(animationName: string, looped: boolean = false, preventSameAnimation: boolean = false): void {
    if (preventSameAnimation && this.currentAnimation && animationName == this.currentAnimation.name) {
      return;
    }

    const animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Gfx2SpriteJAS::play: animation not found.');
    }

    this.currentAnimation = animation;
    this.currentAnimationFrameIndex = 0;
    this.looped = looped;
    this.frameProgress = 0;
  }

  /**
   * Returns the list of animation descriptors.
   */
  getAnimations(): Array<JASAnimation> {
    return this.animations;
  }

  /**
   * Set the animation descriptors.
   * 
   * @param animations - The animations data.
   */
  setAnimations(animations: Array<JASAnimation>): void {
    this.animations = animations;
  }

  /**
   * Returns the current animation or null if there is no current animation.
   */
  getCurrentAnimation(): JASAnimation | null {
    return this.currentAnimation;
  }

  /**
   * Returns the current animation frame index.
   */
  getCurrentAnimationFrameIndex(): number {
    return this.currentAnimationFrameIndex;
  }

  /**
   * Returns the sprite texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement {
    return this.texture;
  }

  /**
   * Set the sprite texture.
   * 
   * @param {ImageBitmap} texture - The sprite texture.
   */
  setTexture(texture: ImageBitmap): void {
    this.texture = texture;
  }

  /**
   * Set the normalized offset value.
   * Note: this offset is independant from the regular drawable pixel based offset.
   * 
   * @param {number} offsetXFactor - The normalized x-coordinate offset value.
   * @param {number} offsetYFactor - The normalized y-coordinate offset value.
   */
  setOffsetNormalized(offsetXFactor: number, offsetYFactor: number) {
    this.offsetFactor[0] = offsetXFactor;
    this.offsetFactor[1] = offsetYFactor;
  }

  /**
   * Returns the bounding rect.
   * 
   * @param {boolean} [dynamicMode=false] - Determines if bounding rect fit the current animation.
   */
  getBoundingRect(dynamicMode: boolean = false): Gfx2BoundingRect {
    if (dynamicMode && this.currentAnimation) {
      this.currentAnimation.boundingRects[this.currentAnimationFrameIndex];
    }

    return this.boundingRect;
  }

  /**
   * Returns the bounding rect in the world space coordinates.
   * 
   * @param {boolean} [dynamicMode=false] - Determines if bounding rect fit the current animation.
   */
  getWorldBoundingRect(dynamicMode: boolean = false): Gfx2BoundingRect {
    if (dynamicMode && this.currentAnimation) {
      const rect = this.currentAnimation.boundingRects[this.currentAnimationFrameIndex];
      const x = this.position[0] - rect.getWidth() * this.offsetFactor[0];
      const y = this.position[1] - rect.getHeight() * this.offsetFactor[1];
      return rect.transform(UT.MAT3_TRANSFORM([x, y], this.offset, this.rotation, this.scale));
    }

    return this.boundingRect.transform(UT.MAT3_TRANSFORM(this.position, this.offset, this.rotation, this.scale));
  }

  /**
   * Clone the object.
   * 
   * @param {Gfx2SpriteJAS} jas - The copy object.
   */
  clone(jas: Gfx2SpriteJAS = new Gfx2SpriteJAS()): Gfx2SpriteJAS {
    super.clone(jas);
    jas.flip = [this.flip[0], this.flip[1]];
    jas.animations = this.animations;
    jas.texture = this.texture;
    jas.currentAnimation = null;
    jas.currentAnimationFrameIndex = 0;
    jas.looped = false;
    jas.frameProgress = 0;
    return jas;
  }
}

export { Gfx2SpriteJAS };