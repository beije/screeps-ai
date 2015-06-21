var Cache = require('Cache');
var CreepScout = function(creep, roomHandler) {
    this.cache = new Cache();
    this.creep = creep;
    this.roomHandler = roomHandler;
};

CreepScout.prototype.init = function() {
    this.remember('role', 'CreepScout');

    if(this.remember('role')) {
        this.remember('roomName', this.creep.room.name);
    }
    if(this.moveToNewRoom() == true) {
		return;
	}
    this.act();
};

CreepScout.prototype.act = function() {
    this.conquer();
};

CreepScout.prototype.findController = function() {
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
};

CreepScout.prototype.conquer = function() {
    var avoidArea = this.getAvoidedArea();
    var controller = this.findController();
    if(controller.length != 0) {
        controller = controller[0];
    }

    this.creep.moveTo(controller, {avoid: avoidArea});
    this.creep.claimController(controller);
}

module.exports = CreepScout;
