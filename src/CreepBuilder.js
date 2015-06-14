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

	//if(this.randomMovement() == false) {
		this.act();
	//}
};

CreepBuilder.prototype.act = function() {
	var site = this.constructionManager.getClosestConstructionSite(this.creep);
	this.giveEnergy();
	if(site) {
		this.creep.moveTo(site);
		var result = this.creep.build(site);
	} else {
		var controller = this.constructionManager.getController();
		this.creep.moveTo(controller);
		this.creep.upgradeController(controller);
	}
	this.remember('last-energy', this.creep.energy);
};

CreepBuilder.prototype.giveEnergy = function() {
	var creepsNear = this.creep.pos.findInRange(FIND_MY_CREEPS, 1);
	if(creepsNear.length){
		for(var n in creepsNear){
			if(creepsNear[n].memory.role === 'CreepBuilder'){
				if(creepsNear[n].memory['last-energy'] > creepsNear[n].energy) {
					this.creep.transferEnergy(creepsNear[n]);
				}
			}
		}
	}
}

module.exports = CreepBuilder;
