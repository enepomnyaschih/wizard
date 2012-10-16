wizard.Model = JW.ObservableConfig.extend({
	/*
	Events
	moduleselect(JW.Event event, wizard.model.Module module)
	
	Fields
	project        : wizard.model.Project
	selectedModule : wizard.model.Module
	*/
	
	selectedModule : null,
	
	init: function(config) {
		this._super(config);
		this.project = new wizard.model.Project();
	},
	
	selectModule: function(module) {
		module = module || null;
		if (this.selectedModule === module) {
			return;
		}
		if (this.selectedModule) {
			this.selectedModule.setSelected(false);
		}
		this.selectedModule = module;
		if (this.selectedModule) {
			this.selectedModule.setSelected(true);
		}
		this.trigger("moduleselect", module);
	}
});

wizard.model = {};

/*
Access levels
0 - private
1 - protected
2 - public
*/
