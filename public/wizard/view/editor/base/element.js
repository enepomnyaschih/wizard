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
	},
	
	_updateForm: function() {
		this._doneForm();
		this._initForm();
	},
	
	_initForm: function() {
		if (!this.form) {
			return;
		}
		this.form = this._createForm();
		this.addChild(this.form);
	},
	
	_doneForm
});
