var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');

'use strict';
function Play() {
  this.molesPerRow = 4;
  this.molesPerColumn = 4;
}

function calculatePos(i, n, length) {
  var result = (i / n) * length - (length / n * .5);
  return result;
}

Play.prototype = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.hud = new Hud(this.game);

    // Create a grid of moles
    for (var i = 0, len = this.molesPerRow; i < len; i++) {
      for (var j = 0, len = this.molesPerColumn; j < len; j++) {
        new Mole(this.game, calculatePos(i + 1, this.molesPerRow, this.game.width), calculatePos(j + 1, this.molesPerColumn, this.game.height));
      }
    }

    this.player = new Player(this.game, this.game.width / 2, this.game.height / 2, 1);
  },

  update: function () {


  },
  render: function () {
    //this.game.debug.text('angle: ' + this.player.angleToPointer, 20, 20)
  },

  clickListener: function () {
    // this.game.state.start('gameover');
  }
};

module.exports = Play;