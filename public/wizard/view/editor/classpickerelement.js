wizard.view.editor.ClassPickerElement = wizard.view.editor.MenuElement.extend({
	/*
	Abstract
	wizard.model.Class _getValue();
	void _applyValue(wizard.model.Class value);
	*/
	
	// override
	_createForm: function() {
		var value = this._getValue();
		return new wizard.view.editor.Form({
			editor  : this.editor,
			title   : value ? value.name : "(select)",
			tooltip : value ? value.fullName : null
		});
	},
	
	// override
	_isValid: function() {
		return JW.isSet(this._getValue());
	},
	
	// override
	_createOptions: function() {
		var classes = this.editor.model.project.allClasses.values.base;
		classes = JW.filter(classes, this._filterValue, this);
		return JW.map(classes, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		var value = this._getValue();
		return value ? value.fullName : null;
	},
	
	_createDropdownOption: function(clazz) {
		var self = this;
		return new wizard.view.editor.MenuOption({
			label   : clazz.fullName,
			value   : clazz.fullName,
			applier : function() {
				self._applyValue(clazz);
			}
		});
	},
	
	_getValue: function() {
		return null;
	},
	
	_filterValue: function(clazz) {
		return true;
	},
	
	_applyValue: function(clazz) {
	}
});
