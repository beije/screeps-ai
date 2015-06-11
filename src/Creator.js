/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Creator'); // -> 'a thing'
 */
var Resources = require('Resources');
var PopulationCounter = require('PopulationCounter')
 
module.exports = function (type) {
	var abilities = [];
	var id = Math.floor(Math.random()*100000);
	var creepLevel = Math.floor(PopulationCounter.getType(type).total / PopulationCounter.populationLevelMultiplier);
	var resourceLevel = Math.floor(Resources.getFullResources().length / 3);
	var level = creepLevel + resourceLevel;
	
	switch(type) {
		case 'harvester':
			if(level <= 1) {
				abilities = [WORK, CARRY, MOVE];    
			} else 
			if(level <= 2) {
				abilities = [WORK, CARRY, CARRY, MOVE];    
			} else 
			if(level <= 3) {
				abilities = [WORK, CARRY, CARRY, MOVE, MOVE];    
			} else
			if(level <= 4) {
				abilities = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];    
			} else
			if(level <= 5) {
				abilities = [TOUGH, WORK, WORK, CARRY, CARRY, MOVE, MOVE];    
			} else
			if(level > 6) {
				abilities = [TOUGH, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];    
			}
		break;
		case 'builder': 
			if(level <= 1) {
				abilities = [WORK, CARRY, MOVE];    
			} else 
			if(level <= 2) {
				abilities = [WORK, WORK, CARRY, MOVE];    
			} else 
			if(level <= 3) {
				abilities = [WORK, WORK, CARRY, MOVE, MOVE];
			} else
			if(level <= 4) {
				abilities = [WORK, WORK, WORK, CARRY, MOVE, MOVE];
			} else
			if(level <= 5) {
				abilities = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
			} else
			if(level > 6) {
				abilities = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
			}
			
		break;
		case 'guard': 
			if(level <= 1) {
				abilities = [TOUGH, ATTACK, MOVE];    
			} else 
			if(level <= 2) {
				abilities = [TOUGH, ATTACK, MOVE, MOVE];
			} else 
			if(level <= 3) {
				abilities = [TOUGH, ATTACK, ATTACK, MOVE, MOVE];
			} else
			if(level <= 4) {
				abilities = [TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE];
			} else
			if(level <= 5) {
				abilities = [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE];
			} else
			if(level > 6) {
				abilities = [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
			}
		break;
	}
	
	var canBuild = Game.spawns.spawn1.canCreateCreep(
		abilities, 
		type + '-' + id, 
		{
			role: type
		}
	);
	if(canBuild !== 0) {
		//console.log('Can not build creep: ' + type);
		return;
	}
	console.log('Spawn level ' + level + ' ' + type);
	Game.spawns.spawn1.createCreep(
		abilities, 
		type + '-' + id, 
		{
			role: type
		}
	);
};