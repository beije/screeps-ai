var HelperFunctions = {};
HelperFunctions.extend = function(target, source) {
	for(var n in source) {
		if(!source.hasOwnProperty(n)) {
			continue;
		}
		if(target.hasOwnProperty(n)) {
			continue;
		}

		target[n] = source[n];
	}
};

HelperFunctions.garbageCollection = function() {
	var counter = 0;
	for(var n in Memory.creeps) {
		var c = Game.creeps[n];
		if(!c) {
			delete Memory.creeps[n];
			counter++;
		}
	}
}
module.exports = HelperFunctions;
