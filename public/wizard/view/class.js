wizard.view.Class = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Class module;
	
	Fields
	wizard.view.editor.ClassContentElement element;
	wizard.view.editor.Line line;
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
		
		this.element = new wizard.view.editor.ClassContentElement({
			model : this.model,
			clazz : this.module
		});
		
		this.line = new wizard.view.editor.Line({
			element        : this.element,
			renderParent   : this,
			renderPosition : "line"
		});
	},
	
	afterAppend: function() {
		this._super();
		this.namePicker.focus();
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
