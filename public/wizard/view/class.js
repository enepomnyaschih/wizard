wizard.view.Class = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Class module;
	
	Fields
	wizard.view.element.Class element;
	*/
	
	render: function() {
		this._super();
		
		this.element = new wizard.view.element.Class({
			model          : this.model,
			clazz          : this.module,
			renderParent   : this,
			renderPosition : "element"
		});
	}
});

wizard.view.Class.nameRegex = /^[A-Z][A-Za-z0-9]*$/;
