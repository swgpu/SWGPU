export interface FormatJTM {
    Ident: string;
    Rows: number;
    Columns: number;
    TileHeight: number;
    TileWidth: number;
    Layers: Array<FormatJTMTileLayer>;
    Tileset: FormatJTMTileSet;
}
export interface FormatJTMTileLayer {
    Name: string;
    Rows: number;
    Columns: number;
    OffsetX: number;
    OffsetY: number;
    Visible: boolean;
    FrameDuration: number;
    Grid: Array<number>;
    Objects: Array<FormatJTMObject>;
}
export interface FormatJTMObject {
    Id: string;
    Position: vec2;
    Name: string;
    Type: string;
    Visible: boolean;
    Size: [number, number];
    Properties: FormatJTMProperties;
}
export interface FormatJTMTileSet {
    Columns?: number;
    TileWidth: number;
    TileHeight: number;
    TextureFile: string;
    Animations: FormatJTMAnimations;
    Slopes: FormatJTMSlopes;
    Properties: FormatJTMProperties;
}
export interface FormatJTMAnimations {
    [key: string]: Array<number>;
}
export interface FormatJTMSlopes {
    [key: string]: Array<number>;
}
export interface FormatJTMProperties {
    [key: string]: any;
}
export declare function fromSpriteFusion(path: string, texturePath?: string, optsPath?: string): Promise<FormatJTM>;
export declare function fromTilekit(path: string, textureDir?: string, optsPath?: string): Promise<FormatJTM>;
