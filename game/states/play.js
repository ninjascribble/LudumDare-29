var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');

'use strict';
function Play() {
  this.moles = [];
  this.molesPerRow = 3;
  this.molesPerColumn = 3;
}

function calculatePos(i, n, length) {
  var result = (i / n) * length - (length / n * .5);
  return result;
}

Play.prototype = {
  create: function () {

    this.game.world.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create a grid of moles
    for (var i = 0, len = this.molesPerRow; i < len; i++) {
      for (var j = 0, len = this.molesPerColumn; j < len; j++) {
        this.moles.push(new Mole(this.game, calculatePos(i + 1, this.molesPerRow, this.game.width), calculatePos(j + 1, this.molesPerColumn, this.game.height)));
      }
    }

    this.player = new Player(this.game, this.game.width / 3, this.game.height / 3, 1);
    this.hud = new Hud(this.game);

    this.game.sound.add('explosion1');
    this.game.sound.add('explosion2');
    this.game.sound.add('explosion3');
  },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.moles);
  },
  render: function () {
    //this.game.debug.text('angle: ' + this.player.angleToPointer, 20, 20)
  },

  clickListener: function () {
    // this.game.state.start('gameover');
  }
};

function fuckyeah() {
  console.log('fuckin\' collide!');
  return true;
}

module.exports = Play;