function CreepSoldier(creep) {
    this.creep = creep;
};

CreepSoldier.prototype.init = function() {
    this.remember('role', 'CreepSoldier');
    if(!this.remember('srcRoom')) {
		this.remember('srcRoom', this.creep.room.name);
	}
    this.remember('targetRoom', false);
    if(this.moveToNewRoom() == true) {
		return;
	}

    this.act();
};

CreepSoldier.prototype.act = function() {
    var avoidArea = this.getAvoidedArea();


    if(this.attackHostiles()) { return; }
    if(this.attackSpawns()) { return; }


    this.creep.moveTo(25,25, {avoid: avoidArea});
}
CreepSoldier.prototype.attackHostiles = function() {
    var avoidArea = this.getAvoidedArea();
    var targets = this.creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: function(t) {
            if(t.name == 'Source Keeper') {
                return false;
            }
        }
    });
    if(targets.length) {
        this.creep.moveTo(targets[0], {avoid: avoidArea});
        this.creep.attack(targets[0]);
        return true;
    }
}
CreepSoldier.prototype.attackSpawns = function() {
    var avoidArea = this.getAvoidedArea();
    var targets = this.creep.room.find(FIND_HOSTILE_SPAWNS);
    if(targets.length) {
        var rangedTargets = this.creep.pos.findInRange(FIND_HOSTILE_SPAWNS, 3);
        if(rangedTargets.length > 0) {
            this.creep.rangedAttack(rangedTargets[0]);
        }

        this.creep.moveTo(targets[0], {avoid: avoidArea});
        this.creep.attack(targets[0]);
        return true;
    };
}

module.exports = CreepSoldier;
