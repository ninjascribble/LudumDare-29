'use strict';

var Mole = require('../prefabs/mole');
var SpittingMole = require('../prefabs/spittingmole');

var Enemies = function(game) {
  Phaser.Group.call(this, game, game.world, 'enemies');
};

Enemies.prototype = Object.create(Phaser.Group.prototype);
Enemies.prototype.constructor = Enemies;

Enemies.prototype.create = function(type, x, y) {

  var enemy = this.getFirstOfType(type);
  var constructor = null;

  if (!enemy) {
    constructor = this.getConstructorFromType(type);
    enemy = new constructor(this.game, x, y);
    this.add(enemy);
  }
  else {
    enemy.reset(x, y);
  }
}

Enemies.prototype.reset = function() {
  this.setAllChildren('alive', false);
  this.setAllChildren('visible', false);
  this.setAllChildren('exists', false);
}

Enemies.prototype.getFirstOfType = function(type) {

  var type = this.getConstructorFromType(type);
  var result = [];

  this.iterate('exists', false, Phaser.Group.RETURN_CHILD, function(child) {
    if (result) return null;
    if (child instanceof type) return child;
  }, this, result);

  return result[0];
}

Enemies.prototype.getConstructorFromType = function(type) {

  switch(type) {
    case 'mole': return Mole; break;
    case 'spitting-mole': return SpittingMole; break;
    default: return undefined; break;
  }
}

module.exports = Enemies;
