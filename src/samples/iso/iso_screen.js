import { Screen } from '../../lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { Room } from './room';

class IsoScreen extends Screen {
  constructor() {
    super();
    this.room = new Room();
  }

  async onEnter() {
    await this.room.loadFromFile('./samples/iso/scene.room', 'Spawn0000');
  }

  update(ts) {
    this.room.update(ts);
  }

  draw() {
    this.room.draw();
  }
}

export { IsoScreen };