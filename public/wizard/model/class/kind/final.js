wizard.model.clazz.Kind.items["final"] = new wizard.model.clazz.Kind({
	id                 : "final",
	name               : "final class",
	extendable         : false,
	hasDynamicElements : true,
	hasStaticElements  : true,
	hasAbstractMethods : false
});

// implements WithFields, WithMethods, WithStatic
wizard.model.clazz.Final = wizard.model.clazz.Content.extend({
	/*
	Fields
	genericClasses : JW.Collection<wizard.model.clazz.GenericClass>
	extendz        : wizard.model.Class
	implementz     : JW.Collection<wizard.model.clazz.Interface>
	fields         : JW.Collection<wizard.model.clazz.Field>
	constructors   : JW.Collection<wizard.model.clazz.Constructor>
	methods        : JW.Collection<wizard.model.clazz.Method>
	staticFields   : JW.Collection<wizard.model.clazz.StaticField>
	staticMethods  : JW.Collection<wizard.model.clazz.StaticMethod>
	*/
	
	kind : wizard.model.clazz.Kind.items["final"],
	
	init: function(config) {
		this._super(config);
		this.genericClasses = new JW.Collection();
		this.implementz = new JW.Collection();
		this.fields = new JW.Collection();
		this.constructors = new JW.Collection();
		this.methods = new JW.Collection();
		this.staticFields = new JW.Collection();
		this.staticMethods = new JW.Collection();
	},
	
	createForm: function(model) {
		return new wizard.view.editor.FinalClassForm({
			model        : model,
			classContent : this
		});
	}
});
