import { Tilekit, TilekitObject } from "./tilekit/tilekit";

export interface FormatJTM {
  Ident: string;
  Rows: number;
  Columns: number;
  TileHeight: number;
  TileWidth: number;
  Layers: Array<FormatJTMTileLayer>;
  Tileset: FormatJTMTileSet;
}

interface FormatJTMTileLayer {
  Name: string;
  Rows: number;
  Columns: number;
  OffsetX: number;
  OffsetY: number;
  Visible: boolean;
  FrameDuration: number;
  Grid: Array<number>;
  Objects: Array<FormatJTMObject>
}

interface FormatJTMObject {
  Id: string;
  Position: vec2;
  Name: string;
  Type: string;
  Visible: boolean;
  Size: [number, number];
  Properties: FormatJTMProperties;
}

interface FormatJTMTileSet {
  Columns?: number;
  TileWidth: number;
  TileHeight: number;
  TextureFile: string;
  Animations: FormatJTMAnimations;
  Properties: Array<FormatJTMProperties>;
}

interface FormatJTMAnimations {
  [key: string]: Array<number>;
}

interface FormatJTMProperties {
  [key: string]: number | string | boolean;
}

export async function fromTilekit(path: string, cwd = '.'): Promise<FormatJTM> {
  const response = await fetch(`${cwd}/${path}`);
  const json = await response.json();

  const tilekit = json as Tilekit;
  console.log('loaded tilekit: ', tilekit);

  const tkToJTMObject = ((tkObj: TilekitObject): FormatJTMObject => {
    return {
      Id: tkObj.name,
      Position: [+tkObj.x, +tkObj.y],
      Name: tkObj.name,
      Type: tkObj.type ?? `type_${tkObj.name}`,
      Visible: tkObj.visible ?? true,
      Size: [+tkObj.w, +tkObj.h],
      Properties: tkObj.properties
    };
  });



  const jtmTileLayers: FormatJTMTileLayer[] = [
    {
      Name: `unique Tilekit layer from ${path}`,
      Rows: tilekit.map.h,
      Columns: tilekit.map.w,
      OffsetX: 0,
      OffsetY: 0,
      Visible: true,
      FrameDuration: tilekit.map.animations[0]?.rate ?? 0,
      Grid: tilekit.map.data.map(tileIndex => tileIndex),
      Objects: tilekit.objects.map(tkToJTMObject)
    }
  ]

  const jmtAnimations: FormatJTMAnimations = {};
  tilekit.map.animations.forEach(tkAnim => {
    jmtAnimations[tkAnim.idx.toString()] = tkAnim.frames;
  });

  let tileSetLayerProperties: Array<FormatJTMProperties>;
  tilekit.map.tags.forEach(tag => {
    let property: any = {};
    property[tag.label] = tag.tiles
    tileSetLayerProperties.push(property)
  })

  const jmtTileSet: FormatJTMTileSet = {
    TileWidth: tilekit.map.tile_w,
    TileHeight: tilekit.map.tile_h,
    TextureFile: `${cwd}/${tilekit.map.image_filename}`,
    Animations: {},
    // TODO
    Properties: []
  }

  const jmt: FormatJTM = {
    Ident: 'JTM',
    Rows: tilekit.map.h,
    Columns: tilekit.map.w,
    TileHeight: tilekit.map.tile_h,
    TileWidth: tilekit.map.tile_w,
    Layers: jtmTileLayers,
    Tileset: jmtTileSet
  }

  console.log('tilekit became JMT: ', jmt);
  return jmt;
}