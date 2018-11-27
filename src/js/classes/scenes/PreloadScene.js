import './../../../assets/img/ground.png';
import './../../../assets/img/fence.png';
import './../../../assets/img/chicken_sprite.png';
import './../../../assets/img/life.png';
import './../../../assets/img/bg.png';
import './../../../assets/img/game_over.png';
import './../../../assets/img/button_restart.png';
import './../../../assets/img/button_menu.png';
import './../../../assets/img/button_highscores.png';
import './../../../assets/img/button_start.png';
import './../../../assets/img/hay_chicken.png';
import './../../../assets/img/title.png';
import './../../../assets/img/ghost_chicken.png';
import './../../../assets/img/ghost_chicken_sprite.png';
import './../../../assets/img/pill.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.preloader = this.add.graphics();
    this.load.on(`progress`, this.onProgress, this);
    this.load.on(`complete`, this.onComplete, this);
    this.load.image(`ground`, `./assets/img/ground.png`);
    this.load.image(`fence`, `./assets/img/fence.png`);
    this.load.image(`life`, `./assets/img/life.png`);
    this.load.image(`bg`, `./assets/img/bg.png`);
    this.load.image(`gameover`, `./assets/img/game_over.png`);
    this.load.image(`restart`, `./assets/img/button_restart.png`);
    this.load.image(`menu`, `./assets/img/button_menu.png`);
    this.load.image(`highscores`, `./assets/img/button_highscores.png`);
    this.load.image(`start`, `./assets/img/button_start.png`);
    this.load.image(`hay`, `./assets/img/hay_chicken.png`);
    this.load.image(`title`, `./assets/img/title.png`);
    this.load.image(`ghostpowerup`, `./assets/img/ghost_chicken.png`);
    this.load.image(`pillpowerup`, `./assets/img/pill.png`);
    this.load.spritesheet(
      `ghost_chicken`,
      `./assets/img/ghost_chicken_sprite.png`,
      {
        frameWidth: 87,
        frameHeight: 100
      }
    );

    WebFont.load({
      google: {
        families: ['Quicksand']
      }
    });
  }
  onProgress(value) {
    this.preloader.clear();
    this.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 30,
      `chicken`
    );
    this.preloader.fillStyle(0x9fbf9e, 1);
    this.preloader.fillRect(
      this.game.config.width / 2 - 100,
      this.game.config.height / 2 + 50,
      (this.game.config.width / 4) * value,
      15
    );
  }
  onComplete() {
    this.preloader.destroy();
    this.scene.start(`menu`);
  }
  create() {}
  update() {}
}
