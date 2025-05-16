import { Gfx2SpriteJSS } from '../gfx2_sprite/gfx2_sprite_jss';
import { Gfx2SpriteJAS } from '../gfx2_sprite/gfx2_sprite_jas';
import { Gfx2TileMap } from '../gfx2_tile/gfx2_tile_map';
import { Sound } from '../sound/sound_manager';
import { Motion } from '../motion/motion';
import { ScriptMachine } from '../script/script_machine';
import { AIPathGraph2D } from '../ai/ai_path_graph';
import { AIPathGrid2D } from '../ai/ai_path_grid';
import { EnginePackItemList } from './engine_pack_item_list';
/**
 * A package manager for 2D assets.
 */
declare class EnginePack2D {
    jsc: EnginePackItemList<ScriptMachine>;
    snd: EnginePackItemList<Sound>;
    tex: EnginePackItemList<ImageBitmap>;
    jss: EnginePackItemList<Gfx2SpriteJSS>;
    jas: EnginePackItemList<Gfx2SpriteJAS>;
    jtm: EnginePackItemList<Gfx2TileMap>;
    jlm: EnginePackItemList<Motion>;
    grf: EnginePackItemList<AIPathGraph2D>;
    grd: EnginePackItemList<AIPathGrid2D>;
    any: EnginePackItemList<any>;
    constructor();
    /**
     * Create a 2D pack from archive file.
     *
     * @param {string} path - The archive file path.
     */
    createFromFile(path: string): Promise<EnginePack2D>;
}
export { EnginePack2D };
