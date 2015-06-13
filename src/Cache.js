var CacheMap = {};

function Cache() {};

Cache.prototype.get = function(key) {
	return CacheMap[key];
};
Cache.prototype.set = function(key, value) {
	CacheMap[key] = value;
	return CacheMap[key];
}
Cache.prototype.remember = function(key, callback, args) {
	args = args || [];
	if(!CacheMap[key]) {
		var result = callback.apply(null, args);
		this.set(key, result)
	}
	
	return CacheMap[key];
};

module.exports = new Cache();