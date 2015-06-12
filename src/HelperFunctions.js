var HelperFunctions = {};
HelperFunctions.extend = function(target, source) {
	for(var n in source) {
		if(!source.hasOwnProperty(n)) {
			continue;
		}
		if(target.hasOwnPropert(n)) {
			continue;
		}
		
		target[n] = source[n];
	}
}

module.exports = HelperFunctions;