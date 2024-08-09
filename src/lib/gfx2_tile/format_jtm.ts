export interface FormatJTM {
  Ident: string;
  Rows: number;
  Columns: number;
  TileHeight: number;
  TileWidth: number;
  Layers: Array<FormatJTMTileLayer>;
  Tileset: FormatJTMTileSet;
};

export interface FormatJTMTileLayer {
  Name: string;
  Rows: number;
  Columns: number;
  OffsetX: number;
  OffsetY: number;
  Visible: boolean;
  FrameDuration: number;
  Grid: Array<number>;
  Objects: Array<FormatJTMObject>
};

export interface FormatJTMObject {
  Id: string;
  Position: vec2;
  Name: string;
  Type: string;
  Visible: boolean;
  Size: [number, number];
  Properties: FormatJTMProperties;
};

export interface FormatJTMTileSet {
  Columns?: number;
  TileWidth: number;
  TileHeight: number;
  TextureFile: string;
  Animations: FormatJTMAnimations;
  Properties: FormatJTMProperties;
};

export interface FormatJTMAnimations {
  [key: string]: Array<number>;
};

export interface FormatJTMProperties {
  [key: string]: any;
};

interface Tilekit {
  map: TilekitMap;
  objects: Array<TilekitObject>;
};

interface TilekitMap {
  data: Array<number>;
  w: number;
  h: number;
  tile_w: number;
  tile_h: number;
  tile_spacing: number;
  image_filename: string;
  animations: Array<TilekitAnimation>;
  tags: Array<TilekitTag>;
};

interface TilekitAnimation {
  idx: number;
  rate: number;
  frames: Array<number>;
};

interface TilekitTag {
  label: string;
  tiles: number[];
};

interface TilekitObject {
  name: string;
  id: string;
  x: string;
  y: string;
  w: string;
  h: string;
  [other_props: string]: string;
};

export async function fromTilekit(path: string, textureDir: string = ''): Promise<FormatJTM> {
  const response = await fetch(path);
  const tilekit = await response.json() as Tilekit;

  const objects = new Array<FormatJTMObject>();
  for (const tkObj of tilekit.objects) {
    const properties: FormatJTMProperties = {};
    for (const key in tkObj) {
      if (!['id', 'name', 'x', 'y', 'visible', 'h', 'w'].includes(key)) {
        properties[key] = tkObj[key];
      }
    }

    objects.push({
      Id: tkObj.id ?? tkObj.name,
      Position: [+tkObj.x, +tkObj.y],
      Name: tkObj.name,
      Type: tkObj.type ?? `type_${tkObj.name}`,
      Visible: ('false' === tkObj.visible) ? false : true,
      Size: [+tkObj.w, +tkObj.h],
      Properties: properties
    });
  }

  const animations: FormatJTMAnimations = {};
  tilekit.map.animations.forEach(tkAnim => {
    animations[tkAnim.idx.toString()] = tkAnim.frames;
  });

  const tilesetProperties: FormatJTMProperties = {};
  tilekit.map.tags.forEach(tkTag => {
    tilesetProperties[tkTag.label] = tkTag.tiles;
  });

  return {
    Ident: 'JTM',
    Rows: tilekit.map.h,
    Columns: tilekit.map.w,
    TileHeight: tilekit.map.tile_h,
    TileWidth: tilekit.map.tile_w,
    Layers: [{
      Name: `unique Tilekit layer from ${path}`,
      Rows: tilekit.map.h,
      Columns: tilekit.map.w,
      OffsetX: 0,
      OffsetY: 0,
      Visible: true,
      FrameDuration: tilekit.map.animations[0]?.rate ?? 0,
      Grid: tilekit.map.data,
      Objects: objects
    }],
    Tileset: {
      TileWidth: tilekit.map.tile_w,
      TileHeight: tilekit.map.tile_h,
      TextureFile: textureDir + tilekit.map.image_filename,
      Animations: animations,
      Properties: tilesetProperties
    }
  };
}