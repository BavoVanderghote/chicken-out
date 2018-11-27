export default class Obstacle extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, image) {
    super(scene, x, y);

    this.setTexture(`${image}`);
    this.setPosition(x, y);
    this.isHit = false;

    scene.add.existing(this);
  }
  update(vel) {
    this.x -= vel;
  }
  flying(obstacle) {
    obstacle.body.allowGravity = false;
    obstacle.setScale(0.5);
  }
}
