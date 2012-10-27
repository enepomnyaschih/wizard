wizard.view.editor.Element = JW.UI.Component.extend({
	/*
	Events
	formchange(JW.Event event, wizard.view.editor.Form form);
	
	Required
	wizard.Model model;
	
	Fields
	wizard.view.editor.Form form;
	
	Abstract methods
	wizard.view.editor.Form _createForm();
	*/
	
	render: function() {
		this._super();
		this._initForm();
		this.form = this._createForm();
		this.addChild(this.form);
		this.validate();
	},
	
	destroyComponent: function() {
		this._doneForm();
		this._super();
	},
	
	validate: function() {
		var isValid = this._isValid();
		this.el.toggleClass("wizard-invalid", !isValid);
		return isValid;
	},
	
	_isValid: function() {
		return true;
	},
	
	_updateForm: function() {
		this._doneForm();
		this._initForm();
		this.trigger("formchange", this.form);
	},
	
	_initForm: function() {
		if (!this.form) {
			return;
		}
		this.form = this._createForm();
		this.addChild(this.form);
	},
	
	_doneForm: function() {
		if (!this.form) {
			return;
		}
		this.form.destroy();
		delete this.form;
	}
});
