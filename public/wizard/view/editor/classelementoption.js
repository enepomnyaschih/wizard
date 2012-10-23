wizard.view.editor.ClassElementOption = wizard.view.editor.MenuElementOption.extend({
	/*
	Required
	wizard.model.Class clazz;
	wizard.model.clazz.Kind kind;
	*/
	
	_getLabel: function() {
		return this.kind.name;
	},
	
	_createForm: function() {
		return new wizard.view.editor.ClassForm({
			model : this.model,
			clazz : this.clazz
		});
	}
});
