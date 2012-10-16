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
	},
	
	expandBranch: function(pack) {
		if (!pack) {
			return;
		}
		if (!pack.parent) {
			this.rootPack.setExpanded(true);
			return this.rootPack;
		}
		var parentPackView = this.expandBranch(pack.parent);
		var packView = parentPackView.body.packs.getByPack(pack);
		packView.setExpanded(true);
		return packView;
	}
});

wizard.view.navigation = {};
