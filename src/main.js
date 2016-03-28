let game = new Phaser.Game(400, 490);

let mainState = {
  preload() {
    game.load.image('bird', 'assets/images/bird.png');
    game.load.image('pipe', 'assets/images/pipe.png');
  },

  create() {
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    this.pipes = game.add.group();

    let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  },

  update() {
    if (this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame();
    }
  },

  jump() {
    this.bird.body.velocity.y = -350;
  },

  restartGame() {
    game.state.start('main');
  },

  addOnePipe(x, y) {
    let pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);

    game.physics.arcade.enable(pipe);

    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes() {
    let hole = Math.floor(Math.random() * 5) + 1;

    for (let i=0; i < 8; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
  }
};

game.state.add('main', mainState);
game.state.start('main');
