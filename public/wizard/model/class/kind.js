wizard.model.clazz.Kind = JW.Config.extend({
	/*
	Fields
	id                  : String
	visible             : Boolean
	extendable          : Boolean
	hasDynamicElements  : Boolean
	hasStaticElements   : Boolean
	hasAbstractMethods  : Boolean
	
	Autowired fields
	extendz             : Boolean
	implementz          : Boolean
	instantiable        : Boolean
	hasGenerics         : Boolean
	hasConstructors     : Boolean
	hasMethods          : Boolean
	hasProtectedMethods : Boolean
	hasFinalMethods     : Boolean
	
	Anonymous classes are final.
	*/
	
	init: function(config) {
		this._super(config);
		this.extendz             = this.hasDynamicElements;
		this.implementz          = this.hasDynamicElements || this.hasAbstractMethods;
		this.instantiable        = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasGenerics         = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasConstructors     = this.hasDynamicElements;
		this.hasMethods          = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasProtectedMethods = this.hasDynamicElements;
		this.hasFinalMethods     = this.hasDynamicElements && this.extendable; // if not extendable, then all methods are final, in fact
	}
});

wizard.model.clazz.Kind.items = {};
