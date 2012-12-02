wizard.Model = JW.ObservableConfig.extend({
	/*
	Events
	moduleselect(JW.Event event, wizard.model.Module module)
	
	Fields
	wizard.js.Lang langProject;
	wizard.model.Project project;
	wizard.model.Class defaultExtends;
	*/
	
	selectedModule : null,
	
	init: function(config) {
		this._super(config);
		this.langProject = new wizard.js.Lang({
			model : this
		});
		this.defaultExtends = this.langProject.classes.get("lang.Object");
		this.project = new wizard.model.Project({
			model    : this,
			id       : "myproject",
			rootName : "com.myproject"
		});
		this.project.dependencies.addItem(this.langProject);
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
