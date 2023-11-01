import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { inputManager } from '../../lib/input/input_manager';
import { gfx3TextureManager } from '../../lib/gfx3/gfx3_texture_manager';
import { UT } from '../../lib/core/utils';
import { Gfx3MeshJSM } from '../../lib/gfx3_mesh/gfx3_mesh_jsm';
import { Gfx3JWM } from '../../lib/gfx3_jwm/gfx3_jwm';
import { Gfx3Material } from '../../lib/gfx3_mesh/gfx3_mesh_material';
import { ScriptMachine } from '../../lib/script/script_machine';
import { UIBubble } from '../../lib/ui_bubble/ui_bubble';
// ---------------------------------------------------------------------------------------
import { Spawn } from './spawn';
import { Model } from './model';
import { Trigger } from './trigger';
import { TrackingCamera } from './tracking_camera';
import { DIRECTION, DIRECTION_TO_VEC3 } from './enums';
// ---------------------------------------------------------------------------------------

const CHAR_SPEED = 1;

class Room {
  constructor() {
    this.name = '';
    this.description = '';
    this.map = new Gfx3MeshJSM();
    this.walkmesh = new Gfx3JWM();
    this.controller = new Model();
    this.camera = new TrackingCamera(0);
    this.scriptMachine = new ScriptMachine();
    this.spawns = [];
    this.models = [];
    this.triggers = [];
    this.pause = false;

    this.scriptMachine.registerCommand('LOAD_ROOM', this.$loadRoom.bind(this));
    this.scriptMachine.registerCommand('CONTINUE', this.$continue.bind(this));
    this.scriptMachine.registerCommand('STOP', this.$stop.bind(this));
    this.scriptMachine.registerCommand('UI_CREATE_DIALOG', this.$uiCreateDialog.bind(this));
    this.scriptMachine.registerCommand('MODEL_PLAY_ANIMATION', this.$modelPlayAnimation.bind(this));

    eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
    eventManager.subscribe(this.controller, 'E_MOVED', this, this.handleControllerMoved);
  }

  async loadFromFile(path, spawnName) {
    let response = await fetch(path);
    let json = await response.json();

    this.map = new Gfx3MeshJSM();
    await this.map.loadFromFile(json['MapFile']);
    this.map.setMaterial(new Gfx3Material({ texture: await gfx3TextureManager.loadTexture(json['MapTextureFile'], { magFilter: 'nearest' }) }));

    this.walkmesh = new Gfx3JWM();
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

    this.triggers = [];
    for (let obj of json['Triggers']) {
      let trigger = new Trigger();
      await trigger.loadFromData(obj);
      this.triggers.push(trigger);
    }

    let spawn = this.spawns.find(spawn => spawn.getName() == spawnName);
    this.controller.setPosition(spawn.getPositionX(), spawn.getPositionY(), spawn.getPositionZ());
    this.controller.setDirection(spawn.getDirection());
    this.controller.play('IDLE_' + spawn.getDirection(), true, true);
    this.walkmesh.addWalker('CONTROLLER', this.controller.getPositionX(), this.controller.getPositionZ(), this.controller.getRadius());

    await this.scriptMachine.loadFromFile(json['ScriptFile']);
    this.scriptMachine.jump('ON_INIT');
    this.scriptMachine.setEnabled(true);
  }

  delete() {
    for (const model of this.models) {
      model.delete();
    }

    this.map.delete();

    eventManager.unsubscribe(inputManager, 'E_ACTION_ONCE', this);
    eventManager.unsubscribe(this.controller, 'E_MOVED', this);
  }

  update(ts) {
    let direction = DIRECTION.FORWARD;
    let moving = false;

    if (inputManager.isActiveAction('LEFT')) {
      moving = true;
      direction = DIRECTION.LEFT;
    }
    else if (inputManager.isActiveAction('RIGHT')) {
      moving = true;
      direction = DIRECTION.RIGHT;
    }
    else if (inputManager.isActiveAction('UP')) {
      moving = true;
      direction = DIRECTION.FORWARD;
    }
    else if (inputManager.isActiveAction('DOWN')) {
      moving = true;
      direction = DIRECTION.BACKWARD;
    }

    if (moving && !this.pause) {
      const moveX = DIRECTION_TO_VEC3[direction][0] * CHAR_SPEED * (ts / 1000);
      const moveZ = DIRECTION_TO_VEC3[direction][2] * CHAR_SPEED * (ts / 1000);
      this.controller.move(moveX, moveZ, direction);
      this.controller.play('RUN_' + direction, true);
    }
    else {
      this.controller.play('IDLE_' + this.controller.getDirection(), true);
    }

    this.walkmesh.update(ts);
    this.controller.update(ts);
    this.camera.update(ts);
    this.scriptMachine.update(ts);

    for (let model of this.models) {
      model.update(ts);
    }
  }

  draw() {
    for (let spawn of this.spawns) {
      spawn.draw();
    }

    for (let model of this.models) {
      model.draw();
    }

    for (let trigger of this.triggers) {
      trigger.draw();
    }

    this.map.draw();
    this.walkmesh.draw();
    this.controller.draw();
  }

  handleActionOnce(data) {
    if (data.actionId != 'OK' || this.pause) {
      return;
    }

    for (let trigger of this.triggers) {
      if (this.controller.isCollideTrigger(trigger)) {
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
      if (this.controller.isCollideModel(model)) {
        this.controller.setPosition(old[0], old[1], old[2]);
        return;
      }
    }

    let move = this.walkmesh.moveWalker('CONTROLLER', moveX, moveZ);
    let newPos = UT.VEC3_ADD(old, move);
    this.controller.setPosition(newPos[0], newPos[1], newPos[2]);

    for (let trigger of this.triggers) {
      let isCollide = this.controller.isCollideTrigger(trigger);
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

  async $loadRoom(path, spawnName) {
    this.controller.setControllable(false);
    await this.loadFromFile(path, spawnName);
    this.controller.setControllable(true);
  }

  $continue() {
    this.pause = false;
  }

  $stop() {
    this.pause = true;
  }

  async $uiCreateDialog(author, picture, text, width, x, y) {
    this.scriptMachine.setEnabled(false);
    let uiBubble = new UIBubble();

    uiBubble.setAuthor(author);
    uiBubble.setPicture(picture);
    uiBubble.setText(text);
    uiBubble.setWidth(width);

    uiManager.addWidget(uiBubble, `position:absolute; top:${y}; left:${x}`);
    uiManager.focus(uiBubble);

    await eventManager.wait(uiBubble, 'E_OK');
    uiManager.removeWidget(uiBubble);
    this.scriptMachine.setEnabled(true);
  }

  $modelPlayAnimation(modelIndex, animationName, isLooped) {
    let model = this.models[modelIndex];
    model.play(animationName, isLooped);
  }
}

export { Room };