import { Gfx2SpriteJSS } from '../gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from '../gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from '../gfx2_tile/gfx2_tile_map';
import { Sound } from '../sound/sound_manager';
import { Motion } from '../motion/motion';
import { ScriptMachine } from '../script/script_machine';
import { AIPathGraph2D } from '../ai/ai_path_graph';
import { AIPathGrid2D } from '../ai/ai_path_grid';
import { PackItemList } from './engine_pack';
declare class EnginePack2D {
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
    constructor();
    /**
     * Create a 2D pack from archive file.
     *
     * @param {string} path - The archive file path.
     */
    createFromFile(path: string): Promise<EnginePack2D>;
}
export { EnginePack2D };
