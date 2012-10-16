wizard.Util = {};

wizard.Util.createProperty = function(type, name, initialValue) {
	var capName = JW.capitalize(name);
	var proto = {};
	proto[name] = initialValue;
	proto["set" + capName] = function(value) {
		value = type(value);
		if (this[name] === value) {
			return;
		}
		this[name] = value;
		this.trigger(name + "change", value);
		var func = this["_update" + capName];
		if (func) {
			func.call(this);
		}
	};
	return proto;
};

wizard.Util.addProperty = function(cls, type, name, initialValue) {
	JW.apply(cls.prototype, wizard.Util.createProperty(type, name, initialValue));
};
