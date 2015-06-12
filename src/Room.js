var Deposits = require('Deposits');
var CreepFactory = require('CreepFactory');
var Population = require('Population');
var Resources = require('Resources');

function Room(room) {
	this.room = room;
	this.creeps = [];
	this.structures = [];
	
	this.population = new Population(this.room);
	this.depositManager = new Deposits(this.room);
	this.resourceManager = new Resources(this.room, this.population);
	
	this.creepFactory = new CreepFactory(this.depositsManager);
}

Room.prototype.loadCreeps = function() {
	var creeps = this.room.find(FIND_MY_CREEPS);
	for(var n in creeps) {
		this.creeps.push(
			this.creepFactory.load(creeps[n])
		);
	}
}

module.exports = Room;