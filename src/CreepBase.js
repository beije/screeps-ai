var CreepBase = {};

CreepBase.remember = function(key, value) {
	if(!value) {
		return this.creep.memory[key];
	}
	
	this.creep.memory[key] = value;
	
	return value;
}
/*
function randomMovement(creep) {
	if(!creep.memory.tempPos) {
		creep.memory.tempPos = {x:parseInt(Math.random()*50), y:parseInt(Math.random()*50)};
	}
	if(!creep.memory.lastPos) {
		creep.memory.lastPos = {x:0, y:0};
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
	if(!creep.memory.lastEnergy) {
		creep.memory.lastEnergy = 0;
	}
	
	var lastPos = creep.memory.lastPos;
	var currPos = creep.pos;
	
	if(creep.memory.lastEnergy != creep.energy) {
		creep.memory.moveAttempts = 0;    
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
		return true;
	}
	
	creep.memory.lastPos.x = creep.pos.x;
	creep.memory.lastPos.y = creep.pos.y;
	creep.memory.lastEnergy = creep.energy;
	
	return false;
}
*/
module.exports = CreepBase;