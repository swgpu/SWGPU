import { dnaManager } from '@lib/dna/dna_manager';
import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { makeDebugDraw } from '@lib/gfx2_physics/gfx2_physics_box2d_debug.js';
import { Gfx2Box2D } from '@lib/gfx2_physics/gfx2_physics_box2d';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { EntityComponent } from './entity';
// ---------------------------------------------------------------------------------------

const maxTimeStepMs = 1 / 60 * 1000;
const pixelsPerMeter = 32;

export class PhysicsComponent extends DNAComponent {
  width: number;
  height: number;
  body?: Box2D.b2Body;

  constructor() {
    super('Physics');
    this.width = 100;
    this.height = 100;
  }
}

export class PhysicsSystem extends DNASystem {
  world: Box2D.b2World;

  constructor() {
    super();
    super.addRequiredComponentTypename('Physics');
    super.addRequiredComponentTypename('Entity');

    // Initialize Box2D
    this.world = new Gfx2Box2D.b2World(new Gfx2Box2D.b2Vec2(0.0, +60.0));

    // Initialize Box2D Debug
    const debugDraw = makeDebugDraw(gfx2Manager.getContext(), pixelsPerMeter, Gfx2Box2D);
    this.world.SetDebugDraw(debugDraw);
  }

  onEntityBind(eid: number): void {
    const physics = dnaManager.getComponent(eid, PhysicsComponent);
    const entity = dnaManager.getComponent(eid, EntityComponent);
    physics.body = this.createBox([entity.x, entity.y], physics.width, physics.height, true);
  }

  onBeforeUpdate(ts: number): void {
    const clampedDeltaMs = Math.min(ts, maxTimeStepMs);
    this.world.Step(clampedDeltaMs / 1000, 1, 1);
  }

  onAfterDraw(): void {
    gfx2Manager.drawCommand((ctx) => {
      this.world.DebugDraw();
    });
  }

  createBox(position: vec2, width: number, height: number, dynamic: boolean) {
    const bd = new Gfx2Box2D.b2BodyDef();
    bd.set_type(dynamic ? Gfx2Box2D.b2_dynamicBody : Gfx2Box2D.b2_staticBody);
    bd.set_position(UNWRAP_VEC2(position));

    const square = new Gfx2Box2D.b2PolygonShape();
    square.SetAsBox(width / 2, height / 2);

    const body = this.world.CreateBody(bd);
    body.CreateFixture(square, 1);
    body.SetTransform(UNWRAP_VEC2(position), 0);
    body.SetLinearVelocity(new Gfx2Box2D.b2Vec2(0, 0));
    body.SetAwake(true);
    body.SetEnabled(true);
    return body;
  }

  createEdge(a: vec2, b: vec2, dynamic: boolean) {
    const bd = new Gfx2Box2D.b2BodyDef();
    bd.set_type(dynamic ? Gfx2Box2D.b2_dynamicBody : Gfx2Box2D.b2_staticBody);

    const shape = new Gfx2Box2D.b2EdgeShape();
    shape.SetTwoSided(UNWRAP_VEC2(a), UNWRAP_VEC2(b));

    const zero = new Gfx2Box2D.b2Vec2(0, 0);
    const body = this.world.CreateBody(bd);
    body.CreateFixture(shape, 1);
    body.SetTransform(zero, 0);
    body.SetAwake(true);
    body.SetEnabled(true);
    return body;
  }

  remove(body: Box2D.b2Body | number) {
    this.world.DestroyBody(body);
  }
}

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

// function WRAP_VEC2(v: Box2D.b2Vec2): vec2 {
//   return [v.get_x(), v.get_y()];
// }

function UNWRAP_VEC2(v: vec2): Box2D.b2Vec2 {
  return new Gfx2Box2D.b2Vec2(v[0], v[1])
}