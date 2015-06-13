function Constructions(room) {
    this.room = room;
    this.sites = this.room.find(FIND_CONSTRUCTION_SITES);
    this.structures = this.room.find(FIND_MY_STRUCTURES);
    this.controller = this.room.controller;
};

Constructions.prototype.getConstructionSiteById = function(id) {
    return Game.getObjectById(id);
};

Constructions.prototype.getController = function() {
    return this.controller;
}
Constructions.prototype.getClosestConstructionSite = function(creep) {
    var site = false;
    if(this.sites.length != 0) {
        site = creep.pos.findClosest(this.sites);
    }

    return site;
};

module.exports = Constructions;
