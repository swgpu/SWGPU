import JSZip from 'jszip';
// -----------------------------------------------------------------------------------------------
import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { soundManager } from '../sound/sound_manager';
import { UT } from '../core/utils';
import { Gfx3MeshJAM } from '../gfx3_mesh/gfx3_mesh_jam';
import { Gfx3MeshJSM } from '../gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3MeshOBJ } from '../gfx3_mesh/gfx3_mesh_obj';
import { Gfx3PhysicsJWM } from '../gfx3_physics/gfx3_physics_jwm';
import { Gfx3PhysicsJNM } from '../gfx3_physics/gfx3_physics_jnm';
import { Gfx3ShadowVolume } from '../gfx3_shadow_volume/gfx3_shadow_volume';
import { Gfx3MeshLight } from '../gfx3_mesh/gfx3_mesh_light';
import { AIPathGraph3D } from '../ai/ai_path_graph';
import { AIPathGrid3D } from '../ai/ai_path_grid';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3Material } from '../gfx3_mesh/gfx3_mesh_material';
import { Gfx3SpriteJAS } from '../gfx3_sprite/gfx3_sprite_jas';
import { Gfx3SpriteJSS } from '../gfx3_sprite/gfx3_sprite_jss';
import { Sound } from '../sound/sound_manager';
import { Motion } from '../motion/motion';
import { ScriptMachine } from '../script/script_machine';
import { EnginePackItemList } from './engine_pack_item_list';

/**
 * A package manager for 3D assets.
 */
class EnginePack3D {
  jsc: EnginePackItemList<ScriptMachine>;
  snd: EnginePackItemList<Sound>;
  tex: EnginePackItemList<Gfx3Texture>;
  mat: EnginePackItemList<Gfx3Material>;
  jam: EnginePackItemList<Gfx3MeshJAM>;
  jsm: EnginePackItemList<Gfx3MeshJSM>;
  obj: EnginePackItemList<Gfx3MeshOBJ>;
  jas: EnginePackItemList<Gfx3SpriteJAS>;
  jss: EnginePackItemList<Gfx3SpriteJSS>;
  jwm: EnginePackItemList<Gfx3PhysicsJWM>;
  jnm: EnginePackItemList<Gfx3PhysicsJNM>;
  jlm: EnginePackItemList<Motion>;
  jsv: EnginePackItemList<Gfx3ShadowVolume>;
  jlt: EnginePackItemList<Gfx3MeshLight>;
  grf: EnginePackItemList<AIPathGraph3D>;
  grd: EnginePackItemList<AIPathGrid3D>;
  any: EnginePackItemList<any>;

  constructor() {
    this.jsc = new EnginePackItemList<ScriptMachine>;
    this.snd = new EnginePackItemList<Sound>;
    this.tex = new EnginePackItemList<Gfx3Texture>;
    this.mat = new EnginePackItemList<Gfx3Material>;
    this.jam = new EnginePackItemList<Gfx3MeshJAM>;
    this.jsm = new EnginePackItemList<Gfx3MeshJSM>;
    this.obj = new EnginePackItemList<Gfx3MeshOBJ>;
    this.jas = new EnginePackItemList<Gfx3SpriteJAS>;
    this.jss = new EnginePackItemList<Gfx3SpriteJSS>;
    this.jwm = new EnginePackItemList<Gfx3PhysicsJWM>;
    this.jnm = new EnginePackItemList<Gfx3PhysicsJNM>;
    this.jlm = new EnginePackItemList<Motion>;
    this.jsv = new EnginePackItemList<Gfx3ShadowVolume>;
    this.jlt = new EnginePackItemList<Gfx3MeshLight>;
    this.grf = new EnginePackItemList<AIPathGraph3D>;
    this.grd = new EnginePackItemList<AIPathGrid3D>;
    this.any = new EnginePackItemList<any>;
  }

  /**
   * Create a 3D pack from archive file.
   * 
   * @param {string} path - The archive file path.
   */
  static async createFromFile(path: string): Promise<EnginePack3D> {
    const res = await fetch(path);
    const zip = await JSZip.loadAsync(await res.blob());
    const pack = new EnginePack3D();

    // load textures first
    for (const entry of zip.file(/\.(jpg|jpeg|png|bmp)/)) {
      const infos = UT.GET_FILENAME_INFOS(entry.name);
      const file = zip.file(entry.name);

      if (file != null) {
        const imageUrl = URL.createObjectURL(await file.async('blob'));
        const sampler: GPUSamplerDescriptor = {};
        let type = '';
        let is8Bit = false;

        const texFile = zip.file(infos.name + '.tex');
        if (texFile != null) {
          const json = JSON.parse(await texFile.async('string'));
          sampler.addressModeU = json['AddressModeU'];
          sampler.addressModeV = json['AddressMoveV'];
          sampler.addressModeW = json['AddressMoveW'];
          sampler.magFilter = json['MagFilter'];
          sampler.minFilter = json['MinFilter'];
          sampler.mipmapFilter = json['MipMapFilter'];
          sampler.lodMinClamp = json['LodMinClamp'];
          sampler.lodMaxClamp = json['LodMaxClamp'];
          sampler.compare = json['Compare'];
          sampler.maxAnisotropy = json['MaxAnisotropy'];
          type = json['Type'];
          is8Bit = json['Is8Bit'];
        }

        if (type == 'Mips') {
          const texture = await gfx3TextureManager.loadTextureMips(imageUrl, sampler, is8Bit, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else if (type == 'Cubemap') {
          const texture = await gfx3TextureManager.loadCubemapTexture(imageUrl, infos.ext, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
        else {
          const texture = await gfx3TextureManager.loadTexture(imageUrl, sampler, is8Bit, entry.name);
          pack.tex.push({ name: infos.name, ext: 'bitmap', object: texture, blobUrl: imageUrl });
        }
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

      if (file != null && infos.ext == 'mat') {
        const url = URL.createObjectURL(await file.async('blob'));
        const mat = await Gfx3Material.createFromFile(url);
        pack.mat.push({ name: infos.name, ext: 'mat', object: mat, blobUrl: url });
      }

      if (file != null && infos.ext == 'jam') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jam = new Gfx3MeshJAM();
        await jam.loadFromFile(url);
        pack.jam.push({ name: infos.name, ext: 'jam', object: jam, blobUrl: url });
      }

      if (file != null && infos.ext == 'bam') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jam = new Gfx3MeshJAM();
        await jam.loadFromBinaryFile(url);
        pack.jam.push({ name: infos.name, ext: 'bam', object: jam, blobUrl: url });
      }

      if (file != null && infos.ext == 'jsm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromFile(url);
        pack.jsm.push({ name: infos.name, ext: 'jsm', object: jsm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bsm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsm = new Gfx3MeshJSM();
        await jsm.loadFromBinaryFile(url);
        pack.jsm.push({ name: infos.name, ext: 'bsm', object: jsm, blobUrl: url });
      }

      if (file != null && infos.ext == 'obj') {
        const url = URL.createObjectURL(await file.async('blob'));
        const mtlFile = zip.file(infos.name + '.mtl');
        if (mtlFile != null) {
          const mtlUrl = URL.createObjectURL(await mtlFile.async('blob'));
          const obj = new Gfx3MeshOBJ();
          await obj.loadFromFile(url, mtlUrl);
          pack.obj.push({ name: infos.name, ext: 'obj', object: obj, blobUrl: url });
        }
      }

      if (file != null && infos.ext == 'jas') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jas = new Gfx3SpriteJAS();
        await jas.loadFromFile(url);
        pack.jas.push({ name: infos.name, ext: 'jas', object: jas, blobUrl: url });
      }

      if (file != null && infos.ext == 'jss') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jss = new Gfx3SpriteJSS();
        await jss.loadFromFile(url);
        pack.jss.push({ name: infos.name, ext: 'jss', object: jss, blobUrl: url });
      }

      if (file != null && infos.ext == 'jwm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromFile(url);
        pack.jwm.push({ name: infos.name, ext: 'jwm', object: jwm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bwm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jwm = new Gfx3PhysicsJWM();
        await jwm.loadFromBinaryFile(url);
        pack.jwm.push({ name: infos.name, ext: 'bwm', object: jwm, blobUrl: url });
      }

      if (file != null && infos.ext == 'jnm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromFile(url);
        pack.jnm.push({ name: infos.name, ext: 'jnm', object: jnm, blobUrl: url });
      }

      if (file != null && infos.ext == 'bnm') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jnm = new Gfx3PhysicsJNM();
        await jnm.loadFromBinaryFile(url);
        pack.jnm.push({ name: infos.name, ext: 'bnm', object: jnm, blobUrl: url });
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

      if (file != null && infos.ext == 'jsv') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromFile(url);
        pack.jsv.push({ name: infos.name, ext: 'jsv', object: jsv, blobUrl: url });
      }

      if (file != null && infos.ext == 'bsv') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jsv = new Gfx3ShadowVolume();
        await jsv.loadFromBinaryFile(url);
        pack.jsv.push({ name: infos.name, ext: 'bsv', object: jsv, blobUrl: url });
      }

      if (file != null && infos.ext == 'jlt') {
        const url = URL.createObjectURL(await file.async('blob'));
        const jlt = new Gfx3MeshLight();
        await jlt.loadFromFile(url);
        pack.jlt.push({ name: infos.name, ext: 'jlt', object: jlt, blobUrl: url });
      }

      if (file != null && infos.ext == 'grf') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grf = new AIPathGraph3D();
        await grf.loadFromFile(url);
        pack.grf.push({ name: infos.name, ext: 'grf', object: grf, blobUrl: url });
      }

      if (file != null && infos.ext == 'grd') {
        const url = URL.createObjectURL(await file.async('blob'));
        const grd = new AIPathGrid3D();
        await grd.loadFromFile(url);
        pack.grd.push({ name: infos.name, ext: 'grd', object: grd, blobUrl: url });
      }

      if (file != null && infos.ext == 'any') {
        const data = JSON.parse(await file.async('string'));
        pack.any.push({ name: infos.name, ext: 'any', object: data, blobUrl: '' });
      }
    }

    for (const item of [...pack.jsm, ...pack.jam]) {
      item.object.setMaterial(pack.mat.get(item.name));
    }

    return pack;
  }
}

export { EnginePack3D };