
'use strict';
function GameOver() {}

GameOver.prototype = {

  preload: function () {

  },

  create: function () {

    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 275, '8bit-light', 'The Moles Win', 48);
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
module.exports = GameOver;
