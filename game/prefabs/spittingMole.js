'use strict';
var Mole = require('../prefabs/mole');

var SpittingMole = function(game, x, y, frame) {
  Mole.call(this, game, x, y, 'spittingMole', frame);

  // initialize your prefab here
  this.hasSpit = false;
};

SpittingMole.prototype = Object.create(Mole.prototype);
SpittingMole.prototype.constructor = SpittingMole;

SpittingMole.prototype.update = function() {
  Mole.prototype.update.call(this);
  // write your prefab's specific update code here
  
  if (this.state === Mole.UP) {
    // spit!
    this.hasSpit = true;
  }

  if (this.state === Mole.DOWN) {
    this.hasSpit = false;
  }
};

module.exports = SpittingMole;
