import { Tilekit, TilekitObject } from "./tilekit/tilekit";

export interface FormatJTM {
  Ident: string;
  Rows: number;
  Columns: number;
  TileHeight: number;
  TileWidth: number;
  Layers: Array<FormatJTMLayer>;
  Tileset: FormatJMTTileSet;
}

interface FormatJTMLayer {
  Name: string;
  Rows: number;
  Columns: number;
  Visible: boolean;
  FrameDuration: number;
  Grid: Array<number>;
  Objects: Array<TilekitObject>;
}

interface FormatJTMTileSet {
  Columns: number;
  TileWidth: number;
  TileHeight: number;
  TextureFile: string;
  Animations: FormatJTMAnimations;
  Properties: FormatJTMProperties;
}

interface FormatJTMAnimations {
  [key: string]: Array<number>;
}

interface FormatJTMProperties {
  [key: string]: Array<number>;
}

export async function fromTilekit (path: string, cwd = '.'): Promise<FormatJTM> {
  const response = await fetch(`${cwd}/${path}`);
  const json = await response.json();

  const tilekit = json as Tilekit;
  console.log('loaded tilekit: ', tilekit);

  const jmtLayers: FormatJTMLayer[] = [
    {
      Name: `unique Tilekit layer from ${path}`,
      Rows: tilekit.map.h,
      Columns: tilekit.map.w,
      Visible: true,
      FrameDuration: tilekit.map.animations[0]?.rate ?? 0,
      Grid: tilekit.map.data,
      Objects: tilekit.objects
    }
  ];

  const jmtAnimations:FormatJTMAnimations = {};
  tilekit.map.animations.forEach(tkAnim => {
    jmtAnimations[tkAnim.idx.toString()] = tkAnim.frames;
  });

  const jmtTileSet: FormatJTMTileSet = {
    Columns: tilekit.map.w,
    TileWidth: tilekit.map.tile_w,
    TileHeight: tilekit.map.tile_h,
    TextureFile: `${cwd}/${tilekit.map.image_filename}`,
    Animations: jmtAnimations,
    Properties: {}
  }

  const jmt: FormatJTM = {
    Ident: 'JTM',
    Rows: tilekit.map.h,
    Columns: tilekit.map.w,
    TileHeight: tilekit.map.tile_h,
    TileWidth: tilekit.map.tile_w,
    Layers: jmtLayers,
    Tileset: jmtTileSet 
  }

  console.log('tilekit became JMT: ', jmt);
  return jmt
}