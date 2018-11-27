export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }
  preload() {
    this.load.spritesheet(`chicken`, `./assets/img/chicken_sprite.png`, {
      frameWidth: 87,
      frameHeight: 100
    });
    this.load.script(
      'webfont',
      'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
    );
  }
  create() {
    this.scene.start(`preload`);
  }
  update() {}
}
