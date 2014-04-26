var Mole = require('../prefabs/mole');

'use strict';
function Play() {}
Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.mole1 = new Mole(this.game, this.game.width * .3, this.game.height * .3);
    this.game.add.existing(this.mole1);

    this.mole2 = new Mole(this.game, this.game.width * .6, this.game.height * .3);
    this.game.add.existing(this.mole2);

    this.mole3 = new Mole(this.game, this.game.width * .3, this.game.height * .6);
    this.game.add.existing(this.mole3);

    this.mole4 = new Mole(this.game, this.game.width * .6, this.game.height * .6);
    this.game.add.existing(this.mole4);

    
    // this.sprite.inputEnabled = true;
    
    // this.game.physics.arcade.enable(this.sprite);

    // this.sprite.body.collideWorldBounds = true;
    // this.sprite.body.bounce.setTo(1,1);
    // this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
    // this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

    // this.sprite.events.onInputDown.add(this.clickListener, this);
  },
  
  update: function() {

  },
  
  clickListener: function() {
    // this.game.state.start('gameover');
  }
};

module.exports = Play;