wizard.view.editor.ClassDefinitionForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.Class clazz;
	
	Fields
	wizard.view.editor.TextElement nameElement;
	*/
	
	render: function() {
		this._super();
		this.kindEl.text(this.clazz.classKind.name);
	},
	
	// override
	_createElements: function() {
		var kind = this.clazz.classKind;
		var elements = [];
		elements.push(new wizard.view.editor.PackPickerElement({
			editor         : this.editor,
			applier        : this._applyPack,
			value          : this.clazz.parent,
			scope          : this,
			renderParent   : this,
			renderPosition : "pack"
		}));
		this.nameElement = new wizard.view.editor.TextElement({
			editor         : this.editor,
			value          : this.clazz.name,
			validator      : this._validateName,
			applier        : this._applyName,
			scope          : this,
			renderParent   : this,
			renderPosition : "name"
		});
		elements.push(this.nameElement);
		if (kind.extendz) {
			elements.push(new wizard.view.editor.ClassPickerElement({
				editor         : this.editor,
				applier        : this._applyExtends,
				value          : this.clazz.extendz,
				filterer       : this._filterExtends,
				scope          : this,
				renderParent   : this,
				renderPosition : "extends"
			}));
		} else {
			this.removeEl("extends");
			this.removeEl("extends-box");
		}
		return elements;
	},
	
	// override
	_createLists: function() {
		var kind = this.clazz.classKind;
		var lists = [];
		var config = {
			editor : this.editor,
			clazz  : this.clazz
		};
		if (kind.hasGenerics) {
			lists.push(new wizard.view.editor.List({
				title      : "generic classes",
				editor     : this.editor,
				collection : this.clazz.generics,
				provider   : wizard.view.editor.GenericDefinitionElement,
				dataField  : "generic"
			}));
		}
		if (kind.implementz) {
			lists.push(new wizard.view.editor.List({
				title      : "implements",
				editor     : this.editor,
				collection : this.clazz.implementz,
				provider   : wizard.view.editor.ClassPickerElement,
				dataField  : "clazz",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		if (kind.hasStaticElements) {
			lists.push(new wizard.view.editor.List({
				title      : "static fields",
				editor     : this.editor,
				collection : this.clazz.staticFields,
				provider   : wizard.view.editor.StaticFieldDefinitionElement,
				dataField  : "field",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		if (kind.hasDynamicElements) {
			lists.push(new wizard.view.editor.List({
				title      : "fields",
				editor     : this.editor,
				collection : this.clazz.fields,
				provider   : wizard.view.editor.FieldDefinitionElement,
				dataField  : "field",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		if (kind.hasConstructors) {
			lists.push(new wizard.view.editor.List({
				title      : "constructors",
				editor     : this.editor,
				collection : this.clazz.constructors,
				provider   : wizard.view.editor.ConstructorDefinitionElement,
				dataField  : "constructor",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		if (kind.hasMethods) {
			lists.push(new wizard.view.editor.List({
				title      : "methods",
				editor     : this.editor,
				collection : this.clazz.methods,
				provider   : wizard.view.editor.MethodDefinitionElement,
				dataField  : "method",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		if (kind.hasStaticElements) {
			lists.push(new wizard.view.editor.List({
				title      : "static methods",
				editor     : this.editor,
				collection : this.clazz.staticMethods,
				provider   : wizard.view.editor.StaticMethodDefinitionElement,
				dataField  : "method",
				extraCfg   : { clazz : this.clazz }
			}));
		}
		return lists;
	},
	
	_validateName: function(name) {
		if (!wizard.view.editor.ClassDefinitionForm.nameRegex.test(name)) {
			return "Invalid class name. Must contain liters and numbers only, must start from higher case liter.";
		}
		var sibling = this.clazz.parent.classes.get(name);
		if (sibling && (sibling !== this.clazz)) {
			return "Class with such name exists already.";
		}
	},
	
	_applyName: function(name) {
		this.clazz.setName(name);
	},
	
	_applyPack: function(pack) {
		if (pack === this.clazz.parent) {
			return;
		}
		this.clazz.parent.classes.removeItem(this);
		pack.classes.addItem(this);
	},
	
	_filterExtends: function(clazz) {
		return clazz.classKind && clazz.classKind.extendable;
	},
	
	_applyExtends: function(clazz) {
	}
});

wizard.view.editor.ClassDefinitionForm.nameRegex = /^[A-Z][A-Za-z0-9]*$/;
