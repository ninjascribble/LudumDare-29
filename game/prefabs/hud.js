'use strict';

var Hud = function(game) {
  Phaser.Group.call(this, game, game.world, 'hud', true);
  this.create();
};

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.create = function() {

  this.timerText = new Phaser.BitmapText(this.game, this.game.world.centerX, 20, '8bit-light', '30', 48);
  this.add(this.timerText);

  this.healthText = new Phaser.BitmapText(this.game, 20, 20, '8bit-light', '30', 48);
  this.add(this.healthText);
}

Hud.prototype.update = function() {

  this.timerText.updateTransform();
  this.healthText.updateTransform();
  this.timerText.x = this.game.width / 2 - this.timerText.textWidth / 2;
};

Hud.prototype.setTime = function(value) {

  if (value < 10) {
    value = '0' + value;
  }

  this.timerText.text = value;
}

Hud.prototype.setHealth = function (value) {
  this.healthText.text = "HP: " + value;
}

module.exports = Hud;
