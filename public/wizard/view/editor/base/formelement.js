wizard.view.editor.FormElement = wizard.view.editor.Element.extend({
	/*
	Abstract methods
	wizard.view.editor.Form _createForm();
	*/
	
	render: function() {
		this._super();
		
		this.form = this._createForm();
		this.addChild(this.form);
	}
});
