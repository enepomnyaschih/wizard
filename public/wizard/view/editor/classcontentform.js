wizard.view.editor.ClassContentForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.Class clazz;
	*/
	
	initComponent: function() {
		this.title = this.clazz.classKind.name;
		this._super();
	},
	
	// override
	_createChildren: function() {
		var kind = this.clazz.kind;
		var children = [];
		var config = {
			model : this.model,
			clazz : this.clazz
		};
		if (kind.hasGenericClasses) {
			children.push(new wizard.view.editor.ClassGenericClassesForm(config));
		}
		if (kind.extendz) {
			children.push(new wizard.view.editor.ClassExtendsForm(config));
		}
		if (kind.implementz) {
			children.push(new wizard.view.editor.ClassImplementsForm(config));
		}
		if (kind.hasStaticElements) {
			children.push(new wizard.view.editor.ClassStaticFieldsForm(config));
		}
		if (kind.hasDynamicElements) {
			children.push(new wizard.view.editor.ClassFieldsForm(config));
		}
		if (kind.hasConstructors) {
			children.push(new wizard.view.editor.ClassConstructorsForm(config));
		}
		if (kind.hasMethods) {
			children.push(new wizard.view.editor.ClassMethodsForm(config));
		}
		if (kind.hasStaticElements) {
			children.push(new wizard.view.editor.ClassStaticMethodsForm(config));
		}
		return children;
	}
});
