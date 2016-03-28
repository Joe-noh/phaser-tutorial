let game = new Phaser.Game(400, 490);

let mainState = {
  preload() {
    game.load.image('bird', 'assets/images/bird.png');
  },

  create() {
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    let spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
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
  }
};


game.state.add('main', mainState);
game.state.start('main');
