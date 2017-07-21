function Vpo(defaultKeyName) {
    this.add = {};
    this.delete = {};
    this.modify = {};
    this.defaultKeyName = defaultKeyName || "Id";
}
Vpo.prototype.getKeyName = function (keyName) {
    return keyName || this.defaultKeyName;
}
Vpo.prototype.new = function (obj, keyName) {
    keyName = this.getKeyName(keyName);
    var key = obj[keyName];
    var isDelete = this.delete[key]
    if (isDelete) {
        delete this.delete[key];
    } else {
        this.add[key] = obj;
    }
}
Vpo.prototype.remove = function (obj, keyName) {
    keyName = this.getKeyName(keyName);
    var key = obj[keyName];
    delete this.modify[key];
    var isAdd = this.add[key];
    if (isAdd) {
        delete this.add[key];
    } else {
        this.delete[key] = obj;
    }
}
Vpo.prototype.update = function (obj, keyName) {
    keyName = this.getKeyName(keyName);
    var key = obj[keyName];
    var isAdd = this.add[key];
    if (isAdd) {
        this.new[key] = obj;
    } else {
        this.modify[key] = obj;
    }
}
Vpo.prototype.getModel = function () {
    var model = {}
    model.add = this.toArray(this.add);
    model.delete = this.toArray(this.delete);
    model.modify = this.toArray(this.modify);
    return model;
}
Vpo.prototype.toArray = function (obj) {
    var array = [];
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr))
            array.push(obj[attr]);
    }
    return array;
}
Vpo.prototype.clear = function () {
    this.add = {};
    this.delete = {};
    this.modify = {};
}

