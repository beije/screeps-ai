var CONST = {
    RAMPART_MAX: 200000,
    RAMPART_FIX: 50000,
};
var Cache = require('Cache');

function Constructions(room) {
    this.room = room;
    this.cache = new Cache();
    this.sites = this.room.find(FIND_CONSTRUCTION_SITES);
    this.structures = this.room.find(FIND_MY_STRUCTURES);
    this.damagedStructures = this.getDamagedStructures();
    this.upgradeableStructures = this.getUpgradeableStructures();
    this.controller = this.room.controller;
};


Constructions.prototype.getDamagedStructures = function() {
    return this.cache.remember(
        'damaged-structures',
        function() {
            return this.room.find(
                FIND_MY_STRUCTURES,
                {
                    filter: function(s) {
                        var targets = s.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
						if(targets.length != 0) {
						    return false;
						}
                        if((s.hits < s.hitsMax/2 && s.structureType != STRUCTURE_RAMPART) || (s.structureType == STRUCTURE_RAMPART && s.hits < CONST.RAMPART_FIX)) {
                            return true;
                        }
                    }
                }
            );
        }.bind(this)
    );
};

Constructions.prototype.getUpgradeableStructures = function() {
    return this.cache.remember(
        'upgradeable-structures',
        function() {
            return this.room.find(
                FIND_MY_STRUCTURES,
                {
                    filter: function(s) {
                        var targets = s.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                        if(targets.length != 0) {
                            return false;
                        }

                        if((s.hits < s.hitsMax && s.structureType != STRUCTURE_RAMPART) || (s.structureType == STRUCTURE_RAMPART && s.hits < CONST.RAMPART_MAX)) {

                            return true;
                        }
                    }
                }
            );
        }.bind(this)
    );
};

Constructions.prototype.getConstructionSiteById = function(id) {
    return this.cache.remember(
        'object-id-' + id,
        function() {
            return Game.getObjectById(id);
        }.bind(this)
    );
};

Constructions.prototype.getController = function() {
    return this.controller;
};

Constructions.prototype.getClosestConstructionSite = function(creep) {
    var site = false;
    if(this.sites.length != 0) {
        site = creep.pos.findClosest(this.sites);
    }

    return site;
};


Constructions.prototype.constructStructure = function(creep) {
    var avoidArea = creep.getAvoidedArea();

    if(this.damagedStructures.length != 0) {
        site = creep.creep.pos.findClosest(this.damagedStructures);
        creep.creep.moveTo(site, {avoid: avoidArea});
        creep.creep.repair(site);

        return site;
    }

    if(this.sites.length != 0) {
        site = creep.creep.pos.findClosest(this.sites);
        creep.creep.moveTo(site, {avoid: avoidArea});
        creep.creep.build(site);

        return site;
    }

    if(this.upgradeableStructures.length != 0) {
        site = creep.creep.pos.findClosest(this.upgradeableStructures);
        creep.creep.moveTo(site, {avoid: avoidArea});
        creep.creep.repair(site);

        return site;
    }

    return false;
};


module.exports = Constructions;
