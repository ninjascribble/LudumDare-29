var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');

'use strict';
function Play() {
  this.currentLevel = 0;
}

function calculatePos(i, n, length) {
  var result = (i / n) * length - (length / n * .5);
  return result;
}

Play.prototype = {

  create: function () {

    var levels = this.game.cache.getJSON('levels');
    var level = levels[this.currentLevel];
    var background = level.stage.background;
    var foreground = level.stage.foreground;
    var bounds = level.stage.bounds;
    var player = level.player;
    var enemies = level.enemies;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.bounds = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

    this.hud = new Hud(this.game);
    this.game.add.sprite(background.x, background.y, background.name);
    this.enemies = new Phaser.Group(this.game, this.game.world, 'enemies');
    this.player = new Player(this.game, this.game.width / 3, this.game.height / 3, 1);
    this.game.add.sprite(foreground.x, foreground.y, foreground.name);

    for (var i = 0, len = enemies.length; i < len; i++) {
        this.enemies.add(new Mole(this.game, enemies[i].x, enemies[i].y));
    }

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