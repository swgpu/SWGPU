import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';

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

export type { JASFrame, JASAnimation };