import { Gfx2SpriteJAS } from "./gfx2_sprite_jas";
import { JASAnimation, JASFrame } from "./jas";

interface AsepriteFrame {
  frame: Rect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: Rect;
  sourceSize: { x: number, y: number };
  duration: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface AsepriteMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: { w: number, h: number };
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

class Aseprite {
  meta: AsepriteMeta;
  frames: Map<string, AsepriteFrame>;

  constructor(json: any) {
    this.meta = json.meta as AsepriteMeta;
    this.frames = json.frames as Map<string, AsepriteFrame>;
  }

  framesArray() {
    return Object.values(this.frames);
    // return Array.from(this.frames.values());
  }

  tagFrames(tag: AsepriteTag) {
    const frames = this.framesArray().slice(tag.from, tag.to + 1);
    return [frames, frames[0].duration ?? 0];
  }
}


// TODO find the fields in aseprite json
// general offset
// general flips etc...
// This class take a Aseprite json export and applies values to the internal Gfx2SpriteJAS instance
export class AsepriteTransform {
  static apply(sprite: Gfx2SpriteJAS, json: any): void {
    const aseprite = new Aseprite(json);
    this.default(sprite);

    // Todo handle no tag found
    if (aseprite.meta.frameTags) {
      console.info('frame tags are : ', aseprite.meta.frameTags);
    } else {
      console.error('no frame tags detected');
    }

    const aseToJASFrame = (aseFrame: AsepriteFrame): JASFrame => {
      return {
        x: aseFrame.frame.x,
        y: aseFrame.frame.y,
        width: aseFrame.frame.w,
        height: aseFrame.frame.h
      }
    };

    const aseTagToJASAnimation = (tag: AsepriteTag) => {
      const [aseFrames, frameDuration] = aseprite.tagFrames(tag);
      return {
        name: tag.name,
        frames: aseFrames.map(aseToJASFrame),
        frameDuration: frameDuration,
        boundingRects: []
      } as JASAnimation;
    };

    const animations: Array<JASAnimation> = aseprite.meta.frameTags.map(aseTagToJASAnimation);
    sprite.animations.push(...animations);
    console.log('sprites has now animations from aseprite file: ', sprite.animations);
  }

  static default(sprite: Gfx2SpriteJAS): void {
    sprite.offset = [0, 0];
    sprite.flip[0] = false;
    sprite.flip[1] = false;
    sprite.offsetFactor[0] = 0;
    sprite.offsetFactor[1] = 0;
    sprite.animations = [];
  }
}