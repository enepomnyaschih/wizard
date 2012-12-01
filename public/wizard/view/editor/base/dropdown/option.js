wizard.view.editor.dropdown.Option = JW.UI.Component.extend({
	/*
	Events
	selectedchange(JW.Event event, Boolean value);
	availablechange(JW.Event event, Boolean value);
	
	Required
	wizard.view.editor.MenuOption option;
	
	Optional
	Boolean selected;
	Boolean available;
	*/
	
	selected  : false,
	available : true,
	
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

wizard.Util.addProperty(wizard.view.editor.dropdown.Option, Boolean, "selected");
wizard.Util.addProperty(wizard.view.editor.dropdown.Option, Boolean, "available");
