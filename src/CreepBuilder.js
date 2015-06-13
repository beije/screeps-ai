/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Builder'); // -> 'a thing'
 */
var CreepBuilder = function(creep, depositManager, constructionManager) {
	this.creep = creep;
	this.depositManager = depositManager;
	this.constructionManager = constructionManager;
};

CreepBuilder.prototype.init = function() {
	this.remember('role', 'CreepBuilder');

	if(this.randomMovement() == false) {
		this.act();
	}
};

CreepBuilder.prototype.act = function() {

	if(this.creep.energy == 0) {
		var deposit = this.depositManager.getSpawnDeposit();

		this.creep.moveTo(deposit);
		deposit.transferEnergy(this.creep);
	} else {
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
};

module.exports = CreepBuilder;
