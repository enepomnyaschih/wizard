wizard.model.clazz.Kind["interface"] = new wizard.model.clazz.Kind({
	id                 : "interface",
	name               : "interface",
	extendable         : true,
	hasDynamicElements : false,
	hasStaticElements  : false,
	hasAbstractMethods : true
});

// implements Extendable, WithMethods
wizard.model.clazz.Interface = wizard.model.Class.extend({
	/*
	Fields
	genericTypes  : JW.Collection<wizard.model.clazz.GenericType>
	implementz    : JW.Collection<wizard.model.clazz.Interface>
	methods       : JW.Collection<wizard.model.clazz.Method>
	*/
	
	classKind : wizard.model.clazz.Kind["interface"],
	
	init: function(config) {
		this._super(config);
		this.genericTypes = new JW.Collection();
		this.implementz = new JW.Collection();
		this.methods = new JW.Collection();
	}
});
