wizard.view.editor.Element = JW.UI.Component.extend({
	/*
	Events
	focus(JW.Event event);
	
	Required
	wizard.view.Editor editor;
	
	Optional
	wizard.view.editor.MenuElement parent;
	
	Fields
	Boolean focused;
	
	Abstract methods
	void _onFocus();
	void _focusField();
	*/
	
	focused : false,
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-element");
		this.validate();
		this.el.click(JW.Function.inScope(this._onClick, this));
	},
	
	validate: function() {
		var isValid = this._isValid();
		this.el.toggleClass("wizard-invalid", !isValid);
		return isValid;
	},
	
	focus: function() {
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
	},
	
	_isValid: function() {
		return true;
	},
	
	_updateFocused: function() {
		this.el.toggleClass("wizard-focused", this.focused);
	},
	
	_onClick: function(event) {
		event.stopPropagation();
		this.focus();
	}
});
