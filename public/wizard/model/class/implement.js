wizard.model.clazz.Implement = wizard.lib.Wrapper.extend({ // <wizard.model.Class>
	/*
	Fields
	wizard.model.Class clazz;
	*/
	
	init: function(clazz, implementz) {
		this._super(implementz);
		this.clazz = clazz;
	}
});
