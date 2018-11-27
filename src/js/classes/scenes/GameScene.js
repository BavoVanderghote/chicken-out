import Player from '../gameobjects/Player';
import Obstacle from '../gameobjects/Obstacle.js';
import PowerUp from '../gameobjects/PowerUp.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.gameOver = false;

    this.lives = 3;
    this.score = 0;

    this.speed = 4.5;
    this.minTime = 1500;
    this.maxTime = 3000;

    this.flySpeed = 5;
    this.minFlyTime = 3000;
    this.maxFlyTime = 4500;

    this.minPowerUpTime = 8000;
    this.maxPowerUpTime = 16000;

    this.ghost = false;
    this.pill = false;
  }
  preload() {}
  create() {
    //scenery
    this.createBackground();
    this.createPlatforms();

    //data
    this.createInstructions();
    this.createLives();
    this.createScore();

    //player & controls
    this.createPlayer();
    this.createControls();

    //obstacles
    this.createObstacles();
    this.createFlyingObstacles();

    //powerups
    this.createPowerUps();
  }

  // SCENERY

  createBackground() {
    this.bg1 = this.physics.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `bg`
    );
    this.bg1.body.allowGravity = false;
    this.bg1.body.velocity.x = - 100;

    this.bg2 = this.physics.add.image(
      (this.sys.game.config.width / 2) * 3,
      this.sys.game.config.height / 2,
      `bg`
    );
    this.bg2.body.allowGravity = false;
    this.bg2.body.velocity.x = - 100;
  }
  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 490, `ground`);
  }

  //DATA

  createInstructions() {
    const instructions = this.add.text(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 90,
      `Press [ space ] to jump`,
      {
        fontFamily: `Quicksand`,
        fontSize: 32,
        fill: `#fff`
      }
    );
    instructions.setOrigin(0.5);
    const ghostPowerUpInstructionImage = this.add.image(
      this.sys.game.config.width / 2 - 130,
      this.sys.game.config.height / 2 - 20,
      `ghostpowerup`
    );
    const ghostPowerUpInstruction = this.add.text(
      this.sys.game.config.width / 2 + 30,
      this.sys.game.config.height / 2 - 20,
      `run through obstacles`,
      {
        fontFamily: `Quicksand`,
        fontSize: 24,
        fill: `#fff`
      }
    );
    ghostPowerUpInstruction.setOrigin(0.5);
    const pillPowerUpInstructionImage = this.add.image(
      this.sys.game.config.width / 2 - 130,
      this.sys.game.config.height / 2 + 50,
      `pillpowerup`
    );
    const pillPowerUpInstruction = this.add.text(
      this.sys.game.config.width / 2 + 30,
      this.sys.game.config.height / 2 + 50,
      `become a big chick`,
      {
        fontFamily: `Quicksand`,
        fontSize: 24,
        fill: `#fff`
      }
    );
    pillPowerUpInstruction.setOrigin(0.5);
    this.removeInstructionsTimedEvent = this.time.addEvent({
      delay: 2800,
      callback: function() {
        instructions.destroy();
        ghostPowerUpInstructionImage.destroy();
        ghostPowerUpInstruction.destroy();
        pillPowerUpInstructionImage.destroy();
        pillPowerUpInstruction.destroy();
      },
      callbackScope: this
    });
  }
  createScore() {
    this.scoreTextField = this.add.text(16, 20, `0m`, {
      fontFamily: `Quicksand`,
      fontSize: `32px`,
      fill: `#fff`
    });
    this.score = 0;
  }
  createLives() {
    this.feathers = this.add.group({
      key: `life`,
      repeat: this.lives - 1,
      setXY: {x: 710, y: 40, stepX: 30}
    });
  }

  //PLAYER & CONTROLS

  createPlayer() {
    this.player = new Player(this, 150, 375);
    this.physics.add.collider(this.player, this.platforms);
  }
  createControls() {
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  //OBSTACLES

  createFlyingObstacles() {
    this.flyingObstacles = this.physics.add.group();
    this.timedFlyEvent = this.time.addEvent({
      delay: 3000,
      callback: this.newFlyingObstacle,
      callbackScope: this
    });
    this.physics.add.overlap(
      this.player,
      this.flyingObstacles,
      this.onCollision,
      null,
      this
    );
  }
  newFlyingObstacle() {
    this.lastGroundObstacle = this.obstacles.children.entries[
      this.obstacles.children.entries.length - 1
    ];

    if (this.lastGroundObstacle) {
      if (
        this.timedEvent.getProgress() < 0.8 &&
        this.timedEvent.getProgress() > 0.6
      ) {
        this.flyingObstacles.add(new Obstacle(this, 820, 280, `hay`));

        this.obstacle = this.flyingObstacles.children.entries[
          this.flyingObstacles.children.entries.length - 1
        ];
        this.obstacle.flying(this.obstacle);

        this.timedFlyEvent = this.timedFlyEvent.reset({
          delay: Phaser.Math.Between(this.minFlyTime, this.maxFlyTime),
          callback: this.newFlyingObstacle,
          callbackScope: this,
          repeat: 1
        });
      } else
        this.timedFlyEvent = this.timedFlyEvent.reset({
          delay: 50,
          callback: this.newFlyingObstacle,
          callbackScope: this,
          repeat: 1
        });
    } else {
      this.timedFlyEvent = this.timedFlyEvent.reset({
        delay: 50,
        callback: this.newFlyingObstacle,
        callbackScope: this,
        repeat: 1
      });
    }
  }
  createObstacles() {
    this.obstacles = this.physics.add.group();
    this.timedEvent = this.time.addEvent({
      delay: 2000,
      callback: this.newObstacle,
      callbackScope: this
    });
    this.physics.add.collider(this.obstacles, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.obstacles,
      this.onCollision,
      null,
      this
    );
  }
  newObstacle() {
    this.obstacles.add(new Obstacle(this, 820, 420, `fence`));

    this.timedEvent = this.timedEvent.reset({
      delay: Phaser.Math.Between(this.minTime, this.maxTime),
      callback: this.newObstacle,
      callbackScope: this,
      repeat: 1
    });
  }

  //POWERUPS

  createPowerUps() {
    this.powerUps = this.physics.add.group();
    this.timedPowerUpEvent = this.time.addEvent({
      delay: 5000,
      callback: this.newPowerUp,
      callbackScope: this
    });
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.onPowerUp,
      null,
      this
    );
  }
  newPowerUp() {
    this.randomPowerUp = Phaser.Math.Between(0, 1);
    if (
      this.timedEvent.getProgress() > 0.3 &&
      this.timedEvent.getProgress() < 0.9
    ) {
      switch (this.randomPowerUp) {
      case 0:
        this.powerUps.add(new PowerUp(this, 820, 410, `ghostpowerup`));
        break;
      case 1:
        this.powerUps.add(new PowerUp(this, 820, 410, `pillpowerup`));
        break;
      }
      this.powerup = this.powerUps.children.entries[
        this.powerUps.children.entries.length - 1
      ];
      this.powerup.flying(this.powerup);

      this.timedPowerUpEvent = this.timedPowerUpEvent.reset({
        delay: Phaser.Math.Between(this.minPowerUpTime, this.maxPowerUpTime),
        callback: this.newPowerUp,
        callbackScope: this,
        repeat: 1
      });
    } else {
      this.timedPowerUpEvent = this.timedPowerUpEvent.reset({
        delay: 100,
        callback: this.newPowerUp,
        callbackScope: this,
        repeat: 1
      });
    }
  }
  createPowerUpTimer(image) {
    this.powerUpImage = this.add.image(41, 100, `${image}`);
    this.powerUpTimer = this.add.text(80, 85, `5`, {
      fontFamily: `Quicksand`,
      fontSize: `32px`,
      fill: `#fff`
    });
  }
  onPowerUp(player, powerup) {
    switch (powerup.texture.key) {
    case `pillpowerup`:
      this.pill = true;
      break;
    case `ghostpowerup`:
      this.ghost = true;
      break;
    }
    this.powerup = this.powerUps.children.entries[
      this.powerUps.children.entries.length - 1
    ];
    this.powerup.isHit = true;

    this.powerup.destroy();
    this.removePowerUp = this.time.addEvent({
      delay: 5000,
      callback: function() {
        this.powerUpTimer.destroy();
        this.powerUpImage.destroy();
        this.ghost = false;
        this.pill = false;
      },
      callbackScope: this
    });
    this.createPowerUpTimer(powerup.texture.key);
  }

  //COLLISION

  onCollision(player, obstacle) {
    if (!obstacle.isHit && !this.ghost) {
      obstacle.isHit = true;
      this.cameras.main.shake(300);

      this.lastFeather = this.feathers.getChildren()[0];
      this.lastFeather.destroy();

      this.lives -= 1;
      if (this.lives <= 0) {
        this.dead();
      }
    }
  }
  dead() {
    this.gameOver = true;
    this.physics.pause();
    this.player.anims.pause();
    this.gameOverTime = this.time.delayedCall(1000, this.onGameOver, [], this);
  }
  onGameOver() {
    this.timedEvent.remove(false);
    this.cameras.main.fadeOut(1000);
    this.cameras.main.once(
      'camerafadeoutcomplete',
      function() {
        this.scene.start(`gameOver`, {score: this.score});
      },
      this
    );
  }

  update() {
    //controls en ghost powerup
    if (!this.gameOver) {
      if (this.player.body.touching.down) {
        if (this.ghost) {
          this.player.anims.play(`ghost_walk`, true);
        } else {
          this.player.anims.play(`walk`, true);
        }
      }
      if (this.keySpace.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(- 1000);
        if (this.ghost) {
          this.player.anims.play(`ghost_jump`, true);
        } else {
          this.player.anims.play(`jump`, true);
        }
      }

      //score optellen
      this.score += 1 / 10; //score trager laten optellen
      this.scoreTextField.setText(`${Phaser.Math.FloorTo(this.score)}m`); //geen decimalen

      //powerup timer laten aflopen

      if (this.powerUpTimer && (this.ghost || this.pill)) {
        this.powerUpTimer.setText(
          `${5 - Phaser.Math.FloorTo(this.removePowerUp.getProgress() * 5)}`
        );
      }

      //ground variables

      if (this.speed < 10) {
        this.speed += 1 / 600;
      } else {
        this.speed += 1 / 1000;
      }

      if (this.minTime > 700) {
        this.minTime -= 1 / 5;
      } else {
        this.minTime -= 1 / 100;
      }

      if (this.maxTime > 1300) {
        this.maxTime -= 1 / 3;
      } else {
        this.maxTime -= 1 / 100;
      }

      //flying variables

      if (this.flySpeed < 11) {
        this.flySpeed += 1 / 600;
      } else {
        this.flySpeed += 1 / 1000;
      }

      if (this.minTime > 2000) {
        this.minTime -= 1 / 5;
      } else {
        this.minTime -= 1 / 100;
      }

      if (this.maxTime > 3000) {
        this.maxTime -= 1 / 3;
      } else {
        this.maxTime -= 1 / 100;
      }

      //speed updates && off screen

      //hekjes off screen & pill powerup

      for (let i = 0;i < this.obstacles.children.entries.length;i ++) {
        this.obstacle = this.obstacles.children.entries[i];
        this.obstacle.update(this.speed);
        if (this.obstacle.x < - 10) {
          this.obstacle.destroy();
        }
        if (this.pill) {
          this.obstacle.setScale(0.5);
        }
      }

      //hooi off screen & pill powerup

      for (let i = 0;i < this.flyingObstacles.children.entries.length;i ++) {
        this.obstacle = this.flyingObstacles.children.entries[i];
        this.obstacle.update(this.flySpeed);

        if (this.obstacle.x < - 100) {
          this.obstacle.destroy();
        }
        if (this.pill) {
          this.obstacle.setScale(0.25);
        }
      }

      //powerop off screen

      for (let i = 0;i < this.powerUps.children.entries.length;i ++) {
        this.powerup = this.powerUps.children.entries[i];
        this.powerup.update(this.speed);

        if (this.powerup.x < - 10) {
          this.powerup.destroy();
        }
      }

      //bg loop

      if (this.bg1.x <= - 399) {
        this.bg1.x = 1200;
      }
      if (this.bg2.x <= - 399) {
        this.bg2.x = 1200;
      }
    }
  }
}
