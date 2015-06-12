/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('ResourceDeposits'); // -> 'a thing'
 */
var Cached = {
	allContainers: false,
	emptyResources: false,
	energyCapacity: -1,
	energy: -1
};
var ResourceDeposits = {};

ResourceDeposits.getAllContainers = function() {
	if(Cached.allContainers) {
		return Cached.allContainers;
	}
	
	var resources = [];
	for(var name in Game.structures) {
		var res = Game.structures[name];
		if(res.my == false) {
			continue;
		}
		if(res.structureType == STRUCTURE_EXTENSION) {
			resources.push(res);
		}
	}
	
	for(var i in Game.spawns) {
		var res = Game.spawns[i];
		resources.push(res);
	}
	Cached.allContainers = resources;
	
	return resources;
};

ResourceDeposits.isEmptyDeposit = function(deposit) {
	if(deposit.energy / deposit.energyCapacity < 0.5) {
		return true;
	}
	
	return false;
}
ResourceDeposits.getEmptyDepositOnId = function(id) {
	var resource = Game.getObjectById(id);

	if(resource && this.isEmptyDeposit(resource)) {
		return resource;
	}
	
	return false;
};
ResourceDeposits.energy = function() {
	if(Cached.energy === -1) {
		var energy = 0;
		var resources = this.getAllContainers();
		for(var i = 0; i < resources.length; i++) {
			var res = resources[i];
			energy += res.energy;
		}
		Cached.energy = energy;
	}
	
	return Cached.energy;
}
ResourceDeposits.energyCapacity = function() {
	if(Cached.energyCapacity === -1) {
		var energyCapacity = 0;
		var resources = this.getAllContainers();
		for(var i = 0; i < resources.length; i++) {
			var res = resources[i];
			energyCapacity += res.energyCapacity;
		}
		Cached.energyCapacity = energyCapacity;
	}
	
	return Cached.energyCapacity;
} 

ResourceDeposits.getEmptyResources = function() {
	if(Cached.emptyResources == false) {
		var resources = this.getAllContainers();
		var empty = [];
		var len = resources.length
		for(var i = 0; i < len; i++) {
			var res = resources[i];
			if(this.isEmptyDeposit(res)) {
				empty.push(res);
			}
		}

		Cached.emptyResources = empty;
	}

	
	return Cached.emptyResources;
};

ResourceDeposits.getClosestEmptyResource = function(creep) {
	var resources = this.getEmptyResources();
	var resource = false;
	if(resources.length != 0) {
		resource = creep.pos.findClosest(resources);
	}
	if(!resource) {
		resource = this.getSpawnResource();
	}
	
	return resource;
};


ResourceDeposits.getEmptyResource = function(capacity) {
	var resources = this.getAllContainers();
	capacity = parseInt(capacity);
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		
		if(res.energy >= res.energyCapacity || capacity > res.energyCapacity) {
			continue;
		}
		
		return res;
	}
	
	if(capacity) {
		return this.getEmptyResource();
	}
	
	return false;
};
ResourceDeposits.getFullResources = function() {
	var resources = this.getAllContainers();
	var full = [];
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		if(res.energy == res.energyCapacity) {
			full.push(res);
		}
	}
	
	return full;
};
ResourceDeposits.getFullResource = function() {
	var resources = this.getFullResources();
	if(resources.length) {
		return resources[0];
	}
		
	return false;
};
ResourceDeposits.getSpawnResource = function() {
	var resources = this.getAllContainers();
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		if(res.structureType == STRUCTURE_EXTENSION) {
			continue;
		}

		return res;
	}
	
	return false;
};
 
module.exports = ResourceDeposits;