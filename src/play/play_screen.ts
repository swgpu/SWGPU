import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------

class PlayScreen extends Screen {
  constructor() {
    super();
  }

  async onEnter() {
    // alert('start your project here');
    // initialization codes.
  }

  onExit() {
    // release codes.
  }

  onUpdate(ts: number) {
    // update loop.
  }

  onDraw() {
    // draw loop.
  }
}

export { PlayScreen };