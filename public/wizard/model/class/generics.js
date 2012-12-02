wizard.model.clazz.Generics = JW.Collection.extend({ // <wizard.model.clazz.Generic>
	/*
	Fields
	wizard.model.Class clazz;
	Map<wizard.model.clazz.Generic> map;
	*/
	
	init: function(clazz) {
		this._super();
		this.clazz = clazz;
		this.map = {};
	},
	
	get: function(name) {
		return this.map[name];
	},
	
	addGeneric: function( // wizard.model.clazz.Generic
		config, // wizard.model.clazz.IGenericConfig
		index)
	{
		config = config || {};
		if (!JW.isSet(index)) {
			index = this.getLength();
		}
		var generic = new wizard.model.clazz.Generic({
			clazz   : this.clazz,
			name    : config.name || this.generateName(),
			extendz : config.name || this.clazz.project.model.defaultExtends
		});
		this.addItemAt(generic, index);
		return generic;
	},
	
	createItem: function(index) {
		this.addGeneric(null, index);
	},
	
	generateName: function() {
		var index = 0;
		while (true) {
			var name = "";
			var i = index;
			while (i !== -1) {
				name = String.fromCharCode(65 + (i % 26)) + name;
				i = Math.floor(i / 26) - 1;
			}
			if (!this.map.hasOwnProperty(name)) {
				return name;
			}
			++index;
		}
	},
	
	// override
	_createItem: function(generic) {
		this.map[generic.name] = generic;
		generic.bind("namechange", this._onGenericNameChange, this);
		return generic;
	},
	
	// override
	_destroyItem: function(generic) {
		generic.purge(this);
		delete this.map[generic.name];
	},
	
	_onGenericNameChange: function(event, oldValue, newValue) {
		this.map[newValue] = this.map[oldValue];
		delete this.map[oldValue];
	}
});
