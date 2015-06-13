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
	this.remember('role', 'CreepBuilder');

	if(this.randomMovement() == false) {
		this.act();
	}
};

CreepBuilder.prototype.act = function() {

	if(creep.energy == 0) {
		var deposit = this.depositManager.getSpawnDeposit();

		creep.moveTo(deposit);
		deposit.transferEnergy(creep);
	} else {
		var site = this.constructionsManager.getClosestConstructionSite(this.creep);
		if(site) {
			creep.moveTo(site);
			var result = creep.build(site);
		} else {
			var controller = this.constructionsManager.getController();

			this.creep.moveTo(controller);
			this.creep.upgradeController(controller);
		}
	}
};

module.exports = CreepBuilder;

/*

module.exports = function (creep) {
	if(PopulationCounter.goalsMet() == false && ((ResourceDeposits.energy() / ResourceDeposits.energyCapacity()) == 0)) {
		creep.memory.actingAs = 'harvester';
		harvester(creep);

 		return;
	}

	creep.memory.actingAs = null;

	if(RandomMovement(creep) == true) {
		return;
	}

	if(creep.energy == 0) {
		var res = ResourceDeposits.getSpawnResource();
		if(res && res.energy != 0){
			creep.moveTo(res);
			res.transferEnergy(creep);
		} else {
		    if(creep.energy < creep.energyCapacity){
		        var creepsNear = creep.pos.findInRange(FIND_MY_CREEPS, 1);
		        if(creepsNear.length){
		            for(var n in creepsNear){
		                if((creepsNear[n].memory.role == 'harvester' || creepsNear[n].memory.actingAs == 'harvester') && creepsNear[n].energy === creepsNear[n].energyCapacity){
		                	creepsNear[n].transferEnergy(creep);
		                }
		            }
		        }
		    }
		}
	} else {
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			creep.moveTo(targets[0]);
			var result = creep.build(targets[0]);
		} else {
			for(var name in Game.structures) {
				var struct = Game.structures[name];
				if(struct.structureType == STRUCTURE_CONTROLLER) {
					creep.moveTo(struct);
					creep.upgradeController(struct);
					return;
				}
			}
		}
	}
};
function setupBuilder(creep) {
	if(creep.memory.actingAs == undefined) {
		creep.memory.actingAs = null;
	}
}
*/
