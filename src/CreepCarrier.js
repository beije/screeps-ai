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

function CreepCarrier(creep, depositManager, resourceManager, constructionsManager) {
	this.creep = creep;
	this.depositManager = depositManager;
	this.resourceManager = resourceManager;
	this.resource = false;
};

CreepCarrier.prototype.init = function() {
	this.remember('role', 'CreepCarrier');

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

CreepCarrier.prototype.act = function() {
    var continueDeposit = false;
	if(this.creep.energy != 0 && this.remember('last-action') == ACTIONS.DEPOSIT) {
		continueDeposit = true;
	}

	if(this.creep.energy < this.creep.energyCapacity && continueDeposit == false) {
		this.harvestEnergy();
	} else {
		this.depositEnergy();
	}
};

CreepCarrier.prototype.depositEnergy = function() {
    this.harvest();
	var deposit = this.getDeposit();
	this.creep.moveTo(deposit);
	this.creep.transferEnergy(deposit);
	this.remember('last-action', ACTIONS.DEPOSIT);
}

CreepCarrier.prototype.getDeposit = function() {
	return Cache.remember(
		'selected-deposit',
		function() {
			var deposit = false;

			// Deposit energy
			if(this.remember('closest-deposit')) {
				deposit = this.depositManager.getEmptyDepositOnId(this.remember('closest-deposit'));
			}

			if(!deposit) {
				deposit = this.depositManager.getClosestEmptyDeposit(this.creep);
				this.remember('closest-deposit', deposit.id);
			}

			if(!deposit) {
				deposit = this.depositManager.getSpawnDeposit();
			}

			return deposit;
		}.bind(this)
	)
};

CreepCarrier.prototype.harvestEnergy = function() {
	//this.creep.moveTo(0,0);
	this.creep.moveTo(this.resource);
	this.harvest();
	this.remember('last-action', ACTIONS.HARVEST);
	this.forget('closest-deposit');
}

CreepCarrier.prototype.harvest = function() {
	var creepsNear = this.creep.pos.findInRange(FIND_MY_CREEPS, 1);
	if(creepsNear.length){
		for(var n in creepsNear){
			if(creepsNear[n].memory.role === 'CreepMiner' && creepsNear[n].energy != 0){
				creepsNear[n].transferEnergy(this.creep);
			}
            if(creepsNear[n].memory.role === 'CreepBuilder' && creepsNear[n].energy == 0 && this.creep.energy > 50){
                this.creep.transferEnergy(creepsNear[n]);
			}
		}
	}
}

module.exports = CreepCarrier;
