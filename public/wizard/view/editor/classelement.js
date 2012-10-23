wizard.view.editor.ClassElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	wizard.model.Class clazz
	*/
	
	// override
	_createOptions: function() {
		var options = JW.map(JW.getValuesArray(wizard.model.clazz.Kind.items), this._createDropdownOption, this);
		this._optionMap = JW.indexBy(options, "kind.id");
		return options;
	},
	
	_createDropdownOption: function(kind) {
		return new wizard.view.editor.ClassElementOption({
			model : this.model,
			clazz : this.clazz,
			kind  : kind
		});
	},
	
	// override
	_getSelectedOption: function() {
		return this._optionMap[this.clazz.classKind.id];
	}
});
