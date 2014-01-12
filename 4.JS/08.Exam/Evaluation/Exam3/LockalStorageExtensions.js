(function () {
	if (!Storage.prototype.save){
		Storage.prototype.save = function(key, obj) {
			this.setItem(key, JSON.stringify(obj));
		}
	}
	if (!Storage.prototype.load){
		Storage.prototype.load = function(key) {
			return JSON.parse(this.getItem(key));
		}
	}
}());