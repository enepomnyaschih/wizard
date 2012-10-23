wizard.model.vartype.Kind.genericClass = new wizard.model.vartype.Kind({
	id : "genericClass"
});

wizard.model.vartype.GenericClass = wizard.model.VarType.extend({
	/*
	Fields
	genericClass : wizard.model.clazz.GenericClass
	*/
	
	kind : wizard.model.vartype.Kind.genericClass,
	
	getClass: function() {
		return this.genericClass.extendz;
	}
});
