/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
var Resources = require('Resources');
module.exports = function (creep) {
	setupHarvester(creep);
	var res = Resources.getClosestEmptyResource(creep);
	//console.log(closestRes);
	//var res = Resources.getEmptyResource(creep.energyCapacity);
	var sources = creep.room.find(FIND_SOURCES);
	var lastPos = creep.memory.lastPos;
	var currPos = creep.pos;
	
	if(creep.memory.selectedSource == undefined) {
		creep.memory.selectedSource = Math.floor(Math.random()*sources.length);
	}

	if(creep.memory.lastEnergy != creep.energy) {
		creep.memory.moveAttempts = 0;    
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

	if(lastPos.x == currPos.x && lastPos.y == currPos.y) {
		creep.memory.moveAttempts++;
		if(creep.memory.moveAttempts >= 15) {
			creep.memory.moveAttempts = 0;
			creep.memory.moveCounter = 5;
		}
	}
	
	if(creep.memory.moveCounter) {
		creep.memory.moveCounter--;
		var tempPos = creep.memory.tempPos;
		creep.moveTo(tempPos.x, tempPos.y);
		return;
	}
	
	creep.memory.lastPos.x = creep.pos.x;
	creep.memory.lastPos.y = creep.pos.y;
	creep.memory.lastEnergy = creep.energy;
	
	/*if(creep.ticksToLive < 300 && creep.energy != 0) {
		//var res = Resources.getEmptyResource();
		//creep.moveTo(res);
		creep.transferEnergy(res);
		return;
	}*/
	var continueDeposit = false;
	/*if(creep.energy != 0 && creep.memory.lastEnergy == creep.energy && res) {
		var closest = creep.pos.findClosest([sources[creep.memory.selectedSource], res]);
		if(closest === res) {
			continueDeposit = true;
		}
	}*/

	if(creep.energy < creep.energyCapacity && continueDeposit == false) {
		creep.moveTo(sources[creep.memory.selectedSource]);
		creep.harvest(sources[creep.memory.selectedSource]);
	} else {
		creep.moveTo(res);
		creep.transferEnergy(res);
	}
};

function setupHarvester(creep) {
	if(!creep.memory.tempPos) {
		creep.memory.tempPos = {x:parseInt(Math.random()*50), y:parseInt(Math.random()*50)};
	}
	if(!creep.memory.lastPos) {
		creep.memory.lastPos = {};
	}
	if(!creep.memory.lastEnergy) {
		creep.memory.lastEnergy = 0;
	}
	if(!creep.memory.moveCounter) {
		creep.memory.moveCounter = 0;
	}
	if(!creep.memory.moveAttempts) {
		creep.memory.moveAttempts = 0;
	}
};