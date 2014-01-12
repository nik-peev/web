(function () {
    if (!Element.prototype.addEventListener) {
        Element.prototype.addEventListener = function (event, func) {
            this.attachEvent("on" + event, func);
        }
    }
}());

(function () {
    if (!Storage.prototype.setObject) {
        Storage.prototype.setObject = function (key, obj) {
            this.setItem(key, JSON.stringify(obj));
        }
    }

    if (!Storage.prototype.getObject) {
        Storage.prototype.getObject = function (key) {
            return JSON.parse(this.getItem(key));
        }
    }
}());

(function () {
    if (!String.prototype.killWhiteSpace) {
        String.prototype.killWhiteSpace = function () {
            return this.replace(/\s/g, '');
        }
    }
}());
