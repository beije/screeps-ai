/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
var ACTIONS = {
	HARVEST: 1,
	DEPOSIT: 2
};

function CreepMiner(creep, resourceManager) {
	this.cache = require('Cache');
	this.creep = creep;
	this.resourceManager = resourceManager;
	this.resource = false;
};

CreepMiner.prototype.init = function() {
	this.remember('role', 'CreepMiner');

	if(!this.remember('source')) {
		var src = this.resourceManager.getAvailableResource();
		this.remember('source', src.id);
	}

	this.resource = this.resourceManager.getResourceById(this.remember('source'));

	this.act();
};

CreepMiner.prototype.act = function() {
	this.giveEnergy();
	if(this.creep.energy == this.creep.energyCapacity) {
		return;
	}
	this.creep.moveTo(this.resource);
	this.creep.harvest(this.resource);
	this.remember('last-energy', this.creep.energy);
}

CreepMiner.prototype.giveEnergy = function() {
	var creepsNear = this.creep.pos.findInRange(FIND_MY_CREEPS, 1);
	if(creepsNear.length){
		for(var n in creepsNear){
			if(creepsNear[n].memory.role === 'CreepMiner'){
				if(creepsNear[n].memory['last-energy'] == creepsNear[n].energy && creepsNear[n].energy < creepsNear[n].energyCapacity) {
					this.creep.transferEnergy(creepsNear[n]);
				}
			}
		}
	}
}

module.exports = CreepMiner;
