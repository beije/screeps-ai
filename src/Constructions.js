function Constructions(room) {
    this.room = room;
    this.sites = this.room.find(FIND_CONSTRUCTION_SITES);
    this.structures = this.room.find(FIND_MY_STRUCTURES);
    this.damagedStructures = this.getDamagedStructures();
    this.upgradeableStructures = this.getUpgradeableStructures();
    this.controller = this.room.controller;
};


Constructions.prototype.getDamagedStructures = function() {
    return this.room.find(
        FIND_MY_STRUCTURES,
        {
            filter: function(s) {
                if(s.hits < s.hitsMax/2) {
                    return true;
                }
            }
        }
    );
};

Constructions.prototype.getUpgradeableStructures = function() {
    return this.room.find(
        FIND_MY_STRUCTURES,
        {
            filter: function(s) {
                if(s.hits < s.hitsMax) {
                    return true;
                }
            }
        }
    );
};

Constructions.prototype.getConstructionSiteById = function(id) {
    return Game.getObjectById(id);
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
    if(this.upgradeableStructures.length != 0) {
        site = creep.pos.findClosest(this.upgradeableStructures);
        creep.moveTo(site);
        creep.repair(site);
        
        return site;
    }
    
    if(this.damagedStructures.length != 0) {
        site = creep.pos.findClosest(this.damagedStructures);
        creep.moveTo(site);
        creep.repair(site);
        
        return site;
    }

    if(this.sites.length != 0) {
        site = creep.pos.findClosest(this.sites);
        creep.moveTo(site);
        creep.build(site);
        
        return site;
    }

    return false;
};


module.exports = Constructions;
