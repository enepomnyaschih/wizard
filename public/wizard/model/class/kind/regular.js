wizard.model.clazz.Kind["regular"] = new wizard.model.clazz.Kind({
	id                 : "regular",
	name               : "class",
	extendable         : true,
	hasDynamicElements : true,
	hasStaticElements  : true,
	hasAbstractMethods : false
});

// implements Extendable, WithFields, WithMethods, WithStatic
wizard.model.clazz.Regular = wizard.model.Class.extend({
	/*
	Fields
	genericTypes  : JW.Collection<wizard.model.clazz.GenericType>
	extendz       : wizard.model.Class
	implementz    : JW.Collection<wizard.model.clazz.Interface>
	fields        : JW.Collection<wizard.model.clazz.Field>
	constructors  : JW.Collection<wizard.model.clazz.Constructor>
	methods       : JW.Collection<wizard.model.clazz.Method>
	staticFields  : JW.Collection<wizard.model.clazz.StaticField>
	staticMethods : JW.Collection<wizard.model.clazz.StaticMethod>
	*/
	
	classKind : wizard.model.clazz.Kind["regular"],
	
	init: function(config) {
		this._super(config);
		this.genericTypes = new JW.Collection();
		this.implementz = new JW.Collection();
		this.fields = new JW.Collection();
		this.constructors = new JW.Collection();
		this.methods = new JW.Collection();
		this.staticFields = new JW.Collection();
		this.staticMethods = new JW.Collection();
	}
});
