wizard.view.editor.ClassContentElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	wizard.model.Class clazz;
	*/
	
	render: function() {
		this._super();
		this.clazz.bind("contentchange", this._updateForm, this);
	},
	
	destroyComponent: function() {
		this.clazz.purge(this);
		this._super();
	},
	
	// override
	_createForm: function() {
		if (!this.clazz.content) {
			return new wizard.view.editor.Form({
				model : this.model,
				title : "select class kind"
			});
		}
		return this.clazz.content.createForm(this.model);
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
