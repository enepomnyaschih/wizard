wizard.view.editor.ClassForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.Class clazz;
	
	Fields
	wizard.view.editor.TextElement nameElement;
	wizard.view.editor.PackElement packElement;
	*/
	
	render: function() {
		this._super();
		
		this.kindEl.text(this.clazz.kind.name);
	},
	
	// override
	_createElements: function() {
		this.nameElement = new wizard.view.editor.TextElement({
			model     : this.model,
			validator : this._validateName,
			applier   : this._applyName,
			scope     : this
		});
		
		this.packElement = new wizard.view.editor.PackElement({
			model     : this.model,
			validator : this._validatePack,
			applier   : this._applyPack,
			scope     : this
		});
		
		return [
			this.nameElement,
			this.packElement
		];
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
		if (kind.hasDynamicElements) {
			children.push(new wizard.view.editor.ClassFieldsForm(config));
		}
		if (kind.hasConstructors) {
			children.push(new wizard.view.editor.ClassConstructorsForm(config));
		}
		if (kind.hasMethods) {
			children.push(new wizard.view.editor.ClassMethodsForm(config));
		}
		return children;
	}
});
