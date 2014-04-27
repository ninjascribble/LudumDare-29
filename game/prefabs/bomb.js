'use strict';

var Bomb = function (game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bomb', frame);
  // initialize your prefab here

  this.animations.add('flash', [0, 1], 15, true);
  game.add.existing(this);
  this.targetX = game.input.mousePointer.x;
  this.targetY = game.input.mousePointer.y;
  this.kill();
  this.startPoint;
  this.tweenIndex = 0;
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function () {
  this.anchor.setTo(0.5, 0.5);
  this.animations.play('flash');

  if (this.tweenData && this.tweenIndex === this.tweenData.length) {
    this.tweenData = null;
  }

  if (this.tweenData) {
    this.x = this.startPoint.x + this.tweenData[this.tweenIndex].x;
    this.y = this.startPoint.y + this.tweenData[this.tweenIndex].y;
  } else {
    this.tweenIndex = 0;
  }

  this.tweenIndex++;
};

Bomb.prototype.throw = function (startX, startY) {
  this.reset(startX, startY);
  this.startPoint = { x: startX, y: startY };
  var pointer = this.game.input.mousePointer;
  var destination = { x: pointer.x, y: pointer.y };
  var distance = Phaser.Point.distance(this, destination, true);
  var data = { x: 0, y: 0 };
  var finalDest = { x: destination.x - startX, y: destination.y - startY };
  var tween = this.game.make.tween(data);
  tween.to(finalDest, distance * 1.9, Phaser.Easing.Quadratic.Out, true);;

  this.tweenData = tween.generateData(60);

  this.explodeTimer = this.game.time.events.add(1850, onTimerTick, this);
}

Bomb.onDetonation = new Phaser.Signal();

function onTimerTick() {
  this.game.time.events.remove(this.explodeTimer);
  this.kill();
  var pointer = this.game.input.mousePointer;
  var emitter = this.game.add.emitter(0, 0, 100);
  var number = Math.floor(Math.random() * 3) + 1;
  var blast = new Phaser.Circle(this.x, this.y, 100);

  this.game.sound.play('explosion' + number);
  emitter.makeParticles('fireball');
  emitter.x = this.x;
  emitter.y = this.y;
  emitter.setAlpha(1, 0, 600);

  emitter.start(true, 750, null, 10);

  Bomb.onDetonation.dispatch(blast);
}

module.exports = Bomb;
