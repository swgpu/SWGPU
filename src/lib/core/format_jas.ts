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

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
};

interface AsepriteFrame {
  frame: Rect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: Rect;
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
  const json =  await response.json();

  const res: FormatJAS = {
    'Ident': 'JAS',
    'Animations': new Array<FormatJASAnimation>()
  };

  const meta = json['meta'] as AsepriteMeta;
  const frames = new Map<string, AsepriteFrame>();
  for (const key in json['frames']) {
    frames.set(key, json['frames'][key]);
  }

  const arrayFrames = Array.from(frames.values());

  for (const tag of meta.frameTags) {
    const frames = new Array<FormatJASAnimationFrame>();
    for (let i = tag.from; i <= tag.to; i++) {
      frames.push({
        'X': arrayFrames[i].frame.x,
        'Y': arrayFrames[i].frame.y,
        'Width': arrayFrames[i].frame.w,
        'Height': arrayFrames[i].frame.h,
      });
    }

    res['Animations'].push({
      'Name': tag.name,
      'Frames': frames,
      'FrameDuration': arrayFrames[tag.from].duration
    });
  }

  console.log(res);

  return res;
}