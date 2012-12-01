wizard.view.editor.GenericDefinitionElement = wizard.view.editor.FormElement.extend({
	/*
	Required
	wizard.model.clazz.Generic generic;
	*/
	
	// override
	_createForm: function() {
		return new wizard.view.editor.GenericDefinitionForm({
			editor  : this.editor,
			generic : this.generic
		});
	}
});
