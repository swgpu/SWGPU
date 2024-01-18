import { dnaManager } from '../../lib/dna/dna_manager';
import { gfx2TextureManager } from '../../lib/gfx2/gfx2_texture_manager';
import { Screen } from '../../lib/screen/screen';
import { Gfx2SpriteJAS } from '../../lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2SpriteJSS } from '../../lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { Config } from './config';
import { UISystem } from './systems/ui';
import { CameraSystem, CameraComponent } from './systems/camera';
import { IdleControlsSystem, IdleSystem, IdleControlsComponent, IdleComponent } from './systems/idle';
import { RunControlsSystem, RunSystem, RunControlsComponent } from './systems/run';
import { JumpControlsSystem, JumpSystem, JumpControlsComponent } from './systems/jump';
import { CASSystem, ComboSystem, CASComponent, ComboComponent } from './systems/combo';
import { MoveSystem, MoveComponent } from './systems/move';
import { GravitySystem, GravityComponent } from './systems/gravity';
import { HitSystem } from './systems/hit';
import { DamageSystem } from './systems/damage';
import { DrawableSystem, DrawableComponent } from './systems/drawable';
import { FighterSystem, FighterComponent } from './systems/fighter';
import { SpecialAttackSystem, SpecialAttackComponent } from './systems/special_attack';
import { PlatformComponent } from './systems/platform';
import { PositionComponent } from './systems/position';
import { AIComponent, AISystem } from './systems/ai';
import { DownSystem, DownControlsComponent, DownControlsSystem } from './systems/down';
// ---------------------------------------------------------------------------------------

const FPS = 60;
const MS_PER_FRAME = 1000 / FPS;

class GameScreen extends Screen {
  constructor() {
    super();
    this.elapsedTime = 0;
    this.systems = {};
  }

  async onEnter(args = { map, characters }) {
    this.systems['ui'] = new UISystem(args.characters);
    this.systems['camera'] = new CameraSystem(800, 600);
    this.systems['idleCtrl'] = new IdleControlsSystem();
    this.systems['idle'] = new IdleSystem();
    this.systems['runCtrl'] = new RunControlsSystem();
    this.systems['run'] = new RunSystem();
    this.systems['jumpCtrl'] = new JumpControlsSystem();
    this.systems['jump'] = new JumpSystem();
    this.systems['downCtrl'] = new DownControlsSystem();
    this.systems['down'] = new DownSystem();
    this.systems['cas'] = new CASSystem();
    this.systems['combo'] = new ComboSystem();
    this.systems['fighter'] = new FighterSystem(800, 600);
    this.systems['gravity'] = new GravitySystem();
    this.systems['move'] = new MoveSystem();
    this.systems['hit'] = new HitSystem();
    this.systems['damage'] = new DamageSystem();
    this.systems['specialAttack'] = new SpecialAttackSystem(this);
    this.systems['drawable'] = new DrawableSystem();
    this.systems['ai'] = new AISystem();

    dnaManager.setup(Object.values(this.systems));

    await CREATE_SCENE(args.map);
    await CREATE_PLAYER1(args.characters[0]);
    await CREATE_PLAYER2(args.characters[1]);
  }

  update(ts) {
    if (this.elapsedTime > MS_PER_FRAME) {
      dnaManager.update(this.elapsedTime);
      this.elapsedTime = 0;
    }

    this.elapsedTime += ts;
  }

  draw() {
    dnaManager.draw();
  }

  pause() {
    this.systems['ui'].pause();
    this.systems['camera'].pause();
    this.systems['idleCtrl'].pause();
    this.systems['idle'].pause();
    this.systems['runCtrl'].pause();
    this.systems['run'].pause();
    this.systems['jumpCtrl'].pause();
    this.systems['jump'].pause();
    this.systems['downCtrl'].pause();
    this.systems['down'].pause();
    this.systems['cas'].pause();
    this.systems['combo'].pause();
    this.systems['fighter'].pause();
    this.systems['gravity'].pause();
    this.systems['move'].pause();
    this.systems['hit'].pause();
    this.systems['damage'].pause();
    this.systems['ai'].pause();
  }

  resume() {
    this.systems['ui'].resume();
    this.systems['camera'].resume();
    this.systems['idleCtrl'].resume();
    this.systems['idle'].resume();
    this.systems['runCtrl'].resume();
    this.systems['run'].resume();
    this.systems['jumpCtrl'].resume();
    this.systems['jump'].resume();
    this.systems['downCtrl'].pause();
    this.systems['down'].pause();
    this.systems['cas'].resume();
    this.systems['combo'].resume();
    this.systems['fighter'].resume();
    this.systems['gravity'].resume();
    this.systems['move'].resume();
    this.systems['hit'].resume();
    this.systems['damage'].resume();
    this.systems['ai'].resume();
  }
}

export { GameScreen };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

async function CREATE_SCENE(map) {
  const background = dnaManager.createEntity();
  const backgroundJSS = new Gfx2SpriteJSS();
  backgroundJSS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_BACKGROUNDS + map + '/layer.png'));
  backgroundJSS.setTextureRect(0, 0, 800, 600);
  dnaManager.addComponent(background, new DrawableComponent({ jss: backgroundJSS, zIndex: 0 }));
  dnaManager.addComponent(background, new PositionComponent(0, 0));

  const camera = dnaManager.createEntity();
  dnaManager.addComponent(camera, new CameraComponent());

  const jas = new Gfx2SpriteJAS();
  await jas.loadFromFile(Config.PATH_BACKGROUNDS + map + '/floating-rock.jas');
  jas.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_BACKGROUNDS + map + '/floating-rock.png'));
  jas.setOffset(+52, +18);
  jas.play('DEFAULT', false, true);

  const platform = dnaManager.createEntity();
  dnaManager.addComponent(platform, new PositionComponent(220, 400));
  dnaManager.addComponent(platform, new PlatformComponent(395, 104, 37));
  dnaManager.addComponent(platform, new DrawableComponent({ jas: jas, zIndex: 1 }));
}

async function CREATE_PLAYER1(name) {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile(Config.PATH_CHARS + name + '/sprite.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + name + '/sprite.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile(Config.PATH_CHARS + name + '/sprite.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + name + '/sprite.png'));
  damageJAS.setOffset(+44, +44);

  const combos = [];
  combos.push(await CREATE_COMBO1(name));

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(1, 100, damageJAS, 88, 88));
  dnaManager.addComponent(player, new PositionComponent(190, 490));
  dnaManager.addComponent(player, new DrawableComponent({ jas: playerJAS, zIndex: 2 }));
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new IdleControlsComponent());
  dnaManager.addComponent(player, new RunControlsComponent());
  dnaManager.addComponent(player, new JumpControlsComponent());
  dnaManager.addComponent(player, new DownControlsComponent());
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new GravityComponent(2));
  dnaManager.addComponent(player, new CASComponent(playerJAS.animations, playerJAS.texture, combos));
  return player;
}

async function CREATE_PLAYER2(name) {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile(Config.PATH_CHARS + name + '/sprite.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + name + '/sprite.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile(Config.PATH_CHARS + name + '/sprite.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + name + '/sprite.png'));
  damageJAS.setOffset(+44, +44);

  const patterns = [{
    name: 'WAKE_UP',
    agentHasComponent: 'Down',
    enemyAction: null,
    enemyMinDistance: 0,
    enemyMaxDistance: Infinity,
    tick: 100,
    then: 0,
    percentSuccess: 100,
    commandName: 'CMD_WAKEUP',
    commandArgs: [],
    conditionName: null,
    conditionArgs: []
  },{
    name: 'COMBO1',
    agentHasComponent: null,
    enemyAction: null,
    enemyMinDistance: 0,
    enemyMaxDistance: 80,
    tick: 6000,
    then: 0,
    percentSuccess: 80,
    commandName: 'CMD_COMBO',
    commandArgs: ['PUNCH1'],
    conditionName: null,
    conditionArgs: []
  },{
    name: 'IDLE',
    agentHasComponent: null,
    enemyAction: null,
    enemyMinDistance: 0,
    enemyMaxDistance: 90,
    tick: 50,
    then: 0,
    percentSuccess: 100,
    commandName: 'CMD_IDLE',
    commandArgs: [],
    conditionName: null,
    conditionArgs: []
  },{
    name: 'RUN',
    agentHasComponent: null,
    enemyAction: null,
    enemyMinDistance: 90,
    enemyMaxDistance: Infinity,
    tick: 1500,
    then: 0,
    percentSuccess: 100,
    commandName: 'CMD_RUN',
    commandArgs: [],
    conditionName: null,
    conditionArgs: []
  }];

  const combos = [];
  combos.push(await CREATE_COMBO1(name));

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(2, 100, damageJAS, 88, 88));
  dnaManager.addComponent(player, new PositionComponent(490, 490));
  dnaManager.addComponent(player, new DrawableComponent({ jas: playerJAS, zIndex: 2 }));
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new GravityComponent(2));
  dnaManager.addComponent(player, new AIComponent(60, patterns));
  dnaManager.addComponent(player, new CASComponent(playerJAS.animations, playerJAS.texture, combos));

  return player;
}

async function CREATE_COMBO1(charName) {
  const bgJSS = new Gfx2SpriteJSS();
  bgJSS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + charName + '/bg-special-attack.png'));

  const avatarJSS = new Gfx2SpriteJSS();
  avatarJSS.setTexture(await gfx2TextureManager.loadTexture(Config.PATH_CHARS + charName + '/avatar-special-attack.png'));

  return new ComboComponent(
    'PUNCH1',
    'Run', 
    'OKOK', 
    'PUNCH1',
    new SpecialAttackComponent(
      'Special Attack 1',
      bgJSS,
      avatarJSS
    ),
    [{
      spriteAnimationOnImpact: 'HIT',
      frameIndex: 0,
      w: 10,
      h: 10,
      damageHP: 10,
      damageMaxAge: 1,
      damageSpriteAnimation: 'HIT',
      damageSpriteOffset: [21, 29],
      maxAge: 0.2,
      relativeX: 44,
      relativeY: 0,
      velocityImpact: [10, -10]
    }]
  );
}