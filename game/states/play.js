var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');

'use strict';
function Play() {
  this.currentLevel = 1;
}

function calculatePos(i, n, length) {
  var result = (i / n) * length - (length / n * .5);
  return result;
}

Play.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.buildLevel(this.currentLevel);
  },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.enemies);
  },

  render: function () {

  },

  buildLevel: function(level) {

    var levels = this.game.cache.getJSON('levels');
    var level = levels[this.currentLevel];
    var background = level.stage.background;
    var foreground = level.stage.foreground;
    var bounds = level.stage.bounds;
    var player = level.player;
    var enemies = level.enemies;

    this.game.world.bounds = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

    this.game.add.sprite(background.x, background.y, background.name);
    this.enemies = new Phaser.Group(this.game, this.game.world, 'enemies');
    this.player = new Player(this.game, player.x, player.y, 1);
    this.game.add.sprite(foreground.x, foreground.y, foreground.name);

    for (var i = 0, len = enemies.length; i < len; i++) {
        this.enemies.add(new Mole(this.game, enemies[i].x, enemies[i].y));
    }

    this.game.sound.add('explosion1');
    this.game.sound.add('explosion2');
    this.game.sound.add('explosion3');

    this.hud = new Hud(this.game);
  }
};

module.exports = Play;