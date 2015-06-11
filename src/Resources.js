/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Resources'); // -> 'a thing'
 */
var Cached = {
	allContainers: false,
	emptyResources: false,
	energyCapacity: -1,
	energy: -1
};
var Resources = {};

Resources.getAllContainers = function() {
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
Resources.energy = function() {
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
Resources.energyCapacity = function() {
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

Resources.getEmptyResources = function() {
	if(Cached.emptyResources == false) {
		console.log('get empty resources');
		var resources = this.getAllContainers();
		var empty = [];
		var len = resources.length
		for(var i = 0; i < len; i++) {
			var res = resources[i];
			if(res.energy / res.energyCapacity < 0.1) {
				empty.push(res);
			}
		}

		Cached.emptyResources = empty;
	}

	
	return Cached.emptyResources;
};


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
Resources.getFullResources = function() {
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
Resources.getFullResource = function() {
	var resources = this.getFullResources();
	if(resources.length) {
		return resources[0];
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