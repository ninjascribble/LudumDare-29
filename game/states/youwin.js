
'use strict';
function YouWin() {}

YouWin.prototype = {

  preload: function () {

  },

  create: function () {

    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 300, '8bit-light', 'You Won!', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;
    this.titleText.y = 200;

    this.instructionText = this.game.add.bitmapText(this.game.world.centerX, 300, '8bit-light', '(Click to play again)', 24);
    this.instructionText.updateTransform();
    this.instructionText.x = this.game.width / 2 - this.instructionText.textWidth / 2;
    this.instructionText.y = 400;
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = YouWin;
