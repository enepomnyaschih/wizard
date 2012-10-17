wizard.view.navigation.Module = JW.UI.Component.extend({
	/*
	Required options
	wizard.Model model
	wizard.model.Module module
	
	Abstract methods
	String _getLabel()
	*/
	
	render: function() {
		this._super();
		
		var Module = wizard.view.navigation.Module;
		
		this.rowEl.attr("wizardmodule", this.module.moduleKind.id);
		
		this._renderBody();
		
		this._updateName();
		this.module.bind("namechange", this._updateName, this);
		
		this._updateSelected();
		this.module.bind("selectedchange", this._updateSelected, this);
		
		this.rowEl.mousedown(JW.Function.inScope(this._onMouseDown, this));
	},
	
	destroyComponent: function() {
		this.module.purge(this);
		
		this._super();
	},
	
	_renderBody: function() {
		this.removeEl("body");
	},
	
	_updateName: function() {
		this.rowEl.text(this._getLabel());
	},
	
	_updateSelected: function() {
		this.rowEl.toggleClass("wizard-selected", this.module.selected);
	},
	
	_onMouseDown: function(event) {
		event.preventDefault();
		this.model.selectModule(this.module);
	}
});
