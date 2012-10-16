wizard.view.Navigation = JW.UI.Component.extend({
	/*
	Required options
	model : wizard.Model
	
	Fields
	root  : wizard.view.navigation.Pack
	*/
	
	render: function() {
		this._super();
		
		this.rootPack = new wizard.view.navigation.Pack({
			model          : this.model,
			module         : this.model.project.rootPack,
			renderParent   : this,
			renderPosition : "root"
		});
	}
});

wizard.view.navigation = {};
