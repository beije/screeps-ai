var Cache = require('Cache');
function Resources(room, population) {
	this.cache = new Cache();
	this.room = room;
	this.population = population;
}

Resources.prototype.getAvailableResource = function() {
	// Some kind of unit counter per resource (with Population)
	var srcs = this.getSources();
	var srcIndex = Math.floor(Math.random()*srcs.length);

	return srcs[srcIndex];
};
Resources.prototype.getResourceById = function(id) {
	return Game.getObjectById(id);
};
Resources.prototype.getSources = function(room) {
	// TODO: Fix cache.
	return this.room.find(FIND_SOURCES);
};

module.exports = Resources;
