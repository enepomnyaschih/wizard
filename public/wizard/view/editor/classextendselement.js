wizard.view.editor.ClassExtendsElement = wizard.view.editor.ClassPickerElement.extend({
	/*
	Required
	wizard.model.Class clazz;
	*/
	
	// override
	render: function() {
		this._super();
		this.clazz.bind("extendzchange", this._updateForm, this);
	},
	
	// override
	destroyComponent: function() {
		this.clazz.purge(this);
		this._super();
	},
	
	// override
	_getValue: function() {
		return this.clazz.extendz;
	},
	
	// override
	_filterValue: function(clazz) {
		return (clazz !== this.clazz) && clazz.classKind && clazz.classKind.extendable;
	},
	
	// override
	_applyValue: function(clazz) {
		this.clazz.setExtendz(clazz);
	}
});
