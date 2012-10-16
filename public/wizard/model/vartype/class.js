wizard.model.vartype.Kind["class"] = new wizard.model.vartype.Kind({
	id : "class"
});

wizard.model.vartype.Class = wizard.model.VarType.extend({
	/*
	Fields
	clazz : wizard.model.Class
	*/
	
	kind : wizard.model.vartype.Kind["class"],
	
	getClass: function() {
		return this.clazz;
	}
});
