wizard.model.vartype.Kind.generic = new wizard.model.vartype.Kind({
	id : "generic"
});

wizard.model.vartype.Generic = wizard.model.VarType.extend({
	/*
	Fields
	generic : wizard.model.clazz.Generic
	*/
	
	kind : wizard.model.vartype.Kind.generic,
	
	getClass: function() {
		return this.generic.extendz;
	}
});
