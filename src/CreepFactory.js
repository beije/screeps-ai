var HelperFunctions = require('HelperFunctions');

var CreepBase = require('CreepBase');
var CreepBuilder = require('CreepBuilder');
var CreepMiner = require('CreepMiner');
var CreepSoldier = require('CreepSoldier');
var CreepHealer = require('CreepHealer');

function CreepFactory(depositManager, resourceManager) {
	this.depositManager = depositManager;
	this.resourceManager = resourceManager
};

CreepFactory.prototype.load = function(creep) {
	var loadedCreep = null;
	if(!creep) {
		// Create new one.
		return;
	}
	
	switch(creep.memory.role) {
		case 'builder':
			loadedCreep = new CreepBuilder(creep, this.depositManager);
		break;
		case 'miner':
			loadedCreep = new CreepMiner(creep, this.depositManager, this.resourceManager);
		break;
		case 'soldier':
			loadedCreep = new CreepSoldier(creep);
		break;
		case 'healer':
			loadedCreep = new CreepHealer(creep, this.depositManager);
		break;
	}
	
	HelperFunctions.extend(loadedCreep, CreepBase);
	
	return loadedCreep;
};

module.exports = CreepFactory;