wizard.view.editor.GenericExtendsElement = wizard.view.editor.ClassPickerElement.extend({
	/*
	Required
	wizard.model.clazz.Generic generic;
	*/
	
	// override
	render: function() {
		this._super();
		this.generic.bind("extendzchange", this._updateForm, this);
	},
	
	// override
	destroyComponent: function() {
		this.generic.purge(this);
		this._super();
	},
	
	// override
	_getValue: function() {
		return this.generic.extendz;
	},
	
	// override
	_filterValue: function(clazz) {
		return (clazz.classKind && clazz.classKind.extendable) ||
		       (clazz.fullName === "com.wizard.js.lang.any");
	},
	
	// override
	_applyValue: function(clazz) {
		this.generic.setExtendz(clazz);
	}
});
