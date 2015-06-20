var HelperFunctions = require('HelperFunctions');

var CreepBase = require('CreepBase');
var CreepBuilder = require('CreepBuilder');
var CreepMiner = require('CreepMiner');
var CreepSoldier = require('CreepSoldier');
var CreepHealer = require('CreepHealer');
var CreepScout = require('CreepScout');
var CreepCarrier = require('CreepCarrier');
var CreepShooter = require('CreepShooter');

function CreepFactory(depositManager, resourceManager, constructionsManager, population, roomHandler) {
	this.depositManager = depositManager;
	this.resourceManager = resourceManager;
	this.population = population;
	this.constructionsManager = constructionsManager;
	this.roomHandler = roomHandler;
};

CreepFactory.prototype.load = function(creep) {
	var loadedCreep = null;
	var role = creep.memory.role;
	if(!role) {
		role = creep.name.split('-')[0];
	}

	switch(role) {
		case 'CreepBuilder':
			loadedCreep = new CreepBuilder(creep, this.depositManager, this.constructionsManager);
		break;
		case 'CreepMiner':
			loadedCreep = new CreepMiner(creep, this.resourceManager);
		break;
		case 'CreepSoldier':
			loadedCreep = new CreepSoldier(creep);
		break;
		case 'CreepHealer':
			loadedCreep = new CreepHealer(creep);
		break;
		case 'CreepCarrier':
			loadedCreep = new CreepCarrier(creep, this.depositManager, this.resourceManager, this.constructionsManager);
		break;
		case 'CreepShooter':
			loadedCreep = new CreepShooter(creep);
		break;
	}

	if(!loadedCreep) {
		return false;
	}

	HelperFunctions.extend(loadedCreep, CreepBase);
	loadedCreep.init();

	return loadedCreep;
};

CreepFactory.prototype.new = function(creepType, spawn) {
	var abilities = [];
	var id = new Date().getTime();
	var creepLevel = this.population.getTotalPopulation() / this.population.populationLevelMultiplier;
	var resourceLevel = this.depositManager.getFullDeposits().length / 5;
	var level = Math.floor(creepLevel + resourceLevel);
	if(this.population.getTotalPopulation() < 5){
		level = 1;
	}
	// TOUGH          10
	// MOVE           50
	// CARRY          50
	// ATTACK         80
	// WORK           100
	// RANGED_ATTACK  150
	// HEAL           200

	switch(creepType) {
		case 'CreepMiner':
		case 'CreepBuilder':
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
				abilities = [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
			} else
			if(level <= 6) {
				abilities = [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
			} else
			if(level <= 7) {
				abilities = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
			} else
			if(level <= 8) {
				abilities = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
			} else
			if(level <= 9) {
				abilities = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
			} else
			if(level >= 10) {
				abilities = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
			}
		break;
		case 'CreepCarrier':
			if(level <= 1) {
				abilities = [CARRY, MOVE];
			} else
			if(level <= 2) {
				abilities = [CARRY, CARRY, MOVE];
			} else
			if(level <= 3) {
				abilities = [CARRY, CARRY, MOVE, MOVE];
			} else
			if(level <= 4) {
				abilities = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level <= 5) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level <= 6) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level <= 7) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level <= 8) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level <= 9) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			} else
			if(level >= 10) {
				abilities = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,  CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
			}
		break;
		case 'CreepSoldier':
			if(level <= 1) {
				abilities = [TOUGH, ATTACK, MOVE];
			} else
			if(level <= 2) {
				abilities = [TOUGH, MOVE, ATTACK, MOVE];
			} else
			if(level <= 3) {
				abilities = [TOUGH, MOVE, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 4) {
				abilities = [TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 5) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 6) {
				abilities = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 7) {
				abilities = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 8) {
				abilities = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level <= 9) {
				abilities = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			} else
			if(level >= 10) {
				abilities = [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE];
			}
		break;
		case 'CreepShooter':
			if(level <= 5) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			} else
			if(level <= 6) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			} else
			if(level <= 7) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			} else
			if(level <= 8) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			} else
			if(level <= 9) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			} else
			if(level >= 10) {
				abilities = [TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE];
			}
		break;
		case 'CreepScout':
			abilities = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
		break;
		case 'CreepHealer':
			abilities = [MOVE, MOVE, MOVE, HEAL, MOVE];
		break;
	}

	var canBuild = spawn.canCreateCreep(
		abilities,
		creepType + '-' + id,
		{
			role: creepType
		}
	);
	if(canBuild !== 0) {
		console.log('Can not build creep: ' + creepType + ' @ ' + level);
		return;
	}

	console.log('Spawn level ' + level + ' ' + creepType + '(' + creepLevel + '/' + resourceLevel + ')');
	spawn.createCreep(abilities, creepType + '-' + id, {role: creepType});
};

module.exports = CreepFactory;
