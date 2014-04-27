'use strict';

var Mole = require('../prefabs/mole');

var Enemies = function(game) {
  Phaser.Group.call(this, game, game.world, 'enemies');
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;

Enemies.prototype.create = function(type, x, y) {

  var enemy = this.getFirstExists(false)

  if (!enemy) {
    enemy = new Mole(this.game, x, y);
    this.add(enemy);
  }
  else {
    enemy.reset(x, y);
  }
}

module.exports = Enemies;
