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

  this.speed = 100;
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
    this.body.velocity.x = -this.speed;
  }
  if (this.cursors.right.isDown) {
    this.body.velocity.x = this.speed;
  }

};

module.exports = Player;
