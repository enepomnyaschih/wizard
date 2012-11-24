/*
interface IFocusable extends IObservable {
	Events
	focus(JW.Event event);
	blur(JW.Event event);
	
	Fields
	Boolean focused;
}
*/

wizard.view.editor.Element = JW.UI.Component.extend({ // implements IFocusable
	/*
	Required
	wizard.view.Editor editor;
	
	Optional
	wizard.view.editor.FormElement parentElement;
	Boolean expanded; // Element is expanded <=> Element is focused or one of its children is expanded
	
	Fields
	JW.Collection<wizard.view.editor.List> lists;
	*/
	
	focused : false,
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-element");
		this.lists = new JW.Collection();
		this._updateExpanded();
		this.validate();
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
		this.editor.skipClickFocus();
		this.editor.issueFocus(this);
	},
	
	onBlur: function() {
		this._setFocused(false);
	},
	
	doFocus: function() {
		this._setFocused(true);
	},
	
	_setFocused: function(value) {
		value = Boolean(value);
		if (this.focused === value) {
			return;
		}
		if (value) {
			this.editor.onFocus(this);
		}
		this.focused = value;
		this._updateFocused();
		this.trigger(value ? "focus" : "blur");
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
	
	_selectClickHandler: function(event) {
		if (this.editor._skipClickFocus) {
			return;
		}
		if (event.ctrlKey || !this.parentElement || this.parentElement.expanded) {
			this.focus();
		}
	},
	
	_blockClickHandler: function(event) {
		this.editor.skipClickFocus();
	}
});

wizard.Util.addProperty(wizard.view.editor.Element, Boolean, "expanded", false);
