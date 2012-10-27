wizard.model.module.Kind["class"] = new wizard.model.module.Kind({
	id : "class"
});

wizard.model.Class = wizard.model.Module.extend({
	/*
	Optional
	wizard.model.clazz.Kind classKind;
	
	Fields
	JW.Collection<wizard.model.clazz.GenericClass> genericClasses;
	wizard.model.Class extendz;
	JW.Collection<wizard.model.clazz.Interface> implementz;
	JW.Collection<wizard.model.clazz.StaticField> staticFields;
	JW.Collection<wizard.model.clazz.Field> fields;
	JW.Collection<wizard.model.clazz.Constructor> constructors;
	JW.Collection<wizard.model.clazz.Method> methods;
	JW.Collection<wizard.model.clazz.StaticMethod> staticMethods;
	*/
	
	moduleKind : wizard.model.module.Kind["class"],
	
	getFullName: function() {
		return !this.parent.parent ? this.name :
		       (this.parent.getFullName() + "." + this.name);
	},
	
	createModuleView: function(model) {
		return new wizard.view.Class({
			model  : model,
			module : this
		});
	},
	
	_updateClassKind: function() {
		
	}
});

wizard.Util.addProperty(wizard.model.Class, null, "classKind", null);

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
	implementz          : Boolean
	instantiable        : Boolean
	hasGenericClasses   : Boolean
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
		this.hasGenericClasses   = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasConstructors     = this.hasDynamicElements;
		this.hasMethods          = this.hasDynamicElements || this.hasAbstractMethods;
		this.hasProtectedMethods = this.hasDynamicElements;
		this.hasFinalMethods     = this.hasDynamicElements && this.extendable; // if not extendable, then all methods are final, in fact
	}
});

wizard.model.clazz.Kind.items = {};
