import { gfx2TextureManager } from '@lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '@lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------
import { SpecialAttackComponent } from './systems/special_attack';
import { ComboComponent } from './systems/combo';
import { RunComponent } from './systems/run';
// ---------------------------------------------------------------------------------------

const ComboFactory = {
  PUNCH: async (charName) => {
    return new ComboComponent(
      'PUNCH',
      RunComponent,
      'OKOK', 
      'PUNCH1',
      null,
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
  },
  SPECIAL: async (charName) => {
    const bgJSS = new Gfx2SpriteJSS();
    bgJSS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + charName + '/bg-special-attack.png'));
  
    const avatarJSS = new Gfx2SpriteJSS();
    avatarJSS.setTexture(await gfx2TextureManager.loadTexture('templates/fight/chars/' + charName + '/avatar-special-attack.png'));
  
    return new ComboComponent(
      'SPECIAL',
      RunComponent, 
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
};

export { ComboFactory };