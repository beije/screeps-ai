/*test*/
var types = {
	builder: require('Builder'),
	guard: require('Guard'),
	harvester: require('Harvester')
};
var creeperCounter = require('CreeperCounter');
var Creator = require('Creator');
var Resources = require('Resources');

Memory.fullResourceTicker = 0;

console.log(
	'goals met:' + 
	creeperCounter.goalsMet() + 
	', population: ' + 
	creeperCounter.population + 
	' (' + creeperCounter.getType('builder').total + '/' + creeperCounter.getType('harvester').total + '/' + creeperCounter.getType('guard').total + '), ' + 
	'resources at: ' + parseInt( (Resources.energy() / Resources.energyCapacity())*100) +'%');
for(var name in Game.creeps) {
	var creep = Game.creeps[name];
	var creepType = creep.memory.role;
	types[creepType](creep);
}

for(var name in Game.spawns) {
	var spawn = Game.spawns[name];
	if(spawn.spawning) {
		continue;
	}

	if((Resources.energy() / Resources.energyCapacity()) > 0.2) {
		var forceBuild = false;
		if(Memory.fullResourceTicker == 50) {
			forceBuild = true;
		}
		var types = creeperCounter.getTypes()
		for(var i = 0; i < types.length; i++) {
			var type = creeperCounter.getType(types[i]);
			
			if((i == types.length-1 && Resources.energy() == Resources.energyCapacity())) {
				Memory.fullResourceTicker++;
			} else {
				Memory.fullResourceTicker = 0;
			}
			
			if((type.goalPercentage > type.currentPercentage && type.total < type.max) || forceBuild) {
				Creator(types[i]); break;
			}
		}
	}
	
}