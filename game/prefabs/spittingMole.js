'use strict';
var Mole = require('../prefabs/mole');

var SpittingMole = function(game, x, y, frame) {

  this.spritesheet = 'spitting-mole';

  Mole.call(this, game, x, y, frame);

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
    this.spitEvent = this.game.time.events.add(500, this.spit, this);
  }

  if (this.state === Mole.DOWN) {
    this.hasSpit = false;
  }
};

SpittingMole.prototype.spit = function () {
  this.game.time.events.remove(this.spitEvent);


}

module.exports = SpittingMole;
