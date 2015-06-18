var HelperFunctions = require('HelperFunctions');
var RoomHandler = require('RoomHandler');
var ScoutHandler = require('ScoutHandler');
var Room = require('Room');
var CreepBase = require('CreepBase');
var CreepScout = require('CreepScout');

//ScoutHandler.setRoomHandler(RoomHandler);

// Init rooms
for(var n in Game.rooms) {
	var roomHandler = new Room(Game.rooms[n], RoomHandler);
	RoomHandler.set(Game.rooms[n].name, roomHandler);
};

// Load rooms
var rooms = RoomHandler.getRoomHandlers();
for(var n in rooms) {
	var room = rooms[n];
	room.loadCreeps();
	room.populate();

	console.log(
		room.room.name + ' | ' +
		'goals met:' +
		room.population.goalsMet() +
		', population: ' +
		room.population.getTotalPopulation() + '/' + room.population.getMaxPopulation() +
		' (' + room.population.getType('CreepBuilder').total + '/' +
		room.population.getType('CreepMiner').total + '/' +
		room.population.getType('CreepCarrier').total + '/' +
		room.population.getType('CreepSoldier').total + 
		'), ' +
		'resources at: ' + parseInt( (room.depositManager.energy() / room.depositManager.energyCapacity())*100) +'%, ' +
		'max resources: ' + room.depositManager.energyCapacity() +'u, ' +
		'next death: ' + room.population.getNextExpectedDeath() +' ticks'
	);
};

// Load scouts.
//ScoutHandler.loadScouts();
//ScoutHandler.spawnNewScouts();

HelperFunctions.garbageCollection();
