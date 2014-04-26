'use strict';

var Mole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'mole', frame);
  this.anchor.setTo(0.5, 0.5);
  this.frequency = Math.random() * 600 + 800;
  this.lastUpdated = Date.now();
};

Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;

Mole.prototype.update = function() {

  var now = Date.now();

  if (now - this.lastUpdated > this.frequency) {
    this.frame = (this.frame == 0) ? 1 : 0;
    this.lastUpdated = now;
  }
};

module.exports = Mole;
