'use strict';
var Bomb = require('../prefabs/bomb.js');

var Player = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'player', frame);
  // initialize your prefab here

  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.game.physics.arcade.enableBody(this);
  this.game.add.existing(this);

  this.cursors = {
    // up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    // down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    // left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    // right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
    down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
    left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
    right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  };

  this.animations.add('walk', ['p1_walk01', 'p1_walk02', 'p1_walk03', 'p1_walk04', 'p1_walk05', 'p1_walk06', 'p1_walk07', 'p1_walk09', 'p1_walk10', 'p1_walk11', ], 12, true);
  this.anchor.setTo(0.5, .8);
  this.speed = 150;
  this.body.width = 65;
  this.body.height = 25;
  this.body.collideWorldBounds = true;
  this.body.x = 20;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {

  this.game.debug.spriteBounds(this, 'rgba(255,0,0,.4)');

  this.body.velocity.x = 0;
  this.body.velocity.y = 0;

  // determine facing from mouse position
  this.angleToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.mousePointer);
  if (this.angleToPointer > -1.5 && this.angleToPointer < 1.5) {
    this.scale.x = 1;
  } else {
    this.scale.x = -1;
  }



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

  if (this.body.velocity.x || this.body.velocity.y) {
    this.animations.play('walk');
  } else {
    this.animations.stop();
    this.frame = 12;
  }
};

module.exports = Player;
