// hack for phaser bug
Phaser.Math.distanceRound = Phaser.Math.distanceRounded;

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function () {
    this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // player
    this.load.atlas('player', 'assets/player/playerOne.png', 'assets/player/playerOne.json');

    // items
    this.load.spritesheet('bomb', 'assets/items/bomb.png', 70, 70);
    this.load.image('bombFlash', 'assets/items/bombFlash.png');
    this.load.image('rock', 'assets/items/rock.png');
    this.load.image('fireball', 'assets/items/fireball.png');

    // enemies
    this.load.spritesheet('mole', 'assets/enemies/mole-140.png', 140, 140);

    // fonts
    this.load.bitmapFont('8bit-light', 'assets/fonts/8bit_wonder-light.png', 'assets/fonts/8bit_wonder-light.fnt');

    // audio
    this.load.audio('explosion1', '../assets/audio/explosion1.wav', true);
    this.load.audio('explosion2', '../assets/audio/explosion2.wav', true);
    this.load.audio('explosion3', '../assets/audio/explosion3.wav', true);
  },
  create: function () {
    this.asset.cropEnabled = false;
  },
  update: function () {
    if (!!this.ready) {
      //this.game.state.start('menu');
      this.game.state.start('play');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;
