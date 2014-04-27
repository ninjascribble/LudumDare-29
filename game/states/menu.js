
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sprite = this.game.add.sprite(this.game.world.centerX * 1.5, 138, 'walkleft');
    this.sprite2 = this.game.add.sprite(this.game.world.centerX * .5, 138, 'walkright');

    this.sprite.animations.add('walk', [0, 1, 2, 3], 12, true);
    this.sprite2.animations.add('walk', [0, 1, 2, 3], 12, true);
    this.stage.disableVisibilityChange = true;
    //this.sprite.anchor.setTo(0.5, 0.7);

    //this.titleText = this.game.add.bitmapText(this.game.world.centerX, 300, '8bit-light', 'Ludum Dare 29!', 48);
    //this.titleText.updateTransform();
    //this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    //this.instructionsText = this.game.add.bitmapText(this.game.world.centerX, 400, '8bit-light', 'Click anywhere to play', 16);
    //this.instructionsText.updateTransform();
    //this.instructionsText.x = this.game.width / 2 - this.instructionsText.textWidth / 2;

    //this.sprite.angle = -20;
    //this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function () {
    this.sprite.animations.play('walk');
    this.sprite2.animations.play('walk');

    //if(this.game.input.activePointer.justPressed()) {
    //  this.game.state.start('play');
    //}
  }
};

module.exports = Menu;
