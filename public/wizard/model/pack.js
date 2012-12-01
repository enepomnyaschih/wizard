wizard.model.module.Kind["pack"] = new wizard.model.module.Kind({
	id : "pack"
});

/*
interface wizard.model.IPackConfig {
	Optional
	String name; // auto-generated if missing
}
*/

wizard.model.Pack = wizard.model.Module.extend({
	/*
	Fields
	packs   : wizard.model.pack.Packs
	classes : wizard.model.pack.Classes
	*/
	
	moduleKind : wizard.model.module.Kind["pack"],
	
	init: function(config) {
		this._super(config);
		this.packs = new wizard.model.pack.Packs(this);
		this.classes = new wizard.model.pack.Classes(this);
		this.updateNames();
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
	
	addPack: function( // wizard.model.Pack
		config) { // wizard.model.IPackConfig
		return this.packs.createItem(config);
	},
	
	addClass: function( // wizard.model.Class
		config) { // wizard.model.IClassConfig
		return this.classes.createItem(config);
	},
	
	updateNames: function() {
		this._super();
		JW.eachByMethod(this.classes.values, "updateNames");
		JW.eachByMethod(this.packs.values, "updateNames");
	}
});

wizard.model.pack = {};

wizard.model.pack.Modules = wizard.lib.IndexedSortedMap.extend({
	/*
	Required options
	wizard.model.Pack pack;
	String _defaultName;
	
	Fields
	JW.Syncher syncher;
	*/
	
	keyField : "name",
	
	init: function(pack) {
		this._super();
		this.pack = pack;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addChild,
			destroyer  : this._removeChild,
			indexer    : "name",
			scope      : this
		});
	},
	
	generateName: function() {
		if (!this.get(this._defaultName)) {
			return this._defaultName;
		}
		var index = 1;
		while (true) {
			var name = this._defaultName + index;
			if (!this.get(name)) {
				return name;
			}
			++index;
		}
	},
	
	_addChild: function(child) {
		child.bind("namechange", this._onChildNameChange, this);
		return child;
	},
	
	_removeChild: function(child) {
		child.purge(this);
	},
	
	_onChildNameChange: function(event, oldName, newName) {
		this.move(oldName, newName);
	}
});

wizard.model.pack.Packs = wizard.model.pack.Modules.extend({
	_defaultName : "newpackage",
	
	createItem: function( // wizard.model.Pack
		config) // wizard.model.IPackConfig
	{
		config = config || {};
		var pack = new wizard.model.Pack({
			project : this.pack.project,
			parent  : this.pack,
			name    : config.name || this.generateName()
		});
		this.addItem(pack);
		return pack;
	},
	
	// override
	_addChild: function(child) {
		this._super(child);
		this.pack.project.packs.addItem(child);
		return child;
	},
	
	// override
	_removeChild: function(child) {
		this.pack.project.packs.removeItem(child);
		this._super(child);
	}
});

wizard.model.pack.Classes = wizard.model.pack.Modules.extend({
	_defaultName : "NewClass",
	
	createItem: function( // wizard.model.Class
		config) // wizard.model.IClassConfig
	{
		config = config || {};
		var clazz = new wizard.model.Class({
			project   : this.pack.project,
			parent    : this.pack,
			name      : config.name || this.generateName(),
			classKind : config.classKind,
			extendz   : config.extendz || this.pack.project.model.defaultExtends
		});
		this.addItem(clazz);
		return clazz;
	},
	
	// override
	_addChild: function(child) {
		this._super(child);
		this.pack.project.classes.addItem(child);
		return child;
	},
	
	// override
	_removeChild: function(child) {
		this.pack.project.classes.removeItem(child);
		this._super(child);
	}
});
