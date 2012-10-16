wizard.model.Project = JW.ObservableConfig.extend({
	/*
	Fields
	rootPack : wizard.model.Pack
	*/
	
	init: function(config) {
		this._super(config);
		this.rootPack = new wizard.model.Pack();
	}
});
