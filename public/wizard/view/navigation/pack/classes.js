wizard.view.navigation.pack.Classes = JW.UI.Component.extend({
	/*
	Required options
	wizard.Model model
	wizard.model.Pack pack
	
	Fields
	JW.UI.Syncher syncher
	*/
	
	_renderBody: function() {
		this._super();
		
		this.syncher = new JW.Syncher({
			collection : this.pack.classes,
			provider   : wizard.view.navigation.Class,
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
	}
});
