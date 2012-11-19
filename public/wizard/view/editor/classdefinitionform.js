﻿wizard.view.editor.ClassDefinitionForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.Class clazz;
	*/
	
	render: function() {
		this._super();
		this.kindEl.text(this.clazz.classKind.name);
	},
	
	// override
	_createElements: function() {
		var kind = this.clazz.classKind;
		var elements = [];
		elements.push(new wizard.view.editor.TextElement({
			editor         : this.editor,
			value          : this.clazz.name,
			applier        : this._applyName,
			scope          : this,
			renderParent   : this,
			renderPosition : "name"
		}));
		elements.push(new wizard.view.editor.PackPickerElement({
			editor         : this.editor,
			applier        : this._applyPack,
			scope          : this,
			renderParent   : this,
			renderPosition : "pack"
		}));
		if (kind.extendz) {
			elements.push(new wizard.view.editor.ClassPickerElement({
				editor         : this.editor,
				applier        : this._applyExtends,
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
		if (kind.hasGenericClasses) {
			lists.push(new wizard.view.editor.List({
				title      : "generic classes",
				editor     : this.editor,
				collection : this.clazz.genericClasses,
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
				dataField  : "clazz"
			}));
		}
		if (kind.hasStaticElements) {
			lists.push(new wizard.view.editor.List({
				title      : "static fields",
				editor     : this.editor,
				collection : this.clazz.staticFields,
				provider   : wizard.view.editor.StaticFieldDefinitionElement,
				dataField  : "field"
			}));
		}
		if (kind.hasDynamicElements) {
			lists.push(new wizard.view.editor.List({
				title      : "fields",
				editor     : this.editor,
				collection : this.clazz.fields,
				provider   : wizard.view.editor.FieldDefinitionElement,
				dataField  : "field"
			}));
		}
		if (kind.hasConstructors) {
			lists.push(new wizard.view.editor.List({
				title      : "constructors",
				editor     : this.editor,
				collection : this.clazz.constructors,
				provider   : wizard.view.editor.ConstructorDefinitionElement,
				dataField  : "constructor"
			}));
		}
		if (kind.hasMethods) {
			lists.push(new wizard.view.editor.List({
				title      : "methods",
				editor     : this.editor,
				collection : this.clazz.methods,
				provider   : wizard.view.editor.MethodDefinitionElement,
				dataField  : "method"
			}));
		}
		if (kind.hasStaticElements) {
			lists.push(new wizard.view.editor.List({
				title      : "static methods",
				editor     : this.editor,
				collection : this.clazz.staticMethods,
				provider   : wizard.view.editor.StaticMethodDefinitionElement,
				dataField  : "method"
			}));
		}
		return lists;
	}
});