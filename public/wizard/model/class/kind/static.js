wizard.model.clazz.Kind.items["static"] = new wizard.model.clazz.Kind({
	id                 : "static",
	name               : "static class",
	extendable         : false,
	hasDynamicElements : false,
	hasStaticElements  : true,
	hasAbstractMethods : false
});

// implements WithStatic
wizard.model.clazz.Static = wizard.model.clazz.Content.extend({
	/*
	Fields
	staticFields  : JW.Collection<wizard.model.clazz.StaticField>
	staticMethods : JW.Collection<wizard.model.clazz.StaticMethod>
	*/
	
	kind : wizard.model.clazz.Kind.items["static"],
	
	init: function(config) {
		this._super(config);
		this.staticFields = new JW.Collection();
		this.staticMethods = new JW.Collection();
	},
	
	createForm: function(model) {
		return new wizard.view.editor.StaticClassForm({
			model        : model,
			classContent : this
		});
	}
});
