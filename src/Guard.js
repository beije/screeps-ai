/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Guard'); // -> 'a thing'
 */
var positions = [
	[0,0],
	[0,49],
	[49,49],
	[49,0]
];
	
function convertPosToSimple(pos) {
	return {
		x: pos.x,
		y: pos.y
	};
}
	
module.exports = function (creep) {
	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
	if(creep.memory.currentObjective === undefined) {
		creep.memory.currentObjective = 0;
	}
	if(creep.memory.lastPosition == undefined) {
		creep.memory.lastPosition = {x:0,y:0};
	}
	if(targets.length) {
		creep.moveTo(targets[0]);
		creep.attack(targets[0]);
	} else {
		//var exits = Room.find(FIND_EXIT);
		
		if(creep.memory.lastPosition.x == convertPosToSimple(creep.pos).x && creep.memory.lastPosition.y == convertPosToSimple(creep.pos).y) {
			creep.memory.movementAttempts++;
		}
		if(creep.memory.movementAttempts == 5) {
			creep.memory.movementAttempts = 0;
			creep.memory.lastPosition = {x:0, y:0};
			creep.memory.currentObjective++;
			
			if(creep.memory.currentObjective >= positions.length) {
				creep.memory.currentObjective = 0;
			}
		} else {
			creep.memory.lastPosition = convertPosToSimple(creep.pos);
		}
		var num = creep.memory.currentObjective;
		creep.moveTo(positions[num][0], positions[num][1]);

	}
}