'use strict';

var Mole = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'mole', frame);
};

Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;

Mole.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Mole;
