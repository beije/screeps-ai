var HelperFunctions = require('HelperFunctions');
var Room = require('Room');
var rooms = [];

for(var n in Game.rooms) {
	rooms.push(new Room(Game.rooms[n]));
};

for(var i = 0; i < rooms.length; i++) {
	rooms[i].loadCreeps();
	rooms[i].populate();
};

HelperFunctions.garbageCollection();
