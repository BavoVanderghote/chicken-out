export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, `chicken`);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.createAnimations();
  }

  createAnimations() {
    if (this.scene.anims.get(`jump`) === undefined) {
      this.scene.anims.create({
        key: `jump`,
        frames: this.scene.anims.generateFrameNumbers(`chicken`, {
          start: 0,
          end: 5
        }),
        frameRate: 60,
        repeat: 0
      });
    }
    if (this.scene.anims.get(`walk`) === undefined) {
      this.scene.anims.create({
        key: `walk`,
        frames: this.scene.anims.generateFrameNumbers(`chicken`, {
          start: 6,
          end: 15
        }),
        frameRate: 60,
        repeat: - 1
      });
    }
    if (this.scene.anims.get(`ghost_jump`) === undefined) {
      this.scene.anims.create({
        key: `ghost_jump`,
        frames: this.scene.anims.generateFrameNumbers(`ghost_chicken`, {
          start: 0,
          end: 5
        }),
        frameRate: 60,
        repeat: 0
      });
    }
    if (this.scene.anims.get(`ghost_walk`) === undefined) {
      this.scene.anims.create({
        key: `ghost_walk`,
        frames: this.scene.anims.generateFrameNumbers(`ghost_chicken`, {
          start: 6,
          end: 15
        }),
        frameRate: 60,
        repeat: - 1
      });
    }
  }
}
