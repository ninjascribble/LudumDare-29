var Hud = require('../prefabs/hud');
var Enemies = require('../prefabs/enemies');
var Player = require('../prefabs/player.js');
var Bomb = require('../prefabs/bomb.js');

'use strict';
function Play() { }

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
    this.enemies = new Enemies(this.game);
    this.player = new Player(this.game, 0, 0, 1);

    this.background = this.game.add.sprite(0, 0);
    this.game.world.sendToBack(this.background);

    this.foreground = this.game.add.sprite(0, 0);
    this.game.world.bringToTop(this.foreground);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.time.events.loop(1000, onTimerTick, this);

    Bomb.onDetonation.add(detonationListener, this);

    this.buildLevel(this.currentLevel);

    this.game.spitGroup = this.game.add.group();
    for (var i = 0; i < 5; i++) {
      var sprite = this.game.add.sprite(0, 0, 'spit');
      this.game.physics.arcade.enable(sprite);
      sprite.kill();
      sprite.checkWorldBounds = true;
      sprite.outOfBoundsKill = true;
      this.game.spitGroup.add(sprite);
    }
  },

  /**
  * Put update logic here.
  *
  * @method Phaser.State#update
  */
  update: function () {

    this.hud.setTime(this.timeRemaining);
    this.hud.setHealth(this.player.health);

    this.game.physics.arcade.collide(this.player, this.enemies);
    //this.game.physics.arcade.collide(this.player, this.game.spitGroup);
    this.game.spitGroup.forEachAlive(function (spit) {
      if (spit.overlap(this.player)) {
        this.player.knockback(spit);
        this.game.playerStats.hitBySpit++;
        if (this.player.health < 1) {
          this.game.playerStats.loseBySpit = true;
        }

        spit.kill();
      }
    }, this);

    var playerRect = this.player.getSpriteRect();
    this.game.playerX = playerRect.centerX;
    this.game.playerY = playerRect.centerY;

    if (this.enemies.countLiving() == 0) {
      this.currentLevel++;
      this.buildLevel(this.currentLevel);
      this.timeRemaining += 15;
    }
  },

  /**
  * Put render operations here.
  *
  * @method Phaser.State#render
  */
  render: function () {
    //this.game.debug.geom(this.player.getSpriteRect())
    //this.player.bombs.forEachDead(function (bomb) {
    //  this.game.debug.geom(bomb.blastCircle);
    //}, this);
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
  shutdown: function () {
    this.hud.destroy();
    this.enemies.destroy();
    this.player.destroy();
    this.background.destroy();
    this.foreground.destroy();
  },

  buildLevel: function (level) {

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

    this.enemies.reset();
    this.player.reset(player.x, player.y, 3);
    this.game.world.bounds = new Phaser.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);

    this.background.loadTexture(background.name);
    this.background.x = background.x;
    this.background.y = background.y;

    this.foreground.loadTexture(foreground.name);
    this.foreground.x = foreground.x;
    this.foreground.y = foreground.y;

    for (var i = 0, len = enemies.length; i < len; i++) {
      this.enemies.create(enemies[i].name, enemies[i].x, enemies[i].y);
    }

    this.game.sound.add('explosion1');
    this.game.sound.add('explosion2');
    this.game.sound.add('explosion3');
  }
};

function detonationListener(blastCircle) {

  this.enemies.forEachAlive(function (enemy) {
    if (Phaser.Circle.intersectsRectangle(blastCircle, enemy.body)) {
      enemy.hit();
    }
  }, this);

  if (Phaser.Circle.intersectsRectangle(blastCircle, this.player.getSpriteRect())) {
    this.player.knockback(blastCircle);
    if (this.player.health < 1) {
      this.game.playerStats.loseByBomb = true;
    }

    this.game.playerStats.hitByBomb++;
  }
}

function onTimerTick() {

  this.timeRemaining--;

  if (this.timeRemaining < 0) {
    this.game.state.start('gameover');
    this.game.playerStats.loseByTime = true;
  }
}

module.exports = Play;