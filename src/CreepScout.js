var Cache = require('Cache');

var CreepScout = function(creep, roomHandler) {
    this.creep = creep;
    this.roomHandler = roomHandler;
};

CreepScout.prototype.init = function() {
    this.remember('role', 'CreepScout');
    if(this.remember('role')) {
        this.remember('roomName', this.creep.room.name);
    }
    console.log('Scout inited');
    this.act();
};

CreepScout.prototype.act = function() {
    if(this.roomHandler.isOurRoom(this.creep.room.name)) {
        console.log('Find room.');
        // Find new exit
        var exit = this.findExit()
        this.creep.moveTo(exit.x, exit.y);
    } else {
        console.log('Conquer.');
        // Find controller, destroy & conquer
        this.conquer();
    }
};

CreepScout.prototype.findExit = function() {
    var exitPos = this.remember('exit');
    if(!exitPos) {
        var exit = this.creep.room.find(FIND_EXIT);
        if(exit.length != 0) {
            exitPos = {
                x: exit[0].x,
                y: exit[0].y
            }
            this.remember('exit', exitPos);
        }
    }

    return exitPos;
}

CreepScout.prototype.findController = function() {
    return Cache.remember(
        'room-controller',
        function() {
            return this.creep.room.find(
                FIND_STRUCTURES,
                {
                    filter: function(structure) {
                        if(structure.structureType == STRUCTURE_CONTROLLER) {
                            return true;
                        }

                        return false;
                    }
                }
            );
        }.bind(this)
    );
};

CreepScout.prototype.conquer = function() {
    var controller = this.findController();
    this.creep.moveTo(controller);
    this.creep.claimController(controller);
}

module.exports = CreepScout;
