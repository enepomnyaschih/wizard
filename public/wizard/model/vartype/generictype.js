wizard.model.vartype.Kind.genericType = new wizard.model.vartype.Kind({
	id : "genericType"
});

wizard.model.vartype.GenericType = wizard.model.VarType.extend({
	/*
	Fields
	genericType : wizard.model.clazz.GenericType
	*/
	
	kind : wizard.model.vartype.Kind.genericType,
	
	getClass: function() {
		return this.genericType.extendz;
	}
});
