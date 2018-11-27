import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import MenuScene from './scenes/MenuScene.js';
import HighScores from './scenes/HighScores.js';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 800,
      height: 500,
      parent: `game`,
      title: `Chicken Out`,
      scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        GameScene,
        GameOverScene,
        HighScores
      ],
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: {y: 2750},
          debug: false
        }
      }
    });
  }
}
export default Game;
