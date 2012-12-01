wizard.view.editor.ClassPickerElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	void applier(wizard.model.Class value);
	Object scope;
	
	Optional
	wizard.model.Pack value;
	Boolean filterer(wizard.model.Class value);
	*/
	
	// override
	_createForm: function() {
		return new wizard.view.editor.Form({
			editor : this.editor,
			title  : this.value ? this.value.fullName : "(select)"
		});
	},
	
	// override
	_isValid: function() {
		return JW.isSet(this.value);
	},
	
	// override
	_createOptions: function() {
		var classes = this.editor.model.project.allClasses.values.base;
		if (this.filterer) {
			classes = JW.filter(classes, this.filterer, this.scope || this);
		}
		return JW.map(classes, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		return this.value ? this.value.fullName : null;
	},
	
	_createDropdownOption: function(clazz) {
		var self = this;
		return new wizard.view.editor.MenuOption({
			label   : clazz.fullName,
			value   : clazz.fullName,
			applier : function() {
				self.applier.call(self.scope || self, clazz);
			}
		});
	}
});
