/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('PopulationCounter'); // -> 'a thing'
 */

var Cached = {
	nextDeath: -1
};

function PopulationCounter() {
	this.population = 0;
	this.populationLevelMultiplier = 5;
	this.typeDistribution = {
		harvester: {
			total: 0,
			goalPercentage: 0.5,
			currentPercentage: 0,
			max: 20
		},
		builder: {
			total: 0,
			goalPercentage: 0.3,
			currentPercentage: 0,
			max: 12
		},
		guard: {
			total: 0,
			goalPercentage: 0.2,
			currentPercentage: 0,
			max: 8
		}
	};

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		var creepType = creep.memory.role;
		this.typeDistribution[creepType].total++;
		this.population++;
	}
	
	for(var name in this.typeDistribution) {
		var curr = this.typeDistribution[name];
		this.typeDistribution[name].currentPercentage = curr.total / this.population;
	}
};

PopulationCounter.prototype.goalsMet = function() {
	for(var n in this.typeDistribution) {
		var type = this.typeDistribution[n];
		if(type.currentPercentage < (type.goalPercentage - type.goalPercentage/4) || type.total == 0) {
			return false;
		}
	}
	
	return true;
};

PopulationCounter.prototype.getType = function(type) {
	return this.typeDistribution[type];
};


PopulationCounter.prototype.getTypes = function(type) {
	var types = [];
	for(var n in this.typeDistribution) {
		types.push(n);
	}
	return types;
};
 
PopulationCounter.prototype.totalPopulation = function() {
	return this.population;
};
 
PopulationCounter.prototype.maxPopulation = function() {
	var population = 0;
	for(var n in this.typeDistribution) {
		population += this.typeDistribution[n].max;
	}
	return population;
};

PopulationCounter.prototype.getNextExpectedDeath = function() {
	if(Cached.nextDeath == -1) {
		Cached.nextDeath = 1000000;
		for(var name in Game.creeps) {
			var creep = Game.creeps[name];
			if(creep.ticksToLive < Cached.nextDeath) {
				Cached.nextDeath = creep.ticksToLive;
			}
		}
	}
	
	return Cached.nextDeath;
};

module.exports = new PopulationCounter();