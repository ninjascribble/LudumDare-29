'use strict';

var Bomb = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bomb', frame);
  // initialize your prefab here

  this.animations.add('flash', [0, 1], 15, true);
  game.add.existing(this);
  //game.physics.arcade.enable(this);
  this.targetX = game.input.mousePointer.x;
  this.targetY = game.input.mousePointer.y;
  this.kill();
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function () {
  this.anchor.setTo(0.5, 0.5);


  if (this.thrown) {
  }

  this.animations.play('flash');
};

Bomb.prototype.throw = function (startX, startY) {
  this.x = startX;
  this.y = startY;
  this.thrown = true;
  this.revive();
  var pointer = this.game.input.mousePointer;
  var tween = this.game.add.tween(this).to({ x: pointer.x, y: pointer.y }, 1250, Phaser.Easing.Bounce.Out, true);
  this.explodeTimer = this.game.time.events.add(3000, onTimerTick, this);
}

function onTimerTick() {
  this.game.time.events.remove(this.explodeTimer);
  this.kill();
}

module.exports = Bomb;
