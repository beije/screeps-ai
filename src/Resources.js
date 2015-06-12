var Cache = require('Cache');

function Resources(room, population) {
	this.room = room;
}

Resources.prototype.getAvailableResource = function() {
	// Some kind of unit counter per resource (with Population)
};

Resources.prototype.getSources = function(room) {
	return Cache.remember(
		'resources-sources',
		function() {
			return this.room.find(FIND_SOURCES);
		}.bind(this)
		
	);
};

module.exports = Resources;