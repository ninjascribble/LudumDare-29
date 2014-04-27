'use strict';

var Mole = function(game, x, y, frame) {

  Phaser.Sprite.call(this, game, x, y, (this.spritesheet || 'mole'), frame);

  this.animations.add('initial', [0, 1, 2, 3, 4], 10);
  this.animations.add('popup', [1, 2, 3, 4], 10);
  this.animations.add('popdown', [4, 3, 2, 1], 10);
  this.animations.add('surrender', [5], 1);

  this.game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5, 0.5);
  this.body.immovable = true;
  this.body.setSize(110, 110, 0, 15);

  this.create();
};

Mole.NEW = 'new';
Mole.UP = 'up';
Mole.DOWN = 'down';
Mole.DEAD = 'dead';

Mole.prototype = Object.create(Phaser.Sprite.prototype);
Mole.prototype.constructor = Mole;

Mole.prototype.create = function() {

  this.revive();
  this.state = Mole.NEW;
  this.initialDelay = Math.random() * 5000 + 1000;
  this.frequency = 2000;
  this.frame = 0;

  // this.anchor.setTo(0, 0);
  this.body.setSize(125, 45, 6, 20);

  this.appearEvent = this.game.time.events.add(this.initialDelay, appear, this);
  this.oscillateEvent = null;
}

Mole.prototype.update = function() {
  //this.game.debug.spriteBounds(this);
};

Mole.prototype.hit = function() {

  if (this.state == Mole.UP) {
    this.kill();
  }
};

Mole.prototype.kill = function() {
  Phaser.Sprite.prototype.kill.call(this);
  this.state = Mole.DEAD;
  this.visible = true;
  this.animations.play('surrender');
  this.game.time.events.remove(this.oscillateEvent);
};

Mole.prototype.reset = function(x, y) {
  Phaser.Sprite.prototype.reset.call(this, x, y);
  this.game.time.events.remove(this.appearEvent);
  this.game.time.events.remove(this.oscillateEvent);
  this.create();
};

function appear() {
  this.state = Mole.UP;
  this.animations.play('initial');
  this.oscillateEvent = this.game.time.events.loop(this.frequency, oscillate, this);
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
