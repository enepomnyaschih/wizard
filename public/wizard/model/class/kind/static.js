wizard.model.clazz.Kind.items["static"] = new wizard.model.clazz.Kind({
	id                 : "static",
	name               : "static class",
	extendable         : false,
	hasDynamicElements : false,
	hasStaticElements  : true,
	hasAbstractMethods : false
});

// implements WithStatic
wizard.model.clazz.Static = wizard.model.Class.extend({
	/*
	Fields
	staticFields  : JW.Collection<wizard.model.clazz.StaticField>
	staticMethods : JW.Collection<wizard.model.clazz.StaticMethod>
	*/
	
	classKind : wizard.model.clazz.Kind.items["static"],
	
	init: function(config) {
		this._super(config);
		this.staticFields = new JW.Collection();
		this.staticMethods = new JW.Collection();
	}
});
