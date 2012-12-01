wizard.view.navigation.pack.Packs = JW.UI.Component.extend({
	/*
	Required options
	wizard.Model model
	wizard.model.Pack pack
	
	Fields
	JW.UI.Syncher syncher
	*/
	
	render: function() {
		this._super();
		
		this.syncher = new JW.UI.Syncher({
			collection : this.pack.packs.values,
			provider   : wizard.view.navigation.Pack,
			scope      : this,
			dataField  : "module",
			
			extraCfg : {
				model : this.model
			}
		});
	},
	
	destroyComponent: function() {
		this.syncher.destroy();
		this._super();
	},
	
	getByPack: function(pack) {
		return JW.searchBy(this.plainChildren, "module", pack);
	}
});
