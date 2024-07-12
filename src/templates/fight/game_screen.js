import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Screen } from '@lib/screen/screen';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { UISystem } from './systems/ui';
import { CameraSystem, CameraComponent } from './systems/camera';
import { IdleControlsSystem, IdleSystem, IdleControlsComponent, IdleComponent } from './systems/idle';
import { RunControlsSystem, RunSystem, RunControlsComponent } from './systems/run';
import { JumpControlsSystem, JumpSystem, JumpControlsComponent } from './systems/jump';
import { CASSystem, ComboSystem, CASComponent } from './systems/combo';
import { MoveSystem, MoveComponent } from './systems/move';
import { HitSystem } from './systems/hit';
import { DamageSystem } from './systems/damage';
import { DrawableSystem, DrawableComponent } from './systems/drawable';
import { FighterSystem, FighterComponent } from './systems/fighter';
import { SpecialAttackSystem } from './systems/special_attack';
import { PlatformComponent } from './systems/platform';
import { PositionComponent } from './systems/position';
import { VelocityComponent } from './systems/velocity';
import { AIComponent, AISystem } from './systems/ai';
import { DownSystem, DownControlsComponent, DownControlsSystem } from './systems/down';
import { ComboFactory } from './combo_factory';
import { AIPatternFactory } from './ai_pattern_factory';
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

    await CREATE_SCENE(args.map);
    await CREATE_PLAYER1(args.characters[0]);
    await CREATE_PLAYER2(args.characters[1]);
  }

  update(ts) {
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }
}

export { GameScreen };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

async function CREATE_SCENE(map) {
  const background = dnaManager.createEntity();
  const backgroundJSS = new Gfx2SpriteJSS();
  backgroundJSS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/backgrounds/' + map + '/layer.png'));
  backgroundJSS.setTextureRect(0, 0, 800, 600);
  dnaManager.addComponent(background, new DrawableComponent({ jss: backgroundJSS, zIndex: 0 }));
  dnaManager.addComponent(background, new PositionComponent(0, 0));

  const camera = dnaManager.createEntity();
  dnaManager.addComponent(camera, new CameraComponent());

  const jas = new Gfx2SpriteJAS();
  await jas.loadFromFile('templates/fight/backgrounds/' + map + '/floating-rock.jas');
  jas.setTexture(await gfx2TextureManager.loadTexture('templates/fight/backgrounds/' + map + '/floating-rock.png'));
  jas.setOffset(+52, +18);
  jas.play('DEFAULT', false, true);

  const platform = dnaManager.createEntity();
  dnaManager.addComponent(platform, new PositionComponent(220, 400));
  dnaManager.addComponent(platform, new PlatformComponent(395, 104, 37));
  dnaManager.addComponent(platform, new DrawableComponent({ jas: jas, zIndex: 1 }));
}

async function CREATE_PLAYER1(name) {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  damageJAS.setOffset(+44, +44);

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(1, 100, damageJAS, 88, 88));
  dnaManager.addComponent(player, new PositionComponent(190, 490));
  dnaManager.addComponent(player, new VelocityComponent());
  dnaManager.addComponent(player, new DrawableComponent({ jas: playerJAS, zIndex: 2 }));
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new IdleControlsComponent());
  dnaManager.addComponent(player, new RunControlsComponent());
  dnaManager.addComponent(player, new JumpControlsComponent());
  dnaManager.addComponent(player, new DownControlsComponent());
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new CASComponent(playerJAS.animations, playerJAS.texture, [
    await ComboFactory.PUNCH(name)
  ]));

  return player;
}

async function CREATE_PLAYER2(name) {
  const playerJAS = new Gfx2SpriteJAS();
  await playerJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  playerJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  playerJAS.setOffset(+44, +44);

  const damageJAS = new Gfx2SpriteJAS();
  await damageJAS.loadFromFile('templates/fight/chars/' + name + '/sprite.jas');
  damageJAS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + name + '/sprite.png'));
  damageJAS.setOffset(+44, +44);

  const player = dnaManager.createEntity();
  dnaManager.addComponent(player, new FighterComponent(2, 100, damageJAS, 88, 88));
  dnaManager.addComponent(player, new PositionComponent(490, 490));
  dnaManager.addComponent(player, new VelocityComponent());
  dnaManager.addComponent(player, new DrawableComponent({ jas: playerJAS, zIndex: 2 }));
  dnaManager.addComponent(player, new IdleComponent());
  dnaManager.addComponent(player, new MoveComponent());
  dnaManager.addComponent(player, new AIComponent(60, AIPatternFactory.BASE()));
  dnaManager.addComponent(player, new CASComponent(playerJAS.animations, playerJAS.texture, [
    await ComboFactory.PUNCH(name),
    await ComboFactory.SPECIAL(name)
  ]));

  return player;
}