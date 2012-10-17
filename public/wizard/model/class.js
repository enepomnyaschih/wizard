wizard.model.module.Kind["class"] = new wizard.model.module.Kind({
	id : "class"
});

wizard.model.Class = wizard.model.Module.extend({
	/*
	Fields
	classKind : wizard.model.clazz.Kind
	*/
	
	moduleKind : wizard.model.module.Kind["class"],
	
	init: function(config) {
		this._super(config);
	},
	
	getFullName: function() {
		return !this.parent.parent ? this.name :
		       (this.parent.getFullName() + "." + this.name);
	},
	
	createModuleView: function(model) {
		return new wizard.view.Class({
			model  : model,
			module : this
		});
	}
});

wizard.model.clazz = {};

wizard.model.clazz.Kind = JW.Config.extend({
	/*
	Fields
	id                  : String
	extendable          : Boolean
	hasDynamicElements  : Boolean
	hasStaticElements   : Boolean
	hasAbstractMethods  : Boolean
	
	Autowired fields
	extendz             : Boolean
	instantiable        : Boolean
	hasGenericTypes     : Boolean
	hasConstructors     : Boolean
	hasImplementations  : Boolean
	hasProtectedMethods : Boolean
	hasFinalMethods     : Boolean
	
	Anonymous classes are final.
	*/
	
	init: function(config) {
		this._super(config);
		this.extendz             = this.hasDynamicElements || this.hasAbstractMethods;
		this.instantiable        = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasGenericTypes     = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasConstructors     = this.hasDynamicElements;
		this.hasImplementations  = this.hasDynamicElements && !this.hasAbstractMethods;
		this.hasProtectedMethods = this.hasDynamicElements;
		this.hasFinalMethods     = this.hasDynamicElements && this.extendable; // if not extendable, then all methods are final, in fact
	}
});
