wizard.lib.CollectionSyncher = JW.Syncher.extend({
	/*
	Required
	JW.Collection<Object> target;
	Subclass<Object> provider;
	
	Optional
	String dataField;
	Map extraCfg;
	
	Deprecated
	inserter
	remover
	clearer
	*/
	
	_creator: function(data) {
		if (this.creator) {
			return this.creator.call(this.scope || this, data, this.extraCfg);
		}
		var config;
		if (this.dataField) {
			config = {};
			config[this.dataField] = data;
		} else {
			config = data;
		}
		JW.apply(config, this.extraCfg);
		return new this.provider(config);
	},
	
	_inserter: function(item, index) {
		this.target.addItemAt(item, index);
	},
	
	_remover: function(index) {
		this.target.removeItemAt(index);
	},
	
	_destroyer: function(item) {
		if (this.destroyer) {
			return this.destroyer.call(this.scope || this, item);
		}
		item.destroy();
	},
	
	_clearer: function() {
		this.target.clear();
	}
});
