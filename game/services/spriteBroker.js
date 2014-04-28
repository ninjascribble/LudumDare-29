'use strict';

var Pool = require('../utils/pool');
var Player = require('../prefabs/player');
var Mole = require('../prefabs/mole');
var SpittingMole = require('../prefabs/spittingMole');
var Bomb = require('../prefabs/bomb');
var Types = {
	'player': Player,
	'mole': Mole,
	'spitting-mole': SpittingMole,
	'bomb': Bomb
};

var SpriteBroker = function(game) {
	this.pools = {};
	this.game = game;
};

SpriteBroker.prototype = {

	get: function(type, criteria) {

		checkType(type);

		if (!this.pools[type]) {
			this.pools[type] = new Pool(Types[type], [this.game, -20000, -20000]);
		}

		return this.pools[type].get(criteria);
	},

	count: function(type, criteria) {
		checkType(type);
		return (this.pools[type]) ? this.pools[type].getAll(criteria).length : 0;
	},

	forEach: function(type, callback, args, criteria) {

		checkType(type);

		if (this.pools[type]) {
			this.pools[type].applyAll(callback, args, criteria);
		}
	},

	callEach: function(type, method, args, criteria) {

		checkType(type);

		if (this.pools[type]) {
			this.pools[type].callAll(method, args, criteria);
		}
	},

	countLiving: function(type) {
		return this.count(type, { alive: true });
	},

	countDead: function(type) {
		return this.count(type, { alive: false });
	},

	countExists: function(type, value) {
		return this.count(type, { exists: Boolean(value) });
	},

	getFirstAlive: function(type) {
		return this.get(type, { alive: true });
	},

	getFirstDead: function(type) {
		return this.get(type, { alive: false });
	},

	getFirstExists: function(type, value) {
		return this.get(type, { exists: Boolean(value) });
	}

	forEachAlive: function(type, callback, args) {
		this.forEach(type, callback, args, { alive: true });
	},

	forEachDead: function(type, callback, args) {
		this.forEach(type, callback, args, { alive: false });
	},

	forEachExists: function(type, callback, value, args) {
		this.forEach(type, callback, args, { exists: Boolean(value) });
	}
};

function checkType(type) {
	if (!Types[type]) throw new Error('Type doesn\'t exist: $1'.replace('$1', type));
}