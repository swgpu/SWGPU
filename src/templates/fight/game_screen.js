import { dnaManager } from '@lib/dna/dna_manager';
import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { spawnMap } from './entities/map';
import { spawnPlayer } from './entities/player';
import { spawnAI } from './entities/ai';
import { UISystem } from './systems/ui';
import { CameraSystem } from './systems/camera';
import { IdleControlsSystem, IdleSystem } from './systems/idle';
import { RunControlsSystem, RunSystem } from './systems/run';
import { JumpControlsSystem, JumpSystem } from './systems/jump';
import { CASSystem, ComboSystem } from './systems/combo';
import { MoveSystem } from './systems/move';
import { HitSystem } from './systems/hit';
import { DamageSystem } from './systems/damage';
import { DrawableSystem } from './systems/drawable';
import { FighterSystem } from './systems/fighter';
import { SpecialAttackSystem } from './systems/special_attack';
import { AISystem } from './systems/ai';
import { DownSystem, DownControlsSystem } from './systems/down';
// ---------------------------------------------------------------------------------------

class GameScreen extends Screen {
  constructor() {
    super();
    this.systems = {};
  }

  async onEnter(args = { map, characters }) {
    dnaManager.setup([
      new UISystem(args.characters),
      new CameraSystem(800, 600),
      new IdleControlsSystem(),
      new IdleSystem(),
      new RunControlsSystem(),
      new RunSystem(),
      new JumpControlsSystem(),
      new JumpSystem(),
      new DownControlsSystem(),
      new DownSystem(),
      new CASSystem(),
      new ComboSystem(),
      new FighterSystem(),
      new MoveSystem(800, 600),
      new HitSystem(),
      new DamageSystem(),
      new DrawableSystem(),
      new SpecialAttackSystem(this),
      new AISystem()
    ]);

    await spawnMap(args.map);
    await spawnPlayer(args.characters[0]);
    await spawnAI(args.characters[1]);
  }

  update(ts) {
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }
}

export { GameScreen };