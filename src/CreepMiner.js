/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
var Cache = require('Cache');
var ACTIONS = {
	HARVEST: 1,
	DEPOSIT: 2
};

function CreepMiner(creep, resourceManager) {
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
	this.harvestEnergy()
};

CreepMiner.prototype.harvestEnergy = function() {
	if(this.creep.energy == this.creep.energyCapacity) {
		return;
	}
	this.creep.moveTo(this.resource);
	this.creep.harvest(this.resource);
}

module.exports = CreepMiner;
