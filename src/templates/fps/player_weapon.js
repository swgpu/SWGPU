import { gfx3MeshRenderer } from '@lib/gfx3_mesh/gfx3_mesh_renderer';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { UT } from '@lib/core/utils';
import { MeshEffect } from '@lib/gfx3/gfx3_drawable';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
// ---------------------------------------------------------------------------------------

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.mx = 0;
    this.my = 0;
    this.mz = 0;
    this.age = 0;
  }
}

export class PlayerWeapon {
  static OSCILLATION_LENGTH = 0.05;
  static OSCILLATION_RATE = 7;

  constructor(player, jnm) {
    this.player = player;
    this.jnm = jnm;
    this.mesh = new Gfx3MeshJSM();
    this.bulletMesh = new Gfx3MeshJSM();
    this.oscillation = 0;
    this.bullets = [];
    this.bulletSpeed = 25;
    this.bulletMaxAge = 5;
  }

  async load() {
    this.mesh = new Gfx3MeshJSM();
    this.mesh.setId(1.0, 0.0, MeshEffect.CHANNEL1);
    this.mesh.mat.setTexture(await gfx3TextureManager.loadTexture('./templates/fps/weapon.png'));
    await this.mesh.loadFromFile('./templates/fps/weapon.jsm');

    this.bulletMesh = new Gfx3MeshJSM();
    this.bulletMesh.mat.setTexture(await gfx3TextureManager.loadTexture('./templates/fps/bullet.png'));
    await this.bulletMesh.loadFromFile('./templates/fps/bullet.jsm');
  }

  delete() {
    this.mesh.delete();
    this.bulletMesh.delete();
  }

  update(ts) {
    if (this.player.dir[0] != 0 || this.player.dir[2] != 0) {
      this.oscillation += PlayerWeapon.OSCILLATION_RATE * (ts / 1000);
    }

    const oscillationY = Math.sin(this.oscillation) * PlayerWeapon.OSCILLATION_LENGTH * 0.5;
    this.mesh.setPosition(this.player.x, this.player.y + 0.5 + oscillationY, this.player.z);
    this.mesh.setRotation(this.player.rotation[0], this.player.rotation[1], this.player.rotation[2]);

    this.mesh.update(ts);
    this.bulletMesh.update(ts);

    for (const bullet of this.bullets) {
      bullet.x += bullet.mx * (ts / 1000);
      bullet.y += bullet.my * (ts / 1000);
      bullet.z += bullet.mz * (ts / 1000);
      bullet.age += ts / 1000;
    }

    this.bullets.filter(b => b.age >= this.bulletMaxAge);
  }

  draw() {
    this.mesh.draw();

    for (const bullet of this.bullets) {
      gfx3MeshRenderer.drawMesh(this.bulletMesh, UT.MAT4_TRANSLATE(bullet.x, bullet.y, bullet.z));
    }
  }

  shoot() {
    const forward = this.player.camera.rec.getAxis('FORWARD');
    const camPosition = this.player.camera.rec.getPosition();
    const ray = this.jnm.raycast(camPosition, forward, 100, 100);

    const camTransform = this.player.camera.rec.getTransformMatrix();
    const weaponWorldPosition = UT.MAT4_MULTIPLY_BY_VEC4(camTransform, [0.5, -0.2, 0, 1]);    
    let dir = [0, 0, 0];

    if (ray) {
      const weaponToHit = UT.VEC3_SUBSTRACT(ray.hit, weaponWorldPosition);
      dir = UT.VEC3_NORMALIZE(weaponToHit);  
    }
    else {
      const awayWorldPosition = UT.MAT4_MULTIPLY_BY_VEC4(camTransform, [0, 0, -100, 1]);
      const weaponToAway = UT.VEC3_SUBSTRACT(awayWorldPosition, weaponWorldPosition);
      dir = UT.VEC3_NORMALIZE(weaponToAway);
    }

    const bullet = new Bullet();
    bullet.x = weaponWorldPosition[0];
    bullet.y = weaponWorldPosition[1];
    bullet.z = weaponWorldPosition[2];
    bullet.mx = dir[0] * this.bulletSpeed;
    bullet.my = dir[1] * this.bulletSpeed;
    bullet.mz = dir[2] * this.bulletSpeed;
    this.bullets.push(bullet);
  }
}