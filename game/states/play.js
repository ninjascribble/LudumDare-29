var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');
var Bomb = require('../prefabs/bomb.js');

'use strict';
function Play() {}

Play.prototype = {

  /**
  * Override this method to add some load operations.
  * If you need to use the loader, you may need to use them here.
  *
  * @method Phaser.State#preload
  */
  preload: function () {
  },

  /**
  * Put update logic here.
  *
  * @method Phaser.State#loadUpdate
  */
  loadUpdate: function () {
  },

  /**
  * Put render operations here.
  *
  * @method Phaser.State#loadRender
  */
  loadRender: function () {
  },

  /**
  * This method is called after the game engine successfully switches states.
  * Feel free to add any setup code here (do not load anything here, override preload() instead).
  *
  * @method Phaser.State#create
  */
  create: function () {

    this.currentLevel = 0;
    this.timeRemaining = 30;

    this.hud = new Hud(this.game);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.time.events.loop(1000, onTimerTick, this);
    Bomb.onDetonation.add(detonationListener, this);

    this.buildLevel(this.currentLevel);
  },

  /**
  * Put update logic here.
  *
  * @method Phaser.State#update
  */
  update: function () {
    
    this.hud.setTime(this.timeRemaining);
    this.game.physics.arcade.collide(this.player, this.enemies);

    if (this.enemies.countLiving() == 0) {
      this.currentLevel++;
      this.game.world.removeAll();
      this.buildLevel(this.currentLevel);
      this.timeRemaining += 30;
    }
  },

  /**
  * Put render operations here.
  *
  * @method Phaser.State#render
  */
  render: function () {
  },

  /**
  * This method will be called when game paused.
  *
  * @method Phaser.State#paused
  */
  paused: function () {
  },

  /**
  * This method will be called when the state is shut down (i.e. you switch to another state from this one).
  * @method Phaser.State#shutdown
  */
  shutdown: function() {
    this.hud.destroy();
  },

  buildLevel: function(level) {

    var levels = this.game.cache.getJSON('levels');
    var level = levels[this.currentLevel];

    if (!level) {
      return this.game.state.start('youwin');
    }

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
  }
};

function detonationListener(blastCircle) {

  this.enemies.forEachAlive(function (mole) {
    if (Phaser.Circle.intersectsRectangle(blastCircle, mole.body) && mole.state === Mole.UP) {
      mole.kill();
    }
  }, this);

  if (Phaser.Circle.intersectsRectangle(blastCircle, this.player.getSpriteRect())) {
    this.player.knockback(blastCircle);
  }
}

function onTimerTick() {

  this.timeRemaining--;

  if (this.timeRemaining < 0) {
    this.game.state.start('gameover');
  }
}

module.exports = Play;