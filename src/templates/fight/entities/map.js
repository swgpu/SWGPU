import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { CameraComponent } from '../systems/camera';
import { DrawableComponent } from '../systems/drawable';
import { PlatformComponent } from '../systems/platform';
import { PositionComponent } from '../systems/position';
import { ColliderComponent } from '../systems/collider';
// ---------------------------------------------------------------------------------------

export async function spawnMap(map) {
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
  dnaManager.addComponent(platform, new PlatformComponent(395));
  dnaManager.addComponent(platform, new ColliderComponent(104, 37));
  dnaManager.addComponent(platform, new DrawableComponent({ jas: jas, zIndex: 1 }));
}