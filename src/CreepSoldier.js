function CreepSoldier(creep) {
    this.creep = creep;
};

CreepSoldier.prototype.init = function() {
    this.remember('role', 'CreepSoldier');
    if(!this.remember('srcRoom')) {
		this.remember('srcRoom', this.creep.room.name);
	}
    if(this.creep.fatigue != 0) {
        return;
    }


    if(this.moveToNewRoom() == true) {
		return;
	}

    this.act();
};

CreepSoldier.prototype.act = function() {
    var avoidArea = this.getAvoidedArea();


    if(this.attackHostiles()) { return; }
    if(this.attackSpawns()) { return; }

    this.creep.moveTo(37,40, {avoid: avoidArea});
}
CreepSoldier.prototype.attackHostiles = function() {
    var avoidArea = this.getAvoidedArea();
    var targets = this.creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: function(t) {
            if(t.owner.username == 'Source Keeper') {
                return false;
            }
            return true;
        }
    });
    if(targets.length) {
        var closest = this.creep.pos.findClosest(targets);
        this.creep.moveTo(closest, {avoid: avoidArea});
        this.creep.attack(closest);
        return true;
    }
}
CreepSoldier.prototype.attackSpawns = function() {
    var avoidArea = this.getAvoidedArea();
    var targets = this.creep.room.find(FIND_HOSTILE_SPAWNS);
    if(targets.length) {
        this.creep.moveTo(targets[0], {avoid: avoidArea});
        this.creep.attack(targets[0]);
        return true;
    };
}

module.exports = CreepSoldier;
