var HelperFunctions = require('HelperFunctions');
var RoomHandler = require('RoomHandler');
var Room = require('Room');
var CreepBase = require('CreepBase');
var CreepScout = require('CreepScout');
var rooms = [];
var scouts = [];

for(var n in Game.rooms) {
	RoomHandler.add(Game.rooms[n].name);
	rooms.push(new Room(Game.rooms[n], RoomHandler));
};

for(var i = 0; i < rooms.length; i++) {
	rooms[i].loadCreeps();
	rooms[i].populate();
	// Check room controller level 3?
	if(rooms[i].population.goalsMet() == true) {
		rooms[i].creepFactory.new('CreepScout', rooms[i].depositManager.getSpawnDeposit());
	}
	console.log(
		rooms[i].room.name + ' | ' +
		'goals met:' +
		rooms[i].population.goalsMet() +
		', population: ' +
		rooms[i].population.getTotalPopulation() + '/' + rooms[i].population.getMaxPopulation() +
		' (' + rooms[i].population.getType('CreepBuilder').total + '/' + rooms[i].population.getType('CreepMiner').total + '/' + rooms[i].population.getType('CreepSoldier').total + '), ' +
		'resources at: ' + parseInt( (rooms[i].depositManager.energy() / rooms[i].depositManager.energyCapacity())*100) +'%, ' +
		'max resources: ' + rooms[i].depositManager.energyCapacity() +'u, ' +
		'next death: ' + rooms[i].population.getNextExpectedDeath() +' ticks'
	);
};

// MOve to scout handler or something.
for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	var role = creep.memory.role || creep.name.split('-')[0];
	if(role == 'CreepScout') {
		var c = new CreepScout(creep, RoomHandler);
		HelperFunctions.extend(c, CreepBase);
		c.init();
	}
}
HelperFunctions.garbageCollection();
