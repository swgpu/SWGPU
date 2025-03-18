import { uiManager } from '@lib/ui/ui_manager';
import { inputManager } from '@lib/input/input_manager';
import { screenManager } from '@lib/screen/screen_manager';
import { soundManager } from '@lib/sound/sound_manager';
import { Screen } from '@lib/screen/screen';
// ---------------------------------------------------------------------------------------
import { GameScreen } from './game_screen';
// ---------------------------------------------------------------------------------------

class GameOverScreen extends Screen {
  gameOverText: HTMLDivElement;
  scoreText: HTMLDivElement;
  restartText: HTMLDivElement;

  constructor() {
    super();
    this.gameOverText = document.createElement('div');
    this.scoreText = document.createElement('div');
    this.restartText = document.createElement('div');
  }

  async onEnter(data: { score: number }) {
    await soundManager.loadSound('./templates/shootemup/game-over.wav');
    soundManager.playSound('./templates/shootemup/game-over.wav', false);

    this.gameOverText.textContent = 'Game Over!';
    const highScore = Number.parseInt(localStorage.getItem('highScore') || '0');
    if (data.score > highScore) {
      localStorage.setItem('highScore', data.score.toString());
      this.scoreText.textContent = `Score: ${ data.score }\u00A0\u00A0\u00A0\u00A0High Score: ${ data.score }`;
    } else {
      this.scoreText.textContent = `Score: ${ data.score }\u00A0\u00A0\u00A0\u00A0High Score: ${ highScore }`;
    }
    this.restartText.textContent = 'Press Enter to play again.';

    uiManager.addNode(this.gameOverText, 'display:flex; justify-content:center; align-items:center; margin-top:20px; margin-left:20px; margin-right:20px; font-size:14px;');
    uiManager.addNode(this.scoreText, 'display:flex; justify-content:center; align-items:center; margin-top:20px; margin-left:20px; margin-right:20px; font-size:14px;');
    uiManager.addNode(this.restartText, 'display:flex; justify-content:center; align-items:center; margin-top:20px; margin-left:20px; margin-right:20px; font-size:14px;');
  }

  onExit() {
    soundManager.deleteSound('./templates/shootemup/game-over.wav');
    uiManager.removeNode(this.gameOverText);
    uiManager.removeNode(this.scoreText);
    uiManager.removeNode(this.restartText);
  }

  update(dt: number): void {
    if (inputManager.isActiveAction('OK')) {
      screenManager.requestSetScreen(new GameScreen());
    }
  }
}

export { GameOverScreen };