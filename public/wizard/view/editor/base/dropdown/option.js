wizard.view.editor.dropdown.Option = JW.UI.Component.extend({
	/*
	Required
	wizard.view.editor.MenuOption option;
	
	Optional
	Boolean selected;
	*/
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-dropdown-option");
		this.el.text(this.option.label);
		this._updateSelected();
	},
	
	_updateSelected: function() {
		this.el.toggleClass("wizard-selected", this.selected);
	}
});

wizard.Util.addProperty(wizard.view.editor.dropdown.Option, Boolean, "selected", false);
