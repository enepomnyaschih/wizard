wizard.view.editor.Element = JW.UI.Component.extend({
	/*
	Events
	formchange(JW.Event event, wizard.view.editor.Form form);
	
	Required
	wizard.Model model;
	
	Optional
	wizard.view.editor.Element parent;
	
	Fields
	wizard.view.editor.Form form;
	
	Abstract methods
	wizard.view.editor.Form _createForm();
	*/
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-element");
		this._initForm();
		this.form = this._createForm();
		this.addChild(this.form);
		this.validate();
		this.el.click(JW.Function.inScope(this._onClick, this));
	},
	
	destroyComponent: function() {
		this._doneForm();
		this._super();
	},
	
	validate: function() {
		var isValid = this._isValid();
		this.el.toggleClass("wizard-invalid", !isValid);
		return isValid;
	},
	
	_isValid: function() {
		return true;
	},
	
	_updateForm: function() {
		this._doneForm();
		this._initForm();
		this.trigger("formchange", this.form);
	},
	
	_initForm: function() {
		if (!this.form) {
			return;
		}
		this.form = this._createForm();
		this.addChild(this.form);
	},
	
	_doneForm: function() {
		if (!this.form) {
			return;
		}
		this.form.destroy();
		delete this.form;
	},
	
	_updateExpanded: function() {
		this.el.toggleClass("wizard-collapsed", !this.expanded);
	},
	
	_onClick: function(event) {
		event.stopPropagation();
		if (this.focused) {
			this.setExpanded(true);
			if (this.form) {
				var firstChild = this.form.elements.getItemAt(0);
				if (firstChild) {
					this.editor.focusManager.focus(firstChild);
				}
			}
		} else {
			this.editor.focusManager.focusRoot(this);
		}
	}
});

wizard.Util.addProperty(wizard.view.editor.Element, Boolean, "expanded", false);
wizard.Util.addProperty(wizard.view.editor.Element, Boolean, "focused", false);
