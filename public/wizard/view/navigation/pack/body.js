wizard.view.navigation.pack.Body = JW.UI.Component.extend({
	/*
	Required options
	wizard.Model model
	wizard.model.Pack pack
	
	Fields
	wizard.view.navigation.pack.Packs packs
	wizard.view.navigation.pack.Classes classes
	*/
	
	render: function() {
		this._super();
		
		this.packs = new wizard.view.navigation.pack.Packs({
			model          : this.model,
			pack           : this.pack,
			renderParent   : this,
			renderPosition : "packs"
		});
		
		this.classes = new wizard.view.navigation.pack.Classes({
			model          : this.model,
			pack           : this.pack,
			renderParent   : this,
			renderPosition : "classes"
		});
	}
});
