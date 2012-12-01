wizard.view.editor.PackPickerElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	void applier(wizard.model.Pack value);
	Object scope;
	
	Optional
	wizard.model.Pack value;
	Boolean filterer(wizard.model.Pack value);
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
		var packs = this.editor.model.project.packs.values;
		if (this.filterer) {
			packs = packs.filter(this.filterer, this.scope || this);
		}
		return JW.map(packs, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		return this.value ? this.value.fullName : null;
	},
	
	_createDropdownOption: function(pack) {
		var self = this;
		return new wizard.view.editor.MenuOption({
			label   : pack.fullName,
			value   : pack.fullName,
			applier : function() {
				self.applier.call(self.scope || self, pack);
			}
		});
	}
});
