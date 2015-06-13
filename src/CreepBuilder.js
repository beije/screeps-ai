/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Builder'); // -> 'a thing'
 */
var ACTIONS = {
	HARVEST: 1,
	CONSTRUCT: 2
};

var CreepBuilder = function(creep, depositManager, resourceManager, constructionManager) {
	this.creep = creep;
	this.depositManager = depositManager;
	this.resourceManager = resourceManager;
	this.constructionManager = constructionManager;
	this.resource = false;
};

CreepBuilder.prototype.init = function() {
	this.remember('role', 'CreepBuilder');

	if(!this.remember('source')) {
		var src = this.resourceManager.getAvailableResource();
		this.remember('source', src.id);
	} else {
		this.resource = this.resourceManager.getResourceById(this.remember('source'));
	}

	if(this.randomMovement() == false) {
		this.act();
	}
};

CreepBuilder.prototype.act = function() {
	if(this.creep.energy == 0 || (this.remember('last-action') == ACTIONS.HARVEST && this.creep.energy < this.creep.energyCapacity)) {
		var spawn = this.depositManager.getSpawnDeposit();
		if(this.remember('last-action') == ACTIONS.HARVEST || (spawn.energy / spawn.energyCapacity == 0)) {
			this.harvestEnergy();
			this.remember('last-action', ACTIONS.HARVEST)
		} else {
			this.collectEnergy();
		}
	} else {
		this.construct();
		this.remember('last-action', ACTIONS.CONSTRUCT)
	}
};

CreepBuilder.prototype.collectEnergy = function() {
	var deposit = this.depositManager.getSpawnDeposit();
	this.creep.moveTo(deposit);
	deposit.transferEnergy(this.creep);
}

CreepBuilder.prototype.harvestEnergy = function() {
	this.creep.moveTo(this.resource);
	this.creep.harvest(this.resource);
	this.remember('last-action', ACTIONS.HARVEST);
	this.forget('closest-deposit');
}

CreepBuilder.prototype.construct = function() {
	var site = this.constructionManager.getClosestConstructionSite(this.creep);
	if(site) {
		this.creep.moveTo(site);
		var result = this.creep.build(site);
	} else {
		var controller = this.constructionManager.getController();

		this.creep.moveTo(controller);
		this.creep.upgradeController(controller);
	}
}


module.exports = CreepBuilder;
