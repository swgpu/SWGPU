import { gfx2Manager } from '../gfx2/gfx2_manager';
import { UT } from '../core/utils';
import { Gfx2SpriteJSS } from './gfx2_sprite_jss';

type ParallaxDirection = 'horizontal' | 'vertical';

class Gfx2ScrollingParallax {
  sprites: Array<Gfx2SpriteJSS>;
  direction: ParallaxDirection;
  lastCameraPosition: vec2 | null;
  distanceFactor: number;
  otherPosition: number;

  constructor(direction: ParallaxDirection, sprite: Gfx2SpriteJSS, distanceFactor: number = 1) {
    this.sprites = [];
    this.direction = direction;
    this.lastCameraPosition = null;
    this.distanceFactor = distanceFactor;
    this.otherPosition = 0;

    sprite.setOffsetNormalized(0.5, 0.5);
    const canvasSize = this.direction === 'horizontal' ? gfx2Manager.getWidth() : gfx2Manager.getHeight()
    const spriteSize = this.direction === 'horizontal' ? sprite.getTextureRectWidth() : sprite.getTextureRectHeight()
    const nbOfSprites = Math.ceil(canvasSize / spriteSize) + 1

    for (let i = 0; i < nbOfSprites; i++) {
      const clone = sprite.clone()
      if (this.direction === 'horizontal') {
        clone.position[0] = -canvasSize / 2 + i * spriteSize
      } else {
        clone.position[1] = -canvasSize / 2 + i * spriteSize
      }
      this.sprites.push(clone)
    }
  }

  setOtherAxis(position: number) {
    this.otherPosition = position
  }

  update() {
    const cameraPosition = gfx2Manager.cameraPosition
    if (this.lastCameraPosition) {
      // apply offset
      const offset = UT.VEC2_SUBSTRACT(cameraPosition, this.lastCameraPosition)

      for (const sprite of this.sprites) {
        if (this.direction === 'horizontal') {
          const newX = sprite.position[0] + offset[0] * this.distanceFactor
          sprite.setPosition(newX, this.otherPosition)
        } else {
          const newY = sprite.position[1] + offset[1] * this.distanceFactor
          sprite.setPosition(this.otherPosition, newY)
        }
      }
      // recycle sprites going off bounds
      for (const sprite of this.sprites) {
        if (this.direction === 'horizontal') {
          const rightBound = sprite.position[0] + sprite.getTextureRectWidth() / 2
          const leftBound = sprite.position[0] - sprite.getTextureRectWidth() / 2
          const screenHalfSize = gfx2Manager.getWidth() / 2
          const cameraPosition = gfx2Manager.cameraPosition[0]
          if (rightBound < cameraPosition - screenHalfSize) {
            const maxRight = Math.max(...this.sprites.map(s => s.position[0]))
            sprite.position[0] = maxRight + sprite.getTextureRectWidth()
          }
          if (leftBound > cameraPosition + screenHalfSize) {
            const maxLeft = Math.min(...this.sprites.map(s => s.position[0]))
            sprite.position[0] = maxLeft - sprite.getTextureRectWidth()
          }
        } else {
          const topBound = sprite.position[1] - sprite.getTextureRectHeight() / 2
          const bottomBound = sprite.position[1] + sprite.getTextureRectHeight() / 2
          const screenHalfSize = gfx2Manager.getHeight() / 2
          const cameraPosition = gfx2Manager.cameraPosition[1]
          if (topBound > cameraPosition + screenHalfSize) {
            const maxBottom = Math.min(...this.sprites.map(s => s.position[1]))
            sprite.position[1] = maxBottom - sprite.getTextureRectHeight()
          }
          if (bottomBound < cameraPosition - screenHalfSize) {
            const maxTop = Math.max(...this.sprites.map(s => s.position[1]))
            sprite.position[1] = maxTop + sprite.getTextureRectHeight()
          }
        }
      }
    }
    this.lastCameraPosition = UT.VEC2_COPY(cameraPosition)
  }

  draw() {
    for (const sprite of this.sprites) {
      sprite.draw()
    }
  }
}

export type { ParallaxDirection };
export { Gfx2ScrollingParallax };