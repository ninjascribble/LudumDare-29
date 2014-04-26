'use strict';
function Play() { }
Play.prototype = {
  create: function () {
    var Player = require('../prefabs/player.js');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player = new Player(this.game, this.game.width / 2, this.game.height / 2, 14);
  },
  update: function () {

  },
  clickListener: function () {
    this.game.state.start('gameover');
  }
};

module.exports = Play;