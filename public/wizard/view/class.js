wizard.view.Class = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Class module;
	
	Fields
	wizard.view.editor.ClassDefinitionElement element;
	wizard.view.editor.Structure structure;
	wizard.view.Editor editor;
	*/
	
	render: function() {
		this._super();
		
		this.deleteEl.click(JW.Function.inScope(this._onDeleteClick, this));
		
		this.namePicker = new wizard.view.picker.Name({
			validator      : JW.Function.inScope(this._validateName, this),
			applier        : JW.Function.inScope(this._applyName, this),
			value          : this.module.name,
			renderParent   : this,
			renderPosition : "name-picker"
		});
		
		this.el.find(".label").css("width", "100px");
		
		this.editor = new wizard.view.Editor({
			model : this.model
		});
		this.element = new wizard.view.editor.ClassDefinitionElement({
			model  : this.model,
			clazz  : this.module,
			editor : this.editor
		});
		this.structure = new wizard.view.editor.Structure({
			element        : this.element,
			renderParent   : this,
			renderPosition : "structure"
		});
		this.editor.setRoot(this.structure);
	},
	
	afterAppend: function() {
		this._super();
		this.namePicker.focus();
	},
	
	destroyComponent: function() {
		this.editor.destroy();
		this._super();
	},
	
	_onDeleteClick: function() {
		this.module.remove();
	},
	
	_validateName: function(name) {
		if (!wizard.view.Class.nameRegex.test(name)) {
			return "Invalid class name. Must contain liters and numbers only, must start from higher case liter.";
		}
		var isFree = this.module.parent.classes.every(function(sibling) {
			return (sibling === this.module) || (sibling.name !== name);
		}, this);
		if (!isFree) {
			return "Class with such name exists already.";
		}
	},
	
	_applyName: function(name) {
		this.module.setName(name);
	}
});

wizard.view.Class.nameRegex = /^[A-Z][A-Za-z0-9]*$/;
