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
    this.act();
};

CreepSoldier.prototype.act = function() {
    var targets = this.creep.room.find(FIND_HOSTILE_CREEPS);
    if(this.remember('current-objective') === undefined) {
        this.remember('current-objective', 0);
    }
    if(this.remember('last-position') === undefined) {
        this.remember('last-position', {x:0, y:0});
    }
    if(this.remember('move-attempts') === undefined) {
        this.remember('move-attempts', 0);
    }

    if(targets.length) {
        var rangedTargets = this.creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
        if(rangedTargets.length > 0) {
            this.creep.rangedAttack(rangedTargets[0]);
        }

        this.creep.moveTo(targets[0]);
        this.creep.attack(targets[0]);
    } else {
        //var exits = Room.find(FIND_EXIT);
        var lastPosition = this.remember('last-position');
        var objective = this.remember('current-objective');
        var moveAttempts = this.remember('move-attempts');
        if(lastPosition.x == this.creep.pos.x && lastPosition.y == this.creep.pos.y) {
            moveAttempts++;
            this.remember('move-attempts', moveAttempts);
        }
        if(moveAttempts == 5) {
            objective++;
            if(objective >= positions.length) {
                objective = 0;
            }

            this.remember('move-attempts', 0);
            this.remember('last-position', {x:0, y:0});
            this.remember('current-objective', objective);

        } else {
            this.remember('last-position', {x:this.creep.pos.x, y:this.creep.pos.y});
        }

        this.creep.moveTo(positions[objective][0], positions[objective][1]);
    }
}

module.exports = CreepSoldier;
