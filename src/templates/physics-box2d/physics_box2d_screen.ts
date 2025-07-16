import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { PhysicsComponent, PhysicsSystem } from './physics';
import { GraphicsSystem } from './graphics';
import { EntityComponent } from './entity';
import { InputSystem } from './input';
// ---------------------------------------------------------------------------------------

class PhysicsBox2DScreen extends Screen {
  eid: number;

  constructor() {
    super();
    this.eid = 0;
  }

  async onEnter() {
    const input = new InputSystem();
    const physics = new PhysicsSystem();
    const graphics = new GraphicsSystem();
    dnaManager.setup([input, physics, graphics]);

    physics.createBox([0, 200], 1000, 10, false);
    physics.createEdge([-300, 0], [0, 20], false);
    this.eid = await this.#createEntityBox();
  }

  update(ts: number) {
    dnaManager.update(ts);
  }

  draw() {
    dnaManager.draw();
  }

  render() {
    gfx2Manager.beginRender();
    gfx2Manager.render();
    gfx2Manager.endRender();
  }

  async #createEntityBox(): Promise<number> {
    const eid = dnaManager.createEntity();

    const entity = new EntityComponent();
    entity.x = 0;
    entity.y = -200;
    dnaManager.addComponent(eid, entity);

    const physics = new PhysicsComponent();
    dnaManager.addComponent(eid, physics);

    return eid;
  }
}

export { PhysicsBox2DScreen };