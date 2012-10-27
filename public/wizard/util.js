wizard.Util = {};

wizard.Util.createProperty = function(type, name, initialValue) {
	var capName = JW.capitalize(name);
	var proto = {};
	proto[name] = initialValue;
	proto["set" + capName] = function(value) {
		if (type) {
			value = type(value);
		}
		if (this[name] === value) {
			return;
		}
		this[name] = value;
		var func = this["_update" + capName];
		if (func) {
			func.call(this);
		}
		this.trigger(name.toLowerCase() + "change", value);
	};
	return proto;
};

wizard.Util.addProperty = function(cls, type, name, initialValue) {
	JW.apply(cls.prototype, wizard.Util.createProperty(type, name, initialValue));
};
