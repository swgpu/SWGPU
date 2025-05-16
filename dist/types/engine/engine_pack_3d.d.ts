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
declare class EnginePack3D {
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
    constructor();
    /**
     * Create a 3D pack from archive file.
     *
     * @param {string} path - The archive file path.
     */
    static createFromFile(path: string): Promise<EnginePack3D>;
}
export { EnginePack3D };
