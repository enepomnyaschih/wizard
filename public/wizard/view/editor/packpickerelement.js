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
			title  : this.value ? this.value.getLabel() : "(select)"
		});
	},
	
	// override
	_isValid: function() {
		return JW.isSet(this.value);
	},
	
	// override
	_createOptions: function() {
		var packs = this.editor.model.project.getAllPacks();
		if (this.filterer) {
			packs = packs.filter(this.filterer, this.scope || this);
		}
		return JW.map(packs, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		return this.value ? this.value.getFullName() : null;
	},
	
	_createDropdownOption: function(pack) {
		var self = this;
		return new wizard.view.editor.MenuOption({
			label   : pack.getLabel(),
			value   : pack.getFullName(),
			applier : function() {
				self.applier.call(self.scope || self, pack);
			}
		});
	}
});
