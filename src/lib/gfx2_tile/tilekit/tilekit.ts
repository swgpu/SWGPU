export interface Tilekit {
  map: TilekitMap;
  objects: Array<TilekitObject>;
}

export interface TilekitMap {
  data: Array<number>;
  w: number;
  h: number;
  tile_w: number;
  tile_h: number;
  tile_spacing: number;
  image_filename: string;
  animations: Array<TilekitAnimation>;
  tags: Array<TilekitTag>;
}

export interface TilekitAnimation {
  idx: number;
  rate: number;
  frames: Array<number>;
}

export interface TilekitTag {
  label: string;
  tiles: number[];
}

export interface TilekitObject {
  name: string;
  id: string;
  x: string;
  y: string;
  w: string;
  h: string;
  visible?: boolean;
  type?: string;
  properties: { [key: string]: string | number | boolean };
}
