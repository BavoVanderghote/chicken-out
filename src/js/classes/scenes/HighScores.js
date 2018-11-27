import {getScoresAsync} from '../../functions/scores.js';
import Button from '../gameobjects/Button.js';

export default class HighScores extends Phaser.Scene {
  constructor() {
    super({
      key: 'scores'
    });
  }
  preload() {}
  create() {
    const f = async () => {
      const scores = await getScoresAsync();
      this.createScoreFields(scores);
    };
    f();
    this.createBackground();
    this.createTitle();
    this.createButtons();
  }
  createBackground() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `bg`
    );
  }
  createTitle() {
    this.add
      .text(this.sys.game.config.width / 2, 100, `Top 5 Players`, {
        fontFamily: `Quicksand`,
        fontSize: 36,
        color: `#fff`
      })
      .setOrigin(0.5);
  }
  createButtons() {
    this.children.add(
      new Button(this, this.sys.game.config.width / 2, 400, `menu`, `menu`)
    );
  }
  createScoreFields(scores) {
    const x = this.sys.game.config.width / 2;
    let y = 165;
    scores.forEach(player => {
      this.add
        .text(x, y, `${player.username} - ${player.highscore}`, {
          fontFamily: `Quicksand`,
          fontSize: 24,
          color: `#fff`
        })
        .setOrigin(0.5, 0.5);
      y += 35;
    });
  }
  update() {}
}
