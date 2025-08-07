import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { inputManager } from '@lib/input/input_manager';
import { gfx3TextureManager } from '@lib/gfx3/gfx3_texture_manager';
import { UT } from '@lib/core/utils';
import { MeshEffect } from '@lib/gfx3/gfx3_drawable';
import { Gfx3MeshJSM } from '@lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3PhysicsJWM } from '@lib/gfx3_physics/gfx3_physics_jwm';
import { Gfx3Material } from '@lib/gfx3_mesh/gfx3_mesh_material';
import { Motion } from '@lib/motion/motion';
import { ScriptMachine } from '@lib/script/script_machine';
import { UIDialog } from '@lib/ui_dialog/ui_dialog';
import { UIMenuText } from '@lib/ui_menu_text/ui_menu_text';
// ---------------------------------------------------------------------------------------
import { Spawn } from './spawn';
import { Model } from './model';
import { Trigger } from './trigger';
import { TrackingCamera } from './tracking_camera';
// ---------------------------------------------------------------------------------------

const CHAR_SPEED = 3;

class Room {
  constructor(zBuffer = false) {
    this.zBuffer = zBuffer;
    this.name = '';
    this.description = '';
    this.map = new Gfx3MeshJSM();
    this.mapZBuffer = new Gfx3MeshJSM();
    this.walkmesh = new Gfx3PhysicsJWM();
    this.controller = new Model();
    this.controllerWalker = {};
    this.camera = new TrackingCamera(0);
    this.scriptMachine = new ScriptMachine();
    this.spawns = [];
    this.models = [];
    this.motions = [];
    this.triggers = [];
    this.pause = false;
    this.motionModelMapping = new Map();

    this.scriptMachine.registerCommand('LOAD_ROOM', this.#loadRoom.bind(this));
    this.scriptMachine.registerCommand('CONTINUE', this.#continue.bind(this));
    this.scriptMachine.registerCommand('STOP', this.#stop.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_CHOICES', this.#uiCreateChoices.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_DIALOG', this.#uiCreateDialog.bind(this));
    this.scriptMachine.registerCommand('MODEL_PLAY_MOTION', this.#modelPlayMotion.bind(this));
    this.scriptMachine.registerCommand('MODEL_PLAY_ANIMATION', this.#modelPlayAnimation.bind(this));

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
    eventManager.subscribe(this.controller, 'E_MOVED', this, this.handleControllerMoved);
  }

  async loadFromFile(path, spawnName) {
    let response = await fetch(path);
    let json = await response.json();

    this.name = json['Name'];
    this.description = json['Description'];

    this.map = new Gfx3MeshJSM();
    this.map.setEffects(MeshEffect.CHANNEL2);
    await this.map.loadFromFile(json['MapFile']);
    this.map.mat.setTexture(await gfx3TextureManager.loadTexture(json['MapTextureFile'], {
      minFilter: 'nearest',
      magFilter: 'nearest'
    }));

    this.walkmesh = new Gfx3PhysicsJWM();
    await this.walkmesh.loadFromFile(json['WalkmeshFile']);
    await this.controller.loadFromData(json['Controller']);

    this.camera = new TrackingCamera(0);
    await this.camera.loadFromData(json['Camera']);
    this.camera.setTarget(this.controller);

    this.spawns = [];
    for (let obj of json['Spawns']) {
      let spawn = new Spawn();
      await spawn.loadFromData(obj);
      this.spawns.push(spawn);
    }

    this.models = [];
    for (let obj of json['Models']) {
      let model = new Model();
      await model.loadFromData(obj);
      this.models.push(model);
    }

    this.motions = [];
    for (let obj of json['Motions']) {
      const motion = new Motion();
      motion.setSpeed(CHAR_SPEED);
      motion.setPoints(obj['Points']);
      this.motions.push(motion);
    }

    this.triggers = [];
    for (let obj of json['Triggers']) {
      let trigger = new Trigger();
      await trigger.loadFromData(obj);
      this.triggers.push(trigger);
    }

    if (this.zBuffer) {
      this.mapZBuffer = new Gfx3MeshJSM();
      this.mapZBuffer.setEffects(MeshEffect.CHANNEL1);
      await this.mapZBuffer.loadFromFile(json['MapZBufferFile']);
      this.mapZBuffer.mat.setTexture(await gfx3TextureManager.loadTexture(json['MapZBufferTextureFile'], {
        minFilter: 'nearest',
        magFilter: 'nearest'
      }));
    }

    const spawn = this.spawns.find(spawn => spawn.getName() == spawnName);
    this.controller.setPosition(spawn.getPositionX(), spawn.getPositionY(), spawn.getPositionZ());
    this.controller.setRotation(0, UT.VEC2_ANGLE(spawn.getDirection()), 0);
    this.controllerWalker = this.walkmesh.addWalker('CONTROLLER', this.controller.getPositionX(), this.controller.getPositionZ(), this.controller.getRadius());

    await this.scriptMachine.loadFromFile(json['ScriptFile']);
    this.scriptMachine.jump('ON_INIT');
    this.scriptMachine.setEnabled(true);

    this.motionModelMapping.clear();
  }

  delete() {
    for (const model of this.models) {
      model.delete();
    }

    eventManager.unsubscribe(inputManager, 'E_ACTION_ONCE', this);
    eventManager.unsubscribe(this.controller, 'E_MOVED', this);
  }

  update(ts) {
    let moving = false;
    let moveDir = UT.VEC3_ZERO;

    if (inputManager.isActiveAction('LEFT')) {
      moveDir = UT.VEC3_ADD(moveDir, UT.VEC3_LEFT);
      moving = true;
    }
    if (inputManager.isActiveAction('RIGHT')) {
      moveDir = UT.VEC3_ADD(moveDir, UT.VEC3_RIGHT);
      moving = true;
    }
    if (inputManager.isActiveAction('UP')) {
      moveDir = UT.VEC3_ADD(moveDir, UT.VEC3_FORWARD);
      moving = true;
    }
    if (inputManager.isActiveAction('DOWN')) {
      moveDir = UT.VEC3_ADD(moveDir, UT.VEC3_BACKWARD);
      moving = true;
    }

    if (moving && !this.pause) {
      moveDir = UT.VEC3_NORMALIZE(moveDir);
      const moveX = moveDir[0] * CHAR_SPEED * (ts / 1000);
      const moveZ = moveDir[2] * CHAR_SPEED * (ts / 1000);
      this.controller.move(moveX, moveZ, true);
      this.controller.play('RUN');
    }
    else {
      this.controller.play('IDLE');
    }

    this.map.update(ts);
    this.walkmesh.update(ts);
    this.controller.update(ts);
    this.camera.update(ts);
    this.scriptMachine.update(ts);

    for (let model of this.models) {
      model.update(ts);
    }

    if (this.zBuffer) {
      this.mapZBuffer.update(ts);
    }

    for (const [motionIndex, modelIndex] of this.motionModelMapping.entries()) {
      let motion = this.motions[motionIndex];
      let model = this.models[modelIndex];
      model.setPosition(motion.getCurrentPositionX(), motion.getCurrentPositionY(), motion.getCurrentPositionZ());
      model.setRotation(0, motion.getCurrentRotationY(), 0);
      motion.update(ts);
    }
  }

  draw() {
    this.map.draw();
    this.walkmesh.draw();

    if (this.zBuffer) {
      this.mapZBuffer.draw();
    }

    this.controller.draw();



    for (let spawn of this.spawns) {
      spawn.draw();
    }

    for (let model of this.models) {
      model.draw();
    }

    for (let trigger of this.triggers) {
      trigger.draw();
    }
  }

  handleActionOnce(data) {
    if (data.actionId != 'OK' || this.pause) {
      return;
    }

    for (let trigger of this.triggers) {
      if (this.controller.isCollide(trigger)) {
        if (trigger.getOnActionBlockId()) {
          this.scriptMachine.jump(trigger.getOnActionBlockId());
          return;
        }
      }
    }

    for (let model of this.models) {
      if (this.controller.isHandCollide(model)) {
        if (model.getOnActionBlockId()) {
          this.scriptMachine.jump(model.getOnActionBlockId());
          return;
        }
      }
    }
  }

  handleControllerMoved({ old, moveX, moveZ }) {
    for (let model of this.models) {
      let velocityImpact = [];
      if (this.controller.isCollide(model, velocityImpact)) {
        moveX += velocityImpact[0];
        moveZ += velocityImpact[1];
        break;
      }
    }

    let navInfo = this.walkmesh.moveWalker(this.controllerWalker, moveX, moveZ);
    let newPos = UT.VEC3_ADD(old, navInfo.move);
    this.controller.setPosition(newPos[0], newPos[1], newPos[2]);

    for (let trigger of this.triggers) {
      let isCollide = this.controller.isCollide(trigger);
      if (trigger.getOnEnterBlockId() && !trigger.isHovered() && isCollide) {
        this.scriptMachine.jump(trigger.getOnEnterBlockId());
        trigger.setHovered(true);
      }
      else if (trigger.getOnLeaveBlockId() && trigger.isHovered() && !isCollide) {
        this.scriptMachine.jump(trigger.getOnLeaveBlockId());
        trigger.setHovered(false);
      }
    }
  }

  async #loadRoom(path, spawnName) {
    this.pause = true;
    await this.loadFromFile(path, spawnName);
    this.pause = false;
  }

  #continue() {
    this.pause = false;
  }

  #stop() {
    this.pause = true;
  }

  async #uiCreateChoices(author, text, choices = []) {
    this.scriptMachine.setEnabled(false);
    let uiDialog = new UIDialog();
    uiDialog.setAuthor(author);
    uiDialog.setText(text);
    uiManager.addWidget(uiDialog);
    await eventManager.wait(uiDialog, 'E_PRINT_FINISHED');

    let uiMenu = new UIMenuText();
    uiManager.addWidget(uiMenu, 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:12');
    for (let choice of choices) {
      uiMenu.add(0, choice['Text']);
    }

    uiManager.focus(uiMenu);
    let data = await eventManager.wait(uiMenu, 'E_ITEM_SELECTED');
    uiManager.removeWidget(uiDialog);
    uiManager.removeWidget(uiMenu);
    this.scriptMachine.jump(choices[data.index]['Jumpto']);
    this.scriptMachine.setEnabled(true);
  }

  async #uiCreateDialog(author, text) {
    this.scriptMachine.setEnabled(false);
    let uiDialog = new UIDialog();
    uiDialog.setAuthor(author);
    uiDialog.setText(text);

    uiManager.addWidget(uiDialog);
    uiManager.focus(uiDialog);
    await eventManager.wait(uiDialog, 'E_OK');
    uiManager.removeWidget(uiDialog);
    this.scriptMachine.setEnabled(true);
  }

  async #modelPlayMotion(motionIndex, modelIndex) {
    this.scriptMachine.setEnabled(false);
    this.motionModelMapping.set(motionIndex, modelIndex);
    this.motions[motionIndex].run();

    await eventManager.wait(this.motions[motionIndex], 'E_FINISHED');
    this.motionModelMapping.delete(motionIndex);
    this.scriptMachine.setEnabled(true);
  }

  #modelPlayAnimation(modelIndex, animationName, isLooped) {
    this.models[modelIndex].play(animationName);
  }
}

export { Room };