/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Builder'); // -> 'a thing'
 */
var PopulationCounter = require('PopulationCounter');
var harvester = require('CreepHarvester');
var Resources = require('Resources');

module.exports = function (creep) {
	if(PopulationCounter.goalsMet() == false || (Resources.energy() / Resources.energyCapacity()) < 0.2) {
		harvester(creep);
 		return;
	}

	if(creep.energy == 0) {
		var res = Resources.getSpawnResource();
		if(res){
			creep.moveTo(res);
			res.transferEnergy(creep);
		}
	} else {
		var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			creep.moveTo(targets[0]);
			var result = creep.build(targets[0]);
			console.log(result);
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