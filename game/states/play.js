var Hud = require('../prefabs/hud');
var Mole = require('../prefabs/mole');
var Player = require('../prefabs/player.js');
var Bomb = require('../prefabs/bomb.js');

'use strict';
function Play() {
  this.molesPerRow = 3;
  this.molesPerColumn = 3;
}

function calculatePos(i, n, length) {
  var result = (i / n) * length - (length / n * .5);
  return result;
}

Play.prototype = {
  create: function () {
    var mole;
    this.game.add.sprite(0, 0, 'bkg-farm');
    this.game.world.bounds = new Phaser.Rectangle(0, 0, this.game.width, this.game.height);
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create a grid of moles
    this.moles = this.game.add.group(); //new Phaser.Group(this.game, this.game.world, 'moles');

    for (var i = 0, len = this.molesPerRow; i < len; i++) {
      for (var j = 0, len = this.molesPerColumn; j < len; j++) {
        mole = new Mole(this.game, calculatePos(i + 1, this.molesPerRow, this.game.width), calculatePos(j + 1, this.molesPerColumn, this.game.height));
        this.moles.add(mole);
      }
    }

    Bomb.onDetonation.add(detonationListener, this);

    this.player = new Player(this.game, this.game.width / 3, this.game.height / 3, 1);

    this.game.add.sprite(0, 520, 'fence-foreground');
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

function detonationListener(blastCircle) {
  this.moles.forEachAlive(function (mole) {
    if (Phaser.Circle.intersectsRectangle(blastCircle, mole.body) && mole.state === Mole.UP) {
      mole.kill();
    }
  }, this);
}

function fuckyeah() {
  console.log('fuckin\' collide!');
  return true;
}

module.exports = Play;