wizard.model.module.Kind["pack"] = new wizard.model.module.Kind({
	id : "pack"
});

wizard.model.Pack = wizard.model.Module.extend({
	/*
	Fields
	name    : String
	parent  : wizard.model.Pack
	packs   : wizard.model.pack.Packs
	classes : JW.Collection<wizard.model.Class>
	*/
	
	moduleKind : wizard.model.module.Kind["pack"],
	
	init: function(config) {
		this._super(config);
		this.packs = new wizard.model.pack.Packs();
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
	},
	
	newPack: function() {
		var pack = new wizard.model.Pack({
			name   : this.packs.generateName(),
			parent : this
		});
		this.packs.addItem(pack);
		return pack;
	}
});

wizard.model.pack = {};

wizard.model.pack.Packs = JW.Collection.extend({
	_defaultName : "newpackage",
	
	getByName: function(name) {
		return this.searchBy("name", name);
	},
	
	generateName: function() {
		if (!this.getByName(this._defaultName)) {
			return this._defaultName;
		}
		var index = 1;
		while (true) {
			var name = this._defaultName + index;
			if (!this.getByName(name)) {
				return name;
			}
		}
	}
});
