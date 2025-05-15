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
import { PackItemList } from './engine_pack';
declare class EnginePack3D {
    jsc: PackItemList<ScriptMachine>;
    snd: PackItemList<Sound>;
    tex: PackItemList<Gfx3Texture>;
    mat: PackItemList<Gfx3Material>;
    jam: PackItemList<Gfx3MeshJAM>;
    jsm: PackItemList<Gfx3MeshJSM>;
    obj: PackItemList<Gfx3MeshOBJ>;
    jas: PackItemList<Gfx3SpriteJAS>;
    jss: PackItemList<Gfx3SpriteJSS>;
    jwm: PackItemList<Gfx3PhysicsJWM>;
    jnm: PackItemList<Gfx3PhysicsJNM>;
    jlm: PackItemList<Motion>;
    jsv: PackItemList<Gfx3ShadowVolume>;
    jlt: PackItemList<Gfx3MeshLight>;
    grf: PackItemList<AIPathGraph3D>;
    grd: PackItemList<AIPathGrid3D>;
    any: PackItemList<any>;
    constructor();
    /**
     * Create a 3D pack from archive file.
     *
     * @param {string} path - The archive file path.
     */
    static createFromFile(path: string): Promise<EnginePack3D>;
}
export { EnginePack3D };
