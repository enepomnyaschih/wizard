wizard.view.editor.Element = JW.UI.Component.extend({
	/*
	Events
	focus(JW.Event event);
	
	Required
	wizard.view.Editor editor;
	
	Optional
	wizard.view.editor.MenuElement parentElement;
	
	Fields
	Boolean focused;
	Boolean expanded; // Element is expanded <=> Element is focused or one of its children is expanded
	
	Abstract methods
	void _onFocus();
	void _focusField();
	view _onBlur();
	*/
	
	focused : false,
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-element");
		this.validate();
		this.el.click(JW.Function.inScope(this._onClick, this));
	},
	
	destroyComponent: function() {
		if (this.focused) {
			this.editor.blur();
		}
		this._super();
	},
	
	validate: function() {
		var isValid = this._isValid();
		this.el.toggleClass("wizard-invalid", !isValid);
		return isValid;
	},
	
	focus: function() {
		if (this.editor._lock) {
			return;
		}
		if (!this.focused) {
			this.editor.onFocus(this);
			this.focused = true;
			this._updateFocused();
			this._onFocus();
		}
		this._focusField();
	},
	
	onBlur: function() {
		if (!this.focused) {
			return;
		}
		this.focused = false;
		this._updateFocused();
		this._onBlur();
	},
	
	_isValid: function() {
		return true;
	},
	
	_updateFocused: function() {
		this.el.toggleClass("wizard-focused", this.focused);
	},
	
	_updateExpanded: function() {
		this.el.toggleClass("wizard-collapsed", !this.expanded);
	},
	
	_onClick: function(event) {
		if (this.ctrlKey || !this.parentElement || this.parentElement.expanded) {
			event.stopPropagation();
			this.focus();
		}
	}
});

wizard.Util.addProperty(wizard.view.editor.Element, Boolean, "expanded", false);
