var HelperFunctions = require('HelperFunctions');
var Room = require('Room');
var rooms = [];

for(var n in Game.rooms) {
	rooms.push(new Room(Game.rooms[n]));
};

for(var i = 0; i < rooms.length; i++) {
	rooms[i].loadCreeps();
	rooms[i].populate();

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

HelperFunctions.garbageCollection();
