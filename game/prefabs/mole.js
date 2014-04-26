'use strict';

var Mole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'mole', frame);
  this.game.add.existing(this);
  this.anchor.setTo(0.5, 0.5);
  this.game.time.events.loop(Math.random() * 600 + 800, onTimerTick, this);
  this.lastUpdated = Date.now();
};

Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;

Mole.prototype.update = function() {
};

function onTimerTick() {
    this.frame = (this.frame == 0) ? 1 : 0;
}

module.exports = Mole;
