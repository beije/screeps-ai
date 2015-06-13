
var RoomHandler = {
    rooms: []
};
RoomHandler.add = function(name) {
    this.rooms.push(name);
}
RoomHandler.isOurRoom = function(name) {
    if(this.rooms.indexOf(name) == -1) {
        return false;
    }

    return true;
}
module.exports = RoomHandler;
