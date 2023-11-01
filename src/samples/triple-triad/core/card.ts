import { eventManager } from '../../../lib/core/event_manager';
import { Direction, ElementalType } from './enums';

//
// @Events:
// E_POINT_CHANGED
// E_POINTS_CHANGED
// E_OWNER_CHANGED
// E_MODIFIER_VALUES_CHANGED
// E_MODIFIER_VALUE_CHANGED
//
class Card {
  points: vec4;
  elementalType: ElementalType;
  name: string;
  owner: number;
  modifier: vec4;

  constructor() {
    this.points = [0, 0, 0, 0];
    this.elementalType = ElementalType.NONE
    this.name = '';
    this.owner = 1;
    this.modifier = [0, 0, 0, 0]
  }

  getValue(dir: Direction): number {
    return this.points[dir] + this.modifier[dir];
  }

  getName(): string {
    return this.name;
  }

  getOpposedValue(dir: Direction): number {
    return this.points[(dir + 2) % 4] +  this.modifier[(dir + 2) % 4];
  }

  getOwner() {
    return this.owner;
  }

  getPoints(): vec4 {
    return this.points;
  }

  setName(name: string): void {
    this.name = name;
  }

  setOwner(owner: number): void {
    this.owner = owner;
  }

  setPoint(dir: Direction, value: number): void {
    this.points[dir] = value;
    eventManager.emit(this, 'E_POINT_CHANGED', { dir, value });
  }

  setPoints(w: number, n: number, e: number, s: number): void {
    this.points[Direction.W] = w;
    this.points[Direction.N] = n;
    this.points[Direction.E] = e;
    this.points[Direction.S] = s;
    eventManager.emit(this, 'E_POINTS_CHANGED', { values: [w, n, e, s] });
  }

  setPointsArray(values: vec4): void {
    for (let dir = 0; dir < 4; dir++) {
      this.points[dir] = values[dir];
    }

    eventManager.emit(this, 'E_POINTS_CHANGED', { values });
  }

  flipPlayerOwner(): void {
    this.owner = this.owner == 1 ? 2 : 1;
    eventManager.emit(this, 'E_OWNER_CHANGED', { owner: this.owner });
  }

  modifyPoints(values: vec4): void {
    for (let dir = 0; dir < 4; dir++) {
      this.modifier[dir] += values[dir];
    }

    eventManager.emit(this, 'E_MODIFIER_VALUES_CHANGED', { values });
  }

  modifyPoint(value: number, dir: Direction): void {
    this.modifier[dir] += value;
    eventManager.emit(this, 'E_MODIFIER_VALUE_CHANGED', { dir, value });
  }

  restoreToDefault(): void {
    for (let i = 0; i < 4; i++) {
      this.modifier[i] = 0;
    }
  }
}

export { Card };