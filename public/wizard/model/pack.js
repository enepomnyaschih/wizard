wizard.model.module.Kind["pack"] = new wizard.model.module.Kind({
	id : "pack"
});

wizard.model.Pack = wizard.model.Module.extend({
	/*
	Fields
	name    : String
	parent  : wizard.model.Pack
	packs   : JW.Collection<wizard.model.Pack>
	classes : JW.Collection<wizard.model.Class>
	*/
	
	moduleKind : wizard.model.module.Kind["pack"],
	
	init: function(config) {
		this._super(config);
		this.packs = new JW.Collection();
		this.classes = new JW.Collection();
	},
	
	getFullName: function() {
		return !this.parent ? "" :
		       !this.parent.parent ? this.name :
		       (this.parent.getFullName() + "." + this.name);
	},
	
	createModuleView: function(model) {
		return new wizard.view.Pack({
			model  : model,
			module : this
		});
	},
	
	isRoot: function() {
		return !this.parent;
	},
	
	isEmpty: function() {
		return this.packs.isEmpty() && this.classes.isEmpty();
	}
});
