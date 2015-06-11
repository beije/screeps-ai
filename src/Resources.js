/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Resources'); // -> 'a thing'
 */
Cached = {
	allContainers: false
};
Resources = {};

Resources.getAllContainers = function() {
	if(Cached.allContainers) {
		return Cached.allContainers;
	}
	
	var resources = [];
	for(var name in Game.structures) {
		var res = Game.structures[name];
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
Resources.energy = function() {
	var energy = 0;
	var resources = this.getAllContainers();
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		energy += res.energy;
	}
	
	return energy;
}
Resources.energyCapacity = function() {
	var energyCapacity = 0;
	var resources = this.getAllContainers();
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		energyCapacity += res.energyCapacity;
	}
	
	return energyCapacity;
} 
Resources.getEmptyResource = function(capacity) {
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
Resources.getFullResource = function() {
	var resources = this.getAllContainers();
	for(var i = 0; i < resources.length; i++) {
		var res = resources[i];
		if(res.energy == res.energyCapacity) {
			return res;
		}
	}
	
	return false;
};
Resources.getSpawnResource = function() {
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
 
module.exports = Resources;