export default class Button extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, image, destination) {
    super(scene, x, y);
    this.destination = destination;

    this.setTexture(`${image}`);
    this.setPosition(x, y);
    scene.add.existing(this);

    this.setInteraction();
  }
  setInteraction() {
    this.setInteractive();
    this.on('pointerup', () => {
      this.onClick(this.destination);
    });
  }
  onClick(destination) {
    this.scene.scene.start(destination);
  }
}
