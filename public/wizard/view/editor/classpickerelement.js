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
			title  : this.value ? this.value.getFullName() : "(select)"
		});
	},
	
	// override
	_isValid: function() {
		return JW.isSet(this.value);
	},
	
	// override
	_createOptions: function() {
		var classes = this.editor.model.project.getAllClasses();
		if (this.filterer) {
			classes = classes.filter(this.filterer, this.scope || this);
		}
		return JW.map(classes, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		return this.value ? this.value.getFullName() : null;
	},
	
	_createDropdownOption: function(clazz) {
		var self = this;
		var fullName = clazz.getFullName();
		return new wizard.view.editor.MenuOption({
			label   : fullName,
			value   : fullName,
			applier : function() {
				self.applier.call(self.scope || self, clazz);
			}
		});
	}
});
