// hack for phaser bug
Phaser.Math.distanceRound = Phaser.Math.distanceRounded;

Phaser.GameObjectCreator.prototype.tween = function (obj) {
  return new Phaser.Tween(obj, this.game, this.game.tweens);
}

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
    //this.load.atlas('player', 'assets/player/playerOne.png', 'assets/player/playerOne.json');
    this.load.spritesheet('cyndi', 'assets/player/walk-right-140.png', 76, 140);

    // items
    this.load.spritesheet('bomb', 'assets/items/bomb-70.png', 70, 70);
    //this.load.image('bombFlash', 'assets/items/bombFlash.png');
    this.load.image('rock', 'assets/items/rock.png');
    this.load.image('fireball', 'assets/items/fireball.png');
    this.load.image('spit', 'assets/items/spit.png');

    // enemies
    this.load.spritesheet('mole', 'assets/enemies/mole-140.png', 140, 140);
    this.load.spritesheet('mole-280', 'assets/enemies/mole-280.png', 280, 280);
    this.load.spritesheet('spitting-mole', 'assets/enemies/spitting-mole-140.png', 140, 140);

    // fonts
    this.load.bitmapFont('8bit-light', 'assets/fonts/8bit_wonder-light.png', 'assets/fonts/8bit_wonder-light.fnt');

    // backgrounds
    this.load.image('bkg-farm', 'assets/backgrounds/farm.png');
    this.load.image('fence-foreground', 'assets/backgrounds/fence-foreground.png');

    // audio
    this.load.audio('explosion1', '../assets/audio/explosion1.wav', true);
    this.load.audio('explosion2', '../assets/audio/explosion2.wav', true);
    this.load.audio('explosion3', '../assets/audio/explosion3.wav', true);

    // levels
    this.load.json('levels', 'assets/levels/levels.json', true);
  },
  create: function () {
    this.asset.cropEnabled = false;

    this.game.playerStats = {
      hitBySpit: 0,
      hitByBomb: 0,
      loseByTime: false,
      loseBySpit: false,
      loseByBomb: false
    };
  },
  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preload;
