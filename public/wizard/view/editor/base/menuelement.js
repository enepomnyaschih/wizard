wizard.view.editor.MenuElement = wizard.view.editor.Element.extend({
	/*
	Events
	formchange(JW.Event event, wizard.view.editor.Form form);
	
	Fields
	wizard.view.editor.Form form;
	Boolean expanded;
	
	Abstract methods
	wizard.view.editor.Form _createForm();
	Array<wizard.view.editor.MenuElementOption> _createOptions();
	string _getMenuValue();
	*/
	
	render: function() {
		this._super();
		this._initForm();
		this.form = this._createForm();
		this.addChild(this.form);
	},
	
	destroyComponent: function() {
		this._doneForm();
		this._super();
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
		this.form.elements.every(function(element) {
			element.parent = this;
		}, this);
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
		var element = this.focused ?
			this.form.elements.getItemAt(0) :
			this.editor.findClickableElement(this);
		if (element) {
			element.focus();
		}
	},
	
	_onFocus: function() {
	},
	
	_focusField: function() {
	}
});

wizard.Util.addProperty(wizard.view.editor.MenuElement, Boolean, "expanded", false);
