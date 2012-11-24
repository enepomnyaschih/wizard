wizard.model.Project = JW.ObservableConfig.extend({
	/*
	Fields
	rootPack : wizard.model.Pack
	*/
	
	init: function(config) {
		this._super(config);
		this.rootPack = new wizard.model.Pack();
	},
	
	getAllPacks: function() {
		var result = [];
		this.rootPack.everyPack(function(pack) {
			result.push(pack);
			return true;
		}, this);
		return result;
	},
	
	getAllClasses: function() {
		var result = [];
		this.rootPack.everyClass(function(clazz) {
			result.push(clazz);
			return true;
		}, this);
		return result;
	}
});
