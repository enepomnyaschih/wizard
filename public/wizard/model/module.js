wizard.model.Module = JW.ObservableConfig.extend({
	/*
	Fields
	wizard.model.module.Kind moduleKind;
	
	Abstract methods
	wizard.view.Module createModuleView(wizard.Model model);
	*/
});

wizard.Util.addProperty(wizard.model.Module, Boolean, "selected", false);

wizard.model.module = {};

wizard.model.module.Kind = JW.Config.extend({
	/*
	String id;
	*/
});
