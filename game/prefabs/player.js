'use strict';
var Bomb = require('../prefabs/bomb.js');

var Player = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cyndi', frame);
  // initialize your prefab here

  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.game.physics.arcade.enableBody(this);
  this.game.add.existing(this);

  this.cursors = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
  };

  //this.animations.add('walk', ['p1_walk01', 'p1_walk02', 'p1_walk03', 'p1_walk04', 'p1_walk05', 'p1_walk06', 'p1_walk07', 'p1_walk09', 'p1_walk10', 'p1_walk11', ], 12, true);
  this.animations.add('walk', [0, 1, 2, 3], 9, true);
  this.anchor.setTo(0.5, .8);
  this.speed = 250;

  this.body.collideWorldBounds = true;
  this.body.setSize(40, 30, 0, 10);
  this.body.drag = new Phaser.Point(1900, 1900);

  this.bombCooldownActive = false;
  this.bombs = game.add.group(); // how many bombs are in the world
  this.maxActiveBombs = 2; // how many bombs can coexist at one time

  for (var i = 0; i < this.maxActiveBombs; i++) {
    var bomb = new Bomb(this.game, this.body.x, this.body.y, 0);
    this.bombs.add(bomb);
  }

  this.status = Player.OK;
  this.health = 3;
};

Player.OK = 'ok';
Player.KNOCKEDBACK = 'knockedback';

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.getBombCooldown = function () {
  return 1000;
}

Player.prototype.getSpriteRect = function () {
  var width = Math.abs(this.width);
  var retval = new Phaser.Rectangle(this.x - (this.anchor.x * width), this.y - (this.anchor.y * this.height), width, this.height);
  return retval;
}

Player.prototype.update = function () {
  if (this.health < 1) {
    this.game.state.start('gameover');
  }

  switch (this.status) {
    case Player.OK:
      okUpdate.call(this);
      break;
    case Player.KNOCKEDBACK:
      knockedbackUpdate.call(this);
      break;
  }
};

Player.prototype.knockback = function (blastCircle) {
  this.status = Player.KNOCKEDBACK;
  var radians = this.game.physics.arcade.angleToXY(blastCircle, this.getSpriteRect().centerX, this.getSpriteRect().centerY);
  var velocity = this.game.physics.arcade.velocityFromRotation(radians, 600);
  this.body.velocity.x = velocity.x;
  this.body.velocity.y = velocity.y;
  this.frame = 12;
  this.health--;

  if (radians > -1.5 && radians < 1.5) {
    this.scale.x = -1;
  } else {
    this.scale.x = 1;
  }
}

function knockedbackUpdate() {
  // are we done being knocked back?
  if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
    this.status = Player.OK;
    return;
  }
}

function okUpdate() {
  // determine facing from mouse position
  this.angleToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.mousePointer);
  if (this.angleToPointer > -1.5 && this.angleToPointer < 1.5) {
    this.scale.x = 1;
  } else {
    this.scale.x = -1;
  }

  // throw a bomb but respect the cooldown and active bomb count
  if (canThrowBomb.call(this)) {
    this.bombCooldownActive = true;
    var bomb = this.bombs.getFirstDead();
    bomb.throw(this.body.x, this.body.y);
    this.bombCooldownEvent = this.game.time.events.add(this.getBombCooldown(), onTimerTick, this);
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
}

function canThrowBomb() {
  return this.game.input.mousePointer.isDown && !this.bombCooldownActive && this.bombs.countLiving() < this.maxActiveBombs;
}

function onTimerTick() {
  this.bombCooldownActive = false;
  this.game.time.events.remove(this.bombCooldownEvent);
}

module.exports = Player;
