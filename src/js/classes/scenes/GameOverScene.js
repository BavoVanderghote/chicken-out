import Button from '../gameobjects/Button.js';
import {saveScore} from '../../functions/scores.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: `gameOver`
    });
  }
  init() {
    this.sent = false;
  }
  preload() {}
  createScoreSubmit() {
    const $input = document.querySelector(`.overlay`);
    $input.style.visibility = `visible`;
    $input.querySelector(`.overlay__usernameinput`).value = ``;
    $input.querySelector(`.overlay__usernameinput`).focus();
  }
  create(data) {
    this.createScoreSubmit();
    this.createScore(data);
    this.createGameOverText();

    this.sendScore(data);
  }
  sendScore(data) {
    this.input.on('pointerdown', pointer => {
      const $name = document.querySelector(`.overlay__usernameinput`).value;
      const score = Phaser.Math.FloorTo(data.score);

      if (!this.sent) {
        saveScore($name, score).then(data => {
          if (data.result === `ok`) {
            this.sent = true;
            //html overlay onzichtbaar plaatsen
            const $input = document.querySelector(`.overlay`);
            $input.style.visibility = `hidden`;
            // verander high scores tekst
            const playerName = this.add.text(
              this.sys.game.config.width / 2,
              this.sys.game.config.height / 2 + 35,
              `${$name}`,
              {
                fontFamily: `Quicksand`,
                fontSize: 36,
                color: `#fff`
              }
            );
            playerName.setOrigin(0.5);
            this.createButtons();
          }
        });
      }
    });
  }
  createButtons() {
    this.children.add(
      new Button(
        this,
        this.sys.game.config.width / 2 - 200,
        400,
        `restart`,
        `game`
      )
    );
    this.children.add(
      new Button(this, this.sys.game.config.width / 2, 400, `menu`, `menu`)
    );
    this.children.add(
      new Button(
        this,
        this.sys.game.config.width / 2 + 200,
        400,
        `highscores`,
        `scores`
      )
    );
  }
  createScore(data) {
    const finalScore = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 + 85,
      `You ran ${Phaser.Math.FloorTo(data.score)} meters`,
      {
        fontFamily: `Quicksand`,
        fontSize: 30,
        color: `#fff`
      }
    );
    finalScore.setOrigin(0.5);
  }
  createGameOverText() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 100,
      `gameover`
    );
  }
}
