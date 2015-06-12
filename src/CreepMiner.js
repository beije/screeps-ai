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
 
var RandomMovement = require('CreepRandomMovement');
var ResourceDeposits = require('ResourceDeposits');

module.exports = function (creep) {
	setupHarvester(creep);
	var res = false;
	if(creep.memory.depositId) {
		res = ResourceDeposits.getEmptyDepositOnId(creep.memory.depositId);
	}
	if(!res) {
		res = ResourceDeposits.getClosestEmptyResource(creep);
		if(res.id) {
			creep.memory.depositId = res.id;
		}
	}
	//var res = ResourceDeposits.getEmptyResource(creep.energyCapacity);
	var sources = creep.room.find(FIND_SOURCES);
	
	if(creep.memory.selectedSource == undefined) {
		creep.memory.selectedSource = Math.floor(Math.random()*sources.length);
	}
	
	if(res && res.pos && res.pos.findClosest) {
	    if(creep.energy < creep.energyCapacity && creep.memory.lastEnergy == creep.energy){
	        var creepsNear = creep.pos.findInRange(FIND_MY_CREEPS, 1);
	        if(creepsNear.length){
	            for(var n in creepsNear){
	                if((creepsNear[n].memory.role == 'harvester' || creepsNear[n].memory.actingAs == 'harvester') && creepsNear[n].energy === creepsNear[n].energyCapacity){
	                    var closest = res.pos.findClosest([creep, creepsNear[n]]);
	                    if(closest === creep){
	                        creepsNear[n].transferEnergy(creep);
	                        break;
	                    }
	                }
	            }
	        }
	    }
    }
	
	if(RandomMovement(creep) == true) {
		return;
	}
	
	/*if(creep.ticksToLive < 300 && creep.energy != 0) {
		//var res = ResourceDeposits.getEmptyResource();
		//creep.moveTo(res);
		creep.transferEnergy(res);
		return;
	}*/
	var continueDeposit = false;
	if(creep.energy != 0 && res && creep.memory.lastAction == ACTIONS.DEPOSIT) {
		continueDeposit = true;
	}

	if(creep.energy < creep.energyCapacity && continueDeposit == false) {
		creep.moveTo(sources[creep.memory.selectedSource]);
		creep.harvest(sources[creep.memory.selectedSource]);
		creep.memory.lastAction = ACTIONS.HARVEST;
	} else {
		creep.moveTo(res);
		creep.transferEnergy(res);
		creep.memory.lastAction = ACTIONS.DEPOSIT;		
	}
};

function setupHarvester(creep) {
	if(!creep.memory.lastAction) {
		creep.memory.lastAction = ACTIONS.HARVEST;
	}
	if(!creep.memory.depositId) {
		creep.memory.depositId = false;
	}
};