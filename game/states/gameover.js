'use strict';

var loseByTimeMessage = 'You ran out of time';
var loseByBombMessage = 'You blew yourself up';
var loseBySpitMessage = 'You got spat on dawg';

function GameOver() {}

GameOver.prototype = {

  preload: function () {

  },

  create: function () {

    var message = '';

    if (this.game.playerStats.loseBySpit) message = loseBySpitMessage;
    else if (this.game.playerStats.loseByBomb) message = loseByBombMessage;
    else message = loseByTimeMessage;

    //this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 350, '8bit-light', 'Score: ' + this.game.playerStats.score, 48);
    //this.scoreText.updateTransform();
    //this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;

    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 225, '8bit-light', 'The Moles Win', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.messageText = this.game.add.bitmapText(this.game.world.centerX, 282.5, '8bit-light', message, 24);
    this.messageText.updateTransform();
    this.messageText.x = this.game.width / 2 - this.messageText.textWidth / 2;

    this.moveText = this.game.add.bitmapText(this.game.world.centerX, 325, '8bit-light', 'Click to play again', 16);
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
