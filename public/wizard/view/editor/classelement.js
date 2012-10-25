wizard.view.editor.ClassElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	wizard.model.Class clazz
	*/
	
	render: function() {
		this._super();
		this._updateForm();
	},
	
	// override
	_createOptions: function() {
		return JW.map(JW.getValuesArray(wizard.model.clazz.Kind.items), this._createDropdownOption, this);
	},
	
	_createDropdownOption: function(kind) {
		return new wizard.view.editor.ClassElementOption({
			model    : this.model,
			clazz    : this.clazz,
			kind     : kind,
			selected : kind === this.clazz.classKind
		});
	},
	
	_updateForm: function() {
		this.
	}
});
