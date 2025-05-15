export interface FormatJAS {
    Ident: string;
    Animations: Array<FormatJASAnimation>;
    OffsetX?: number;
    OffsetY?: number;
    OffsetFactorX?: number;
    OffsetFactorY?: number;
    FlipX?: boolean;
    FlipY?: boolean;
}
export interface FormatJASAnimation {
    'Name': string;
    'Frames': Array<FormatJASAnimationFrame>;
    'FrameDuration': number;
}
export interface FormatJASAnimationFrame {
    'X': number;
    'Y': number;
    'Width': number;
    'Height': number;
}
export declare function fromAseprite(path: string): Promise<FormatJAS>;
