'use strict';

var Hud = function(game) {
  Phaser.Group.call(this, game, game.world, 'hud', true);
  this.game.add.existing(this);
  this.create();
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.create = function() {

  this.timerText = new Phaser.BitmapText(this.game, this.game.world.centerX, 20, '8bit-light', '30', 48);
  this.add(this.timerText);

  this.game.time.events.loop(1000, onTimerTick, this);
}

Hud.prototype.update = function() {

  this.timerText.updateTransform();
  this.timerText.x = this.game.width / 2 - this.timerText.textWidth / 2;
};

function onTimerTick() {

  this.timerText.text = Number(this.timerText.text - 1);

  if (this.timerText.text == '0') {
    this.game.state.start('gameover');
  }
}

module.exports = Hud;
