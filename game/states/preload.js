
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {

  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // items
    this.load.image('bomb', 'assets/items/bomb.png');
    this.load.image('bombFlash', 'assets/items/bombFlash.png');
    this.load.image('rock', 'assets/items/rock.png');

    // enemies
    this.load.spritesheet('mole', 'assets/enemies/mole.png', 70, 70);
  },

  create: function() {
    this.asset.cropEnabled = false;
  },

  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
