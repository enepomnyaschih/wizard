wizard.model.clazz.Kind.items["abstract"] = new wizard.model.clazz.Kind({
	id                 : "abstract",
	name               : "abstract class",
	extendable         : true,
	hasDynamicElements : true,
	hasStaticElements  : true,
	hasAbstractMethods : true
});

// implements Extendable, WithFields, WithMethods, WithStatic
wizard.model.clazz.Abstract = wizard.model.clazz.Content.extend({
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
	
	kind : wizard.model.clazz.Kind.items["abstract"],
	
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
		return new wizard.view.editor.AbstractClassForm({
			model        : model,
			classContent : this
		});
	}
});
