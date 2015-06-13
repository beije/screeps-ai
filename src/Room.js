var Deposits = require('Deposits');
var CreepFactory = require('CreepFactory');
var Population = require('Population');
var Resources = require('Resources');
var Constructions = require('Constructions');

function Room(room) {
	this.room = room;
	this.creeps = [];
	this.structures = [];

	this.population = new Population(this.room);
	this.depositManager = new Deposits(this.room);
	this.resourceManager = new Resources(this.room, this.population);
	this.constructionManager = new Constructions(this.room);

	this.creepFactory = new CreepFactory(this.depositManager, this.resourceManager, this.constructionManager, this.population);
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
		this.creeps.push(
			this.creepFactory.load(creeps[n])
		);
	}
}

module.exports = Room;
