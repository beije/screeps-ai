var positions = [
    [0,0],
    [0,49],
    [49,49],
    [49,0]
];

function CreepSoldier(creep) {
    this.creep = creep;
};

CreepSoldier.prototype.init = function() {
    this.remember('role', 'CreepSoldier');
    if(!this.remember('srcRoom')) {
		this.remember('srcRoom', this.creep.room.name);
	}
    if(this.moveToNewRoom() == true) {
		return;
	}

    this.act();
};

CreepSoldier.prototype.act = function() {
    var avoidArea = this.getAvoidedArea();
    if(this.remember('current-objective') === undefined) {
        this.remember('current-objective', 0);
    }
    if(this.remember('last-position') === undefined) {
        this.remember('last-position', {x:0, y:0});
    }
    if(this.remember('move-attempts') === undefined) {
        this.remember('move-attempts', 0);
    }

    if(this.attackHostiles()) { return; }
    if(this.attackSpawns()) { return; }

    //var exits = Room.find(FIND_EXIT);
    var lastPosition = this.remember('last-position');
    var objective = this.remember('current-objective');
    var moveAttempts = this.remember('move-attempts');
    if(lastPosition.x == this.creep.pos.x && lastPosition.y == this.creep.pos.y && this.creep.fatigue == 0) {
        moveAttempts = this.remember('move-attempts', moveAttempts+1);
    } else {
        moveAttempts = this.remember('move-attempts', 0);
    }
    if(moveAttempts == 5) {
        objective++;
        if(objective >= positions.length) {
            objective = 0;
        }

        this.remember('move-attempts', 0);
        this.remember('last-position', {x:0, y:0});
        this.remember('current-objective', objective);

    }

    this.remember('last-position', {x:this.creep.pos.x, y:this.creep.pos.y});
    this.creep.moveTo(positions[objective][0], positions[objective][1], {avoid: avoidArea});
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
        // Do something other if targets[0].owner == 'Source Keeper';
        var rangedTargets = this.creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
            filter: function(t) {
                if(t.name == 'Source Keeper') {
                    return false;
                }
            }
        });
        if(rangedTargets.length > 0) {
            this.creep.rangedAttack(rangedTargets[0]);
        }

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
