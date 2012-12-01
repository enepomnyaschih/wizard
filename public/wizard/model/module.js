wizard.model.Module = JW.ObservableConfig.extend({
	/*
	Events
	namechange(JW.Event event, String oldValue, String newValue);
	projectnamechange(JW.Event event, String oldValue, String newValue);
	fullnamechange(JW.Event event, String oldValue, String newValue);
	selectedchange(JW.Event event, Boolean value);
	
	Required
	wizard.model.Project project;
	wizard.model.module.Kind moduleKind;
	
	Optional
	wizard.model.Pack parent;
	String name;
	Boolean selected;
	
	Fields
	String projectName;
	String fullName;
	
	Abstract methods
	wizard.view.Module createModuleView(wizard.Model model);
	*/
	
	name        : "",
	projectName : "",
	fullName    : "",
	selected    : false,
	
	updateNames: function() {
		this.setProjectName(!this.parent ? "" :
			!this.parent.parent ? this.name :
			(this.parent.projectName + "." + this.name));
		this.setFullName(!this.parent ? this.project.rootName :
			(this.parent.fullName + "." + this.name));
	},
	
	_updateName: function() {
		this.updateNames();
	}
});

wizard.Util.addProperty(wizard.model.Module, String, "name");
wizard.Util.addProperty(wizard.model.Module, String, "projectName");
wizard.Util.addProperty(wizard.model.Module, String, "fullName");
wizard.Util.addProperty(wizard.model.Module, Boolean, "selected");

wizard.model.module = {};

wizard.model.module.Kind = JW.Config.extend({
	/*
	String id;
	*/
});
