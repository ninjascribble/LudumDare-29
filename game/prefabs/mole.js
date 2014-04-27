'use strict';

var Mole = function(game, x, y, frame) {

  Phaser.Sprite.call(this, game, x, y, 'mole', frame);

  this.state = Mole.NEW;
  this.initialDelay = Math.random() * 5000 + 1000;
  this.frequency = 2000;

  this.animations.add('initial', [0, 1, 2, 3, 4], 10);
  this.animations.add('popup', [1, 2, 3, 4], 10);
  this.animations.add('popdown', [4, 3, 2, 1], 10);

  this.create();
};

Mole.NEW = 'new';
Mole.UP = 'up';
Mole.DOWN = 'down';

Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;

Mole.prototype.create = function() {

  this.game.physics.arcade.enableBody(this);
  this.game.add.existing(this);
  this.anchor.setTo(0.5, 0.5);
  this.body.immovable = true;
  this.body.setSize(110, 110, 0, 15);
  this.frame = 0;
  this.revive();

  this.game.time.events.add(this.initialDelay, appear, this);
}

Mole.prototype.update = function() {
  //this.game.debug.spriteBounds(this);
};

function appear() {
  this.state = Mole.UP;
  this.animations.play('initial');
  this.game.time.events.loop(this.frequency, oscillate, this);
}

function oscillate() {

  if (this.state == Mole.UP) {
    this.state = Mole.DOWN;
    this.animations.play('popdown');
  }
  else {
    this.state = Mole.UP;
    this.animations.play('popup');
  }
}

module.exports = Mole;
