function Cache() {
	this._cacheMap = {};
	this.randomId = parseInt(Math.random()*10000);
};

Cache.prototype.get = function(key) {
	return this._cacheMap[key + '_' + this.randomId];
};
Cache.prototype.set = function(key, value) {
	this._cacheMap[key + '_' + this.randomId] = value;
	return this._cacheMap[key + '_' + this.randomId];
}
Cache.prototype.remember = function(key, callback, args) {
	args = args || [];
	if(!this.get(key)) {
		var result = callback.apply(null, args);
		this.set(key, result)
	}

	return this._cacheMap[key + '_' + this.randomId];
};

module.exports = Cache;
