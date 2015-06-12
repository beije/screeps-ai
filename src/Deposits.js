var Cache = require('Cache');
var CONSTS = {
	EMPTY_LEVEL: 0.5
};

function Deposits(room) {
	this.room = room;
	this.deposits = this.room.find(
		FIND_MY_STRUCTURES,
		{
			filter: filterExtensions
		}
	);
	this.spawns = this.room.find(FIND_MY_SPAWNS);
	
};

Deposits.prototype.getSpawnDeposit = function() {
	if(this.spawns.length != 0) {
		return this.spawns[0];
	}
	
	return false;
};

Deposits.prototype.getEmptyDeposits = function() {
	return Cache.remember(
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
	return Cache.remember(
		'deposits-energy',
		function() {
			var energy = 0;
			var resources = this.deposits;
			
			for(var i = 0; i < resources.length; i++) {
				var res = resources[i];
				energy += res.energy;
			}
			
			return energy;
		}.bind(this)
	);
};

Deposits.prototype.energyCapacity = function() {
	return Cache.remember(
		'deposits-energy-capacity',
		function() {
			var energyCapacity = 0;
			var resources = this.deposits;
			for(var i = 0; i < resources.length; i++) {
				var res = resources[i];
				energyCapacity += res.energyCapacity;
			}
			return energyCapacity;
		}.bind(this)
	);
};

// PRIVATE
function filterExtensions(structure) {
	if(i.structureType == STRUCTURE_EXTENSION) {
		return true;
	}
	
	return false;
}


module.exports = Deposits;