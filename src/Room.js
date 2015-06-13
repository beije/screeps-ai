var Deposits = require('Deposits');
var CreepFactory = require('CreepFactory');
var Population = require('Population');
var Resources = require('Resources');
var Constructions = require('Constructions');

function Room(room, roomHandler) {
	this.room = room;
	this.roomHandler = roomHandler;
	this.creeps = [];
	this.structures = [];

	this.population = new Population(this.room);
	this.depositManager = new Deposits(this.room);
	this.resourceManager = new Resources(this.room, this.population);
	this.constructionManager = new Constructions(this.room);
	this.population.typeDistribution.CreepBuilder.max = (this.constructionManager.sites+1)*2;
	this.population.typeDistribution.CreepMiner.max = (this.resourceManager.getSources().length+1)*2;
	this.population.typeDistribution.CreepCarrier.max = this.population.typeDistribution.CreepBuilder.max+this.population.typeDistribution.CreepMiner.max;
	console.log('carrier: ' + this.population.typeDistribution.CreepCarrier.max);
	console.log('CreepMiner: ' + this.population.typeDistribution.CreepMiner.max);
	console.log('CreepBuilder: ' + this.population.typeDistribution.CreepBuilder.max);
	this.creepFactory = new CreepFactory(this.depositManager, this.resourceManager, this.constructionManager, this.population, this.roomHandler);
}

Room.prototype.populate = function() {
	for(var i = 0; i < this.depositManager.spawns.length; i++) {
		var spawn = this.depositManager.spawns[i];
		if(spawn.spawning) {
			continue;
		}

		if((this.depositManager.energy() / this.depositManager.energyCapacity()) > 0.2) {
			var types = this.population.getTypes()
			for(var i = 0; i < types.length; i++) {
				var type = this.population.getType(types[i]);

				if((type.goalPercentage > type.currentPercentage && type.total < type.max)) {
					this.creepFactory.new(types[i], this.depositManager.getSpawnDeposit());
					break;
				}
			}
		}
	}

};

Room.prototype.loadCreeps = function() {
	var creeps = this.room.find(FIND_MY_CREEPS);
	for(var n in creeps) {
		var c = this.creepFactory.load(creeps[n]);
		if(c) {
			this.creeps.push(c);
		}
	}

	this.distributeResources('CreepMiner');
	this.distributeCarriers();
	//this.distributeResources('CreepCarrier');
};

Room.prototype.distributeCarriers = function() {
	var counter = 0;
	var builders = [];
	var carriers = [];
	for(var i = 0; i < this.creeps.length; i++) {
		var creep = this.creeps[i];
		if(creep.remember('role') != 'CreepBuilder') {
			builders.push(creep);
		}
		if(creep.remember('role') != 'CreepCarrier') {
			continue;
		}
		carriers.push(creep);
		if(counter%2) {
			// Construction
			creep.setDepositFor(1);
		} else {
			// Population
			creep.setDepositFor(2);
		}

		counter++;
	}
	counter = 0;
	for(var i = 0; i < carriers.length; i++) {
		var creep = carriers[i];
		if(creep.remember('role') != 'CreepBuilder') {
			continue;
		}
		creep.remember('target-worker', builders[counter].id);
		counter++;
		if(counter >= builders.length) {
			counter = 0;
		}
	}
};

Room.prototype.distributeResources = function(type) {
	var sources = this.resourceManager.getSources();
	var perSource = Math.ceil(this.population.getType(type).total/sources.length);
	var counter = 0;
	var source = 0;

	for(var i = 0; i < this.creeps.length; i++) {
		var creep = this.creeps[i];
		if(creep.remember('role') != type) {
			continue;
		}

		if(!sources[source]) {
			continue;
		}

		creep.remember('source', sources[source].id);
		counter++;
		if(counter >= perSource) {
			counter = 0;
			source++;
		}
	}
};

module.exports = Room;
