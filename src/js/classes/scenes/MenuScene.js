import Button from '../gameobjects/Button.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: `menu`
    });
  }
  init() {}
  preload() {}
  create() {
    this.createBackground();
    this.createTitle();
    this.createButtons();
  }
  createButtons() {
    this.children.add(
      new Button(
        this,
        this.sys.game.config.width / 2 + 100,
        400,
        `start`,
        `game`
      )
    );
    this.children.add(
      new Button(
        this,
        this.sys.game.config.width / 2 - 100,
        400,
        `highscores`,
        `scores`
      )
    );
  }
  createTitle() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 65,
      `title`
    );
  }
  createBackground() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `bg`
    );
  }
}
