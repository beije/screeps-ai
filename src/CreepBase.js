var CreepBase = {};

CreepBase.remember = function(key, value) {
	if(value === undefined) {
		return this.creep.memory[key];
	}

	this.creep.memory[key] = value;

	return value;
}

CreepBase.forget = function(key) {
	delete this.creep.memory[key];
}

CreepBase.randomMovement = function() {
	if(!this.remember('temp-pos')) {
		this.remember('temp-pos', {x:parseInt(Math.random()*50), y:parseInt(Math.random()*50)});
	}
	if(!this.remember('last-pos')) {
		this.remember('last-pos', {x:0, y:0});
	}
	if(!this.remember('last-energy')) {
		this.remember('last-energy', 0);
	}
	if(!this.remember('move-counter')) {
		this.remember('move-counter', 0);
	}
	if(!this.remember('move-attempts')) {
		this.remember('move-attempts', 0);
	}

	var moveCounter = this.remember('move-counter');
	var moveAttempts = this.remember('move-attempts');
	var lastEnergy = this.remember('last-energy');
	var tempPos = this.remember('temp-pos');
	var lastPos = this.remember('last-pos');
	var currPos = this.creep.pos;

	if(lastEnergy != this.creep.energy) {
		moveAttempts = 0;
		this.remember('move-attempts', moveAttempts)
	}

	if(lastPos.x == currPos.x && lastPos.y == currPos.y) {
		moveAttempts++;
		if(moveAttempts >= 15) {
			moveAttempts = 0;
			moveCounter = 5;
		}
		this.remember('move-attempts', moveAttempts)
		this.remember('move-counter', moveCounter)
	}

	if(moveCounter) {
		moveCounter--;
		this.remember('move-counter', moveCounter);
		this.creep.moveTo(tempPos.x, tempPos.y);
		return true;
	}

	this.remember('last-pos', {x:this.creep.pos.x, y:this.creep.pos.y});
	this.remember('last-energy', this.creep.energy);

	return false;
};

module.exports = CreepBase;
