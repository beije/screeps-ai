var PopulationCounter = require('PopulationCounter');
var Cached = {
	energyResources: {}
};

function setup() {
	var rooms = Game.rooms;
	for(var n in rooms) {
		EnergyResources.getSources(rooms[n]);
	}
}

var EnergyResources = {};

EnergyResources.distributeResources = function() {
	var rooms = Game.rooms;
	for(var n in rooms) {
		var sources = this.getSources(rooms[n]);
		var creeps = PopulationCounter.getPopulationInRoom(rooms[n]);
		var perSource = creeps.length/sources.length;
		var counter = 0;
		var source = 0;
		for(var i = 0; i < creeps.length; i++) {
			var creep = creeps[i];
			if(creep.memory.role == 'harvester' || creep.memory.role == 'builder') {
				creep.memory.selectedSource = source;
			}
			counter++;
			if(counter >= perSource) {
				counter = 0;
				source++;
			}
		}
	}

};

EnergyResources.getAvailableResource = function() {};

EnergyResources.getSources = function(room) {
	var id = room.id;
	if(!Cached.energyResources[id]) {
		Cached.energyResources[id] = room.find(FIND_SOURCES);
	}
	
	return Cached.energyResources[id];
};
setup();
module.exports = EnergyResources;