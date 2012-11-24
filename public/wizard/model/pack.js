wizard.model.module.Kind["pack"] = new wizard.model.module.Kind({
	id : "pack"
});

wizard.model.Pack = wizard.model.Module.extend({
	/*
	Fields
	packs   : wizard.model.pack.Packs
	classes : wizard.model.pack.Classes
	*/
	
	moduleKind : wizard.model.module.Kind["pack"],
	
	init: function(config) {
		this._super(config);
		this.packs = new wizard.model.pack.Packs();
		this.classes = new wizard.model.pack.Classes();
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
	
	getLabel: function() {
		return this.isRoot() ? "(root)" : this.getFullName();
	},
	
	newPack: function() {
		var pack = new wizard.model.Pack({
			name   : this.packs.generateName(),
			parent : this
		});
		this.packs.addItem(pack);
		return pack;
	},
	
	newClass: function() {
		var clazz = new wizard.model.Class({
			name   : this.classes.generateName(),
			parent : this
		});
		this.classes.addItem(clazz);
		return clazz;
	},
	
	everyPack: function(callback, scope) {
		if (callback.call(scope || this, this) === false) {
			return false;
		}
		return this.packs.everyByMethod("everyPack", [ callback, scope ]);
	},
	
	everyClass: function(callback, scope) {
		return this.classes.every(callback, scope) &&
		       this.packs.everyByMethod("everyClass", [ callback, scope ]);
	}
});

wizard.model.pack = {};

wizard.model.pack.Modules = JW.Collection.extend({
	/*
	Required options
	String _defaultName;
	
	Abstract methods
	T getByName(String name);
	*/
	
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
            ++index;
		}
	}
});

wizard.model.pack.Packs = wizard.model.pack.Modules.extend({
	_defaultName : "newpackage",
	
	getByName: function(name) {
		return this.searchBy("name", name);
	}
});

wizard.model.pack.Classes = wizard.model.pack.Modules.extend({
	_defaultName : "NewClass",
	
	getByName: function(name) {
		return this.searchBy("instance.name", name);
	}
});
