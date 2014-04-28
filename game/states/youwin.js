
'use strict';
function YouWin() {}

YouWin.prototype = {

  preload: function () {

  },

  create: function () {

    this.background = this.game.add.sprite(0, 0, 'bkg-farm');
    this.game.world.sendToBack(this.background);

    this.sprite = this.game.add.sprite(this.game.world.centerX, 170, 'mole-280', 5);
    this.sprite.anchor.setTo(0.5, 0.7);

    this.foreground = this.game.add.sprite(0, 520, 'fence-foreground');
    this.game.world.bringToTop(this.foreground);

    this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 175, '8bit-light', 'Score: ' + this.game.playerStats.score, 48);
    this.scoreText.updateTransform();
    this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;

    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 300, '8bit-light', 'You Win!', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.moveText = this.game.add.bitmapText(this.game.world.centerX, 375, '8bit-light', 'Click to play again', 16);
    this.moveText.updateTransform();
    this.moveText.x = this.game.width / 2 - this.moveText.textWidth / 2;
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = YouWin;
