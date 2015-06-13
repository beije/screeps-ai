function Cache() {
	this._cacheMap = {};
};

Cache.prototype.get = function(key) {
	return this._cacheMap[key];
};
Cache.prototype.set = function(key, value) {
	this._cacheMap[key] = value;
	return this._cacheMap[key];
}
Cache.prototype.remember = function(key, callback, args) {
	args = args || [];
	if(!this._cacheMap[key]) {
		var result = callback.apply(null, args);
		this.set(key, result)
	}

	return this._cacheMap[key];
};

module.exports = new Cache();
