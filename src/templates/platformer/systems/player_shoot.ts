import { inputManager } from '@lib/input/input_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { DNASystem } from '@lib/dna/dna_system';
import { Gfx2SpriteJAS } from '@lib/gfx2_sprite/gfx2_sprite_jas';
// ---------------------------------------------------------------------------------------
import { spawnBullet } from '../entities/bullet';
import { Player } from '../components/player';
import { Position } from '../components/position';
import { Drawable } from '../components/drawable';
// ---------------------------------------------------------------------------------------

export class PlayerShootSystem extends DNASystem {
  constructor() {
    super();
    this.addRequiredComponentTypename('Player');
  }

  onEntityUpdate(ts: number, eid: number) {
    const pos = dnaManager.getComponent(eid, Position);
    const drawable = dnaManager.getComponent(eid, Drawable<Gfx2SpriteJAS>);
    const player = dnaManager.getComponent(eid, Player);

    // reset shooting after animation is finished
    const canShoot = player.lastShot === null || Date.now() >= player.lastShot + player.shootingDuration;
    const currentAnimation = drawable.sprite.getCurrentAnimation();

    if (canShoot) {
      player.shooting = false;
    }

    if (canShoot && inputManager.isJustActiveAction('OK')) {
      if (currentAnimation?.name === 'idle') {
        drawable.sprite.play('shoot', false); // only play shooting animation when not moving
      }

      const isCrouching = currentAnimation?.name === 'crouch';
      const bulletOriginY = isCrouching ? pos.y + 2 : pos.y;
      spawnBullet(pos.x, bulletOriginY, drawable.sprite.getFlipX());
      player.shooting = true;
      player.lastShot = Date.now();
    }
  }
}