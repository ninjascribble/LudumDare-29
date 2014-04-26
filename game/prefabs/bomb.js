'use strict';

var Bomb = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bomb', frame);

  // initialize your prefab here
  this.animations.add('flash', [0,1], 15, true);
  //this.targetPoint = 
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.update = function() {
  game.physics.arcade.moveToXY(sprite, 700);




  // write your prefab's specific update code here
  this.animations.play('flash');
};

module.exports = Bomb;
