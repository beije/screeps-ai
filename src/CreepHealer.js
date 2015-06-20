var Cache = require('Cache');
function CreepHealer(creep) {
    this.cache = new Cache();
    this.creep = creep;
};

CreepHealer.prototype.init = function() {
    this.remember('role', 'CreepHealer');
    if(!this.remember('srcRoom')) {
		this.remember('srcRoom', this.creep.room.name);
	}

    if(this.moveToNewRoom() == true) {
		return;
	}

    this.act();
};

CreepHealer.prototype.act = function() {
    var avoidArea = this.getAvoidedArea();
    var injured = this.getInjuredCreep();
    if(injured) {
        this.creep.moveTo(injured, {avoid: avoidArea});
        this.creep.heal(injured);
    }

}

CreepHealer.prototype.getInjuredCreep = function() {
    return this.creep.pos.findClosest(FIND_MY_CREEPS, {
        filter: function(c) {
            if(c.hits < c.hitsMax) {
                return true;
            }
        }
    })
}

module.exports = CreepHealer;
