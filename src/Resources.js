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
	return this.cache.remember(
		'sources',
		function() {
			return this.room.find(
				FIND_SOURCES, {
					filter: function(src) {
						var targets = src.pos.findInRange(FIND_STRUCTURES, 3);
						for(var i = 0; i < targets.length; i++) {
							if(targets[i].owner && targets[i].owner.username == 'Source Keeper') {
								return false;
							}
						}

						var targets = src.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
						if(targets.length == 0) {
						    return true;
						}

						return false;
					}.bind(this)
				}
			);
		}.bind(this)
	);
};

module.exports = Resources;
