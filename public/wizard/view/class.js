wizard.view.Class = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Class module;
	*/
	
	render: function() {
		this._super();
	}
});

wizard.view.Class.nameRegex = /^[A-Z][A-Za-z0-9]*$/;
