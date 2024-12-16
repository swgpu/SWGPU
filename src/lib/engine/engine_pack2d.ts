import JSZip from 'jszip';
import { gfx2TextureManager } from '../gfx2/gfx2_texture_manager';
import { soundManager } from '../sound/sound_manager';
// -----------------------------------------------------------------------------------------------
import { UT } from '../core/utils';
import { Gfx2SpriteJSS } from '../gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from '../gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from '../gfx2_tile/gfx2_tile_map';
import { Sound } from '../sound/sound_manager';
import { Motion } from '../motion/motion';
import { ScriptMachine } from '../script/script_machine';
import { AIPathGraph2D } from '../ai/ai_path_graph';
import { AIPathGrid2D } from '../ai/ai_path_grid';
import { PackItemList } from './engine_pack';

class EnginePack2D {
  jsc: PackItemList<ScriptMachine>;
  snd: PackItemList<Sound>;
  tex: PackItemList<ImageBitmap>;
  jss: PackItemList<Gfx2SpriteJSS>;
  jas: PackItemList<Gfx2SpriteJAS>;
  jtm: PackItemList<Gfx2TileMap>;
  jlm: PackItemList<Motion>;
  grf: PackItemList<AIPathGraph2D>;
  grd: PackItemList<AIPathGrid2D>;
  any: PackItemList<any>;

  constructor() {
    this.jsc = new PackItemList<ScriptMachine>;
    this.snd = new PackItemList<Sound>;
    this.tex = new PackItemList<ImageBitmap>;
    this.jss = new PackItemList<Gfx2SpriteJSS>;
    this.jas = new PackItemList<Gfx2SpriteJAS>;
    this.jtm = new PackItemList<Gfx2TileMap>;
    this.jlm = new PackItemList<Motion>;
    this.grf = new PackItemList<AIPathGraph2D>;
    this.grd = new PackItemList<AIPathGrid2D>;
    this.any = new PackItemList<any>;
  }

  /**
   * Create a 2D pack from archive file.
   * 
   * @param {string} path - The archive file path.
   */
  async createFromFile(path: string): Promise<EnginePack2D> {
    const res = await fetch(path);
    const zip = await JSZip.loadAsync(await res.blob());
    const pack = new EnginePack2D();

    // load texture first
    for (const entry of zip.file(/\.(jpg|jpeg|png|bmp)/)) {
      const infos = UT.GET_FILENAME_INFOS(entry.name);
      const file = zip.file(entry.name);

      if (file != null) {
        const url = URL.createObjectURL(await file.async('blob'));
        const tex = await gfx2TextureManager.loadTexture(url);
        pack.tex.push({ name: infos.name, ext: 'bitmap', object: tex, blobUrl: url });
      }
    }

    // load all others resources
    for (const entry of zip.file(/.*/)) {
      const infos = UT.GET_FILENAME_INFOS(entry.name);
      const file = zip.file(entry.name);
      
      if (file != null && infos.ext == 'mp3') {
        const url = URL.createObjectURL(await file.async('blob'));
        const snd = await soundManager.loadSound(url, entry.name);
        pack.snd.push({ name: infos.name, ext: 'mp3', object: snd, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsc') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsc = new ScriptMachine();
        await jsc.loadFromFile(url);
        pack.jsc.push({ name: infos.name, ext: 'jsc', object: jsc, blobUrl: url });
      }

      if (file != null && infos.ext == 'jss') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jss = new Gfx2SpriteJSS();
        await jss.loadFromFile(url);
        pack.jss.push({ name: infos.name, ext: 'jss', object: jss, blobUrl: url });
      }

      if (file != null && infos.ext == 'jas') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jas = new Gfx2SpriteJAS();
        await jas.loadFromFile(url);
        pack.jas.push({ name: infos.name, ext: 'jas', object: jas, blobUrl: url });
      }

      if (file != null && infos.ext == 'jtm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jtm = new Gfx2TileMap();
        await jtm.loadFromFile(url);
        pack.jtm.push({ name: infos.name, ext: 'jtm', object: jtm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jlm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromFile(url);
        pack.jlm.push({ name: infos.name, ext: 'jlm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'blm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlm = new Motion();
        await jlm.loadFromBinaryFile(url);
        pack.jlm.push({ name: infos.name, ext: 'blm', object: jlm, blobUrl: url });
      }

      if (file != null && infos.ext == 'grf') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grf = new AIPathGraph2D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: infos.name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && infos.ext == 'grd') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grd = new AIPathGrid2D();
        await grd.loadFromFile(url);
        pack.grd.push({ name: infos.name, ext: 'grd', object: grd, blobUrl: url });
      }

      if (file != null && infos.ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: infos.name, ext: 'any', object: data, blobUrl: '' });
      }
    }

    return pack;
  }
}

export { EnginePack2D };