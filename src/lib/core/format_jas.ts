export interface FormatJAS {
  Ident: string;
  Animations: Array<FormatJASAnimation>;
  OffsetX?: number;
  OffsetY?: number;
  OffsetFactorX?: number;
  OffsetFactorY?: number;
  FlipX?: boolean;
  FlipY?: boolean;
};

export interface FormatJASAnimation {
  'Name': string;
  'Frames': Array<FormatJASAnimationFrame>;
  'FrameDuration': number;
};

export interface FormatJASAnimationFrame {
  'X': number;
  'Y': number;
  'Width': number;
  'Height': number;
};

interface Aseprite {
  meta: AsepriteMeta;
  frames: Array<AsepriteFrame>;
};

interface AsepriteFrame {
  frame: { x: number, y: number, w: number, h: number; };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: { x: number, y: number, w: number, h: number; };
  sourceSize: { x: number, y: number };
  duration: number;
};

interface AsepriteMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  size: { w: number, h: number };
  scale: string;
  frameTags: Array<AsepriteTag>,
};

interface AsepriteTag {
  name: string;
  from: number;
  to: number;
  direction: string;
  color: string;
};

export async function fromAseprite(path: string): Promise<FormatJAS> {
  const response = await fetch(path);
  const aseprite =  await response.json() as Aseprite;

  const arrayFrames = new Array<AsepriteFrame>();
  for (const key in aseprite.frames) {
    arrayFrames.push(aseprite.frames[key]);
  }

  const animations = new Array<FormatJASAnimation>();
  for (const tag of aseprite.meta.frameTags) {
    const frames = new Array<FormatJASAnimationFrame>();
    for (let i = tag.from; i <= tag.to; i++) {
      frames.push({
        'X': arrayFrames[i].frame.x,
        'Y': arrayFrames[i].frame.y,
        'Width': arrayFrames[i].frame.w,
        'Height': arrayFrames[i].frame.h,
      });
    }

    animations.push({
      'Name': tag.name,
      'Frames': frames,
      'FrameDuration': arrayFrames[tag.from].duration
    });
  }

  return {
    'Ident': 'JAS',
    'Animations': animations
  };
}