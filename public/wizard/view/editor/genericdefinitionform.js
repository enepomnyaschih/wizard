﻿wizard.view.editor.GenericDefinitionForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.clazz.Generic generic;
	*/
	
	// override
	_createElements: function() {
		var elements = [];
		elements.push(new wizard.view.editor.TextElement({
			editor         : this.editor,
			value          : this.generic.name,
			validator      : this._validateName,
			applier        : this._applyName,
			scope          : this,
			renderParent   : this,
			renderPosition : "name"
		}));
		elements.push(new wizard.view.editor.GenericExtendsElement({
			editor         : this.editor,
			generic        : this.generic,
			renderParent   : this,
			renderPosition : "extends"
		}));
		return elements;
	},
	
	_validateName: function(name) {
		if (!wizard.view.editor.GenericDefinitionForm.nameRegex.test(name)) {
			return "Invalid generic name. Must contain liters and numbers only, must start from higher case liter.";
		}
		var sibling = this.generic.clazz.generics.get(name);
		if (sibling && (sibling !== this.generic)) {
			return "Generic with such name exists already.";
		}
	},
	
	_applyName: function(name) {
		this.generic.setName(name);
	}
});

wizard.view.editor.GenericDefinitionForm.nameRegex = /^[A-Z][A-Za-z0-9]*$/;
