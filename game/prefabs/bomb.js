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
  this.maxDistance = 375;
  this.blastRadius = 80;
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function () {
  this.anchor.setTo(0.5, 0.5);
  this.animations.play('flash');

  arcTween.call(this);
};

Bomb.prototype.getLifespan = function () {
  return 1850;
}

Bomb.prototype.throw = function (startX, startY) {
  var destination;
  var data;
  var tween;
  var distance;
  var scale = 1;

  this.reset(startX, startY);
  this.startPoint = { x: startX, y: startY };
  this.arcData = {};

  data = { x: 0, y: 0 };
  destination = { x: this.game.input.mousePointer.x, y: this.game.input.mousePointer.y };
  distance = Phaser.Point.distance(this, destination, true);

  if (distance > this.maxDistance) {
    scale = this.maxDistance / distance;
    this.arcData.distance = this.maxDistance;
  } else {
    this.arcData.distance = distance;
  }

  this.arcData.distance /= 2;
  this.arcData.destination = { x: (destination.x - startX) * scale, y: (destination.y - startY) * scale };
  this.arcData.rotation = this.game.physics.arcade.angleBetween(data, this.arcData.destination);

  tween = this.game.make.tween(data);
  tween.to(this.arcData.destination, this.arcData.distance * 1.9, null, true);;

  this.tweenData = tween.generateData(60);
  this.explodeTimer = this.game.time.events.add(this.getLifespan(), onTimerTick, this);
}

Bomb.onDetonation = new Phaser.Signal();

function arcTween() {
  var dataItem;

  if ((this.tweenData && this.tweenIndex === this.tweenData.length) || !this.tweenData) {
    this.tweenData = null;
    this.tweenIndex = 0;
  } else {
    dataItem = this.tweenData[this.tweenIndex]
    if (dataItem) {

      //var arcX = this.arcData.distance - (this.arcData.distance / 2);
      var arcX = (this.arcData.distance * (this.tweenIndex / this.tweenData.length)) - (this.arcData.distance / 2);
      var yAdjust = Math.abs(arcX) - (this.arcData.distance / 2);
      this.x = this.startPoint.x + dataItem.x;
      this.y = this.startPoint.y + dataItem.y + yAdjust;
    }

    this.tweenIndex++;
  }
}

function onTimerTick() {
  this.game.time.events.remove(this.explodeTimer);
  this.kill();
  var pointer = this.game.input.mousePointer;
  var emitter = this.game.add.emitter(0, 0, 100);
  var number = Math.floor(Math.random() * 3) + 1;
  this.blastCircle = new Phaser.Circle(this.x, this.y, this.blastRadius * 2);

  this.game.sound.play('explosion' + number);
  emitter.makeParticles('fireball');
  emitter.x = this.x;
  emitter.y = this.y;
  emitter.setAlpha(1, 0, 600);

  emitter.start(true, 750, null, 10);

  Bomb.onDetonation.dispatch(this.blastCircle);
}

module.exports = Bomb;
