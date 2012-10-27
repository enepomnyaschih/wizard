wizard.model.clazz.Kind.items["interface"] = new wizard.model.clazz.Kind({
	id                 : "interface",
	name               : "interface",
	extendable         : true,
	hasDynamicElements : false,
	hasStaticElements  : false,
	hasAbstractMethods : true
});

// implements Extendable, WithMethods
wizard.model.clazz.Interface = wizard.model.clazz.Content.extend({
	/*
	Fields
	genericClasses : JW.Collection<wizard.model.clazz.GenericClass>
	implementz     : JW.Collection<wizard.model.clazz.Interface>
	methods        : JW.Collection<wizard.model.clazz.Method>
	*/
	
	kind : wizard.model.clazz.Kind.items["interface"],
	
	init: function(config) {
		this._super(config);
		this.genericClasses = new JW.Collection();
		this.implementz = new JW.Collection();
		this.methods = new JW.Collection();
	},
	
	createForm: function(model) {
		return new wizard.view.editor.InterfaceForm({
			model        : model,
			classContent : this
		});
	}
});
