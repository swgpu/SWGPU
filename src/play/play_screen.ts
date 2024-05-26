import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------

class PlayScreen extends Screen {
  constructor() {
    super();
  }

  async onEnter() {
    alert('start your project here');
    // initialization codes.
  }

  onExit() {
    // release codes.
  }

  update(ts: number) {
    // update loop.
  }

  draw() {
    // draw loop.
  }
}

export { PlayScreen };