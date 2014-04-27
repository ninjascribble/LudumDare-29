'use strict';
var Mole = require('../prefabs/mole');

var SpittingMole = function (game, x, y, frame) {

  this.spritesheet = 'spitting-mole';

  Mole.call(this, game, x, y, frame);

  // initialize your prefab here
  this.hasSpit = false;
  this.spitVelocity = 500;
};

SpittingMole.prototype = Object.create(Mole.prototype);
SpittingMole.prototype.constructor = SpittingMole;

SpittingMole.prototype.update = function () {
  Mole.prototype.update.call(this);
  // write your prefab's specific update code here

  if (this.state === Mole.UP && !this.hasSpit) {
    // spit!
    this.hasSpit = true;
    this.spitEvent = this.game.time.events.add(500, spit, this);
  }

  if (this.state === Mole.DOWN) {
    this.hasSpit = false;
  }
};

function spit() {
  this.game.time.events.remove(this.spitEvent);

  this.spit = this.game.add.sprite(this.x, this.y, 'fireball');
  this.game.physics.arcade.enable(this.spit);
  var radians = this.game.physics.arcade.angleToXY(this, this.game.playerX, this.game.playerY);
  var velocity = this.game.physics.arcade.velocityFromRotation(radians, this.spitVelocity);

  this.spit.body.velocity.x = velocity.x;
  this.spit.body.velocity.y = velocity.y;
}

module.exports = SpittingMole;
