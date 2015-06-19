var Cache = require('Cache');
function Population(room) {
	this.cache = new Cache();
	this.room = room;
	this.population = 0;
	this.populationLevelMultiplier = 8;
	this.typeDistribution = {
		CreepMiner: {
			total: 0,
			goalPercentage: 0.2,
			currentPercentage: 0,
			max: 5,
			minExtensions: 0
		},
		CreepCarrier: {
			total: 0,
			goalPercentage: 0.3,
			currentPercentage: 0,
			max: 15,
			minExtensions: 0
		},
		CreepBuilder: {
			total: 0,
			goalPercentage: 0.25,
			currentPercentage: 0,
			max: 15,
			minExtensions: 0
		},
		CreepHealer: {
			total: 0,
			goalPercentage: 0.25,
			currentPercentage: 0,
			max: 2,
			minExtensions: 2
		},
		CreepSoldier: {
			total: 0,
			goalPercentage: 0.25,
			currentPercentage: 0,
			max: 5,
			minExtensions: 2
		},
		CreepShooter: {
			total: 0,
			goalPercentage: 0.2,
			currentPercentage: 0,
			max: 3,
			minExtensions: 10
		}
	};

	this.creeps = this.room.find(FIND_MY_CREEPS);

	for(var i = 0; i < this.creeps.length; i++) {
		var creepType = this.creeps[i].memory.role;
		if(!this.typeDistribution[creepType]) {
			this.typeDistribution[creepType] = createTypeDistribution(creepType);
		}
		this.typeDistribution[creepType].total++;
	}

	for(var name in this.typeDistribution) {
		var curr = this.typeDistribution[name];
		this.typeDistribution[name].currentPercentage = curr.total / this.getTotalPopulation();
	}
};

Population.prototype.goalsMet = function() {
	for(var n in this.typeDistribution) {
		var type = this.typeDistribution[n];
		if((type.currentPercentage < (type.goalPercentage - type.goalPercentage/4) && type.total < type.max) || type.total == 0  || type.total < type.max*0.75) {
			return false;
		}
	}

	return true;
};

Population.prototype.getType = function(type) {
	return this.typeDistribution[type];
};

Population.prototype.getTypes = function(type) {
	var types = [];
	for(var n in this.typeDistribution) {
		types.push(n);
	}
	return types;
};

Population.prototype.getTotalPopulation = function() {
	return this.creeps.length;
};

Population.prototype.getMaxPopulation = function() {
	return this.cache.remember(
		'max-population',
		function() {
			var population = 0;
			for(var n in this.typeDistribution) {
				population += this.typeDistribution[n].max;
			}
			return population;
		}.bind(this)
	);
};

Population.prototype.getNextExpectedDeath = function() {
	return this.cache.remember(
		'creep-ttl',
		function() {
			var ttl = 100000;
			for(var i = 0; i < this.creeps.length; i++) {
				var creep = this.creeps[i];

				if(creep.ticksToLive < ttl) {
					ttl = creep.ticksToLive;
				}

				return ttl;
			}
		}.bind(this)
	);
};

module.exports = Population;

// Private

function createTypeDistribution(type) {
	return {
		total: 0,
		goalPercentage: 0.1,
		currentPercentage: 0,
		max: 5
	};
};
