var Cache = require('Cache');
var CONSTS = {
	EMPTY_LEVEL: 0.5
};

function Deposits(room) {
	this.cache = new Cache();
	this.room = room;
	this.deposits = this.room.find(
		FIND_MY_STRUCTURES,
		{
			filter: filterExtensions
		}
	);

	this.spawns = [];
	for(var n in Game.spawns) {
		var s = Game.spawns[n];
		if(s.room == this.room) {
			this.spawns.push(s);
		}
	}
};

Deposits.prototype.getSpawnDeposit = function() {
	if(this.spawns.length != 0) {
		return this.spawns[0];
	}

	return false;
};

Deposits.prototype.getEmptyDeposits = function() {
	return this.cache.remember(
		'empty-deposits',
		function() {
			var empty = [];
			var len = this.deposits.length;
			for(var i = 0; i < len; i++) {
				var res = this.deposits[i];
				if(this.isEmptyDeposit(res)) {
					empty.push(res);
				}
			}

			return empty;
		}.bind(this)
	);
};

Deposits.prototype.isEmptyDeposit = function(deposit) {
	if(deposit.energy / deposit.energyCapacity < CONSTS.EMPTY_LEVEL) {
		return true;
	}

	return false;
};

Deposits.prototype.getEmptyDepositOnId = function(id) {
	var resource = Game.getObjectById(id);

	if(resource && this.isEmptyDeposit(resource)) {
		return resource;
	}

	return false;
};

Deposits.prototype.getClosestEmptyDeposit = function(creep) {
	var resources = this.getEmptyDeposits();
	var resource = false;
	if(resources.length != 0) {
		resource = creep.pos.findClosest(resources);
	}
	if(!resource) {
		resource = this.getSpawnDeposit();
	}

	return resource;
};

Deposits.prototype.energy = function() {
	return this.cache.remember(
		'deposits-energy',
		function() {
			var energy = 0;
			var resources = this.deposits;

			for(var i = 0; i < resources.length; i++) {
				var res = resources[i];
				energy += res.energy;
			}

			for(var i = 0; i < this.spawns.length; i++) {
				energy += this.spawns[i].energy;
			}

			return energy;
		}.bind(this)
	);
};

Deposits.prototype.energyCapacity = function() {
	return this.cache.remember(
		'deposits-energy-capacity',
		function() {
			var energyCapacity = 0;
			var resources = this.deposits;
			for(var i = 0; i < resources.length; i++) {
				var res = resources[i];
				energyCapacity += res.energyCapacity;
			}

			for(var i = 0; i < this.spawns.length; i++) {
				energyCapacity += this.spawns[i].energyCapacity;
			}

			return energyCapacity;
		}.bind(this)
	);
};

Deposits.prototype.getFullDeposits = function() {
	return this.cache.remember(
		'deposits-full',
		function() {
			var full = [];
			var deposits = this.deposits;
			for(var i = 0; i < deposits.length; i++) {
				var deposit = deposits[i];
				if(deposit.energy == deposit.energyCapacity) {
					full.push(deposit);
				}
			}
			return full;
		}.bind(this)
	);
};

// PRIVATE
function filterExtensions(structure) {
	if(structure.structureType == STRUCTURE_EXTENSION) {
		return true;
	}

	return false;
}


module.exports = Deposits;
