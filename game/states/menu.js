
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.background = this.game.add.sprite(0, 0, 'bkg-farm');
    this.game.world.sendToBack(this.background);

    this.sprite = this.game.add.sprite(this.game.world.centerX, 170, 'mole-280', 1);
    this.sprite.anchor.setTo(0.5, 0.7);
    this.sprite.animations.add('updown', [4, 2], 3, true);
    this.sprite.play('updown');

    this.foreground = this.game.add.sprite(0, 520, 'fence-foreground');
    this.game.world.bringToTop(this.foreground);

    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 300, '8bit-light', 'Ludum Dare 29!', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.moveText = this.game.add.bitmapText(this.game.world.centerX, 375, '8bit-light', 'WASD or arrows to move', 16);
    this.moveText.updateTransform();
    this.moveText.x = this.game.width / 2 - this.moveText.textWidth / 2;

    this.throwText = this.game.add.bitmapText(this.game.world.centerX, 400, '8bit-light', 'Click to throw bombs!', 16);
    this.throwText.updateTransform();
    this.throwText.x = this.game.width / 2 - this.throwText.textWidth / 2;

    this.instructionsText = this.game.add.bitmapText(this.game.world.centerX, 455, '8bit-light', 'Click anywhere to play', 24);
    this.instructionsText.updateTransform();
    this.instructionsText.x = this.game.width / 2 - this.instructionsText.textWidth / 2;
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
