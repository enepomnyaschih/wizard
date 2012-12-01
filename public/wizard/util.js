wizard.Util = {};

wizard.Util.createProperty = function(type, name) {
	var capName = JW.capitalize(name);
	var proto = {};
	proto["set" + capName] = function(value) {
		if (type) {
			value = type(value);
		}
		var oldValue = this[name];
		if (oldValue === value) {
			return;
		}
		this[name] = value;
		var func = this["_update" + capName];
		if (func) {
			func.call(this);
		}
		this.trigger(name.toLowerCase() + "change", oldValue, value);
	};
	return proto;
};

wizard.Util.addProperty = function(cls, type, name) {
	JW.apply(cls.prototype, wizard.Util.createProperty(type, name));
};

wizard.Util.binarySearch = function(items, item) {
	var n = 1;
	while (n < items.length) {
		n <<= 1;
	}
	var p = 0;
	while (n) {
		k = p + (n >> 1);
		if (item >= items[k]) {
			p = k + 1;
		}
		n >>= 1;
	}
	return p;
};

wizard.Util.replaceCollectionItems = function(collection, items) {
	collection.base.splice(0, collection.base.length);
	JW.Array.pushAll(collection.base, items);
};
