'use strict';

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'player', frame);
  // initialize your prefab here

  game.add.existing(this);
  game.physics.arcade.enable(this);

  this.cursors = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
  };

  this.animations.add('walk', ['p1_walk01', 'p1_walk02', 'p1_walk03', 'p1_walk04', 'p1_walk05', 'p1_walk06', 'p1_walk07', 'p1_walk09', 'p1_walk10', 'p1_walk11', ], 12, true);
  this.anchor.setTo(0.5, 0.5);
  this.speed = 150;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  if (this.cursors.up.isDown) {
    this.body.velocity.y = -this.speed;
  }
  if (this.cursors.down.isDown) {
    this.body.velocity.y = this.speed;
  }
  if (this.cursors.left.isDown) {
    this.scale.x = -1;
    this.body.velocity.x = -this.speed;
  }
  if (this.cursors.right.isDown) {
    this.scale.x = 1;
    this.body.velocity.x = this.speed;
  }

  if (this.body.velocity.x || this.body.velocity.y) {
    this.animations.play('walk');
  } else {
    this.animations.stop();
    this.frame = 12;
  }
};

module.exports = Player;
