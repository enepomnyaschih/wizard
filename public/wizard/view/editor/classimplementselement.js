wizard.view.editor.ClassImplementsElement = wizard.view.editor.ClassPickerElement.extend({
	/*
	Required
	wizard.model.clazz.Implement implement;
	*/
	
	// override
	render: function() {
		this._super();
		this.implement.bind("change", this._updateForm, this);
	},
	
	// override
	destroyComponent: function() {
		this.implement.purge(this);
		this._super();
	},
	
	// override
	_getValue: function() {
		return this.implement.value;
	},
	
	// override
	_filterValue: function(clazz) {
		return (clazz !== this.clazz) && (clazz.classKind === wizard.model.clazz.Kind.items["interface"]);
	},
	
	// override
	_applyValue: function(clazz) {
		this.implement.set(clazz);
	}
});
