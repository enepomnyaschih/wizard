﻿wizard.View = JW.UI.Component.extend({
	/*
	Required options
	model      : wizard.Model
	
	Fields
	navigation : wizard.view.Navigation
	module     : wizard.view.Module
	*/
	
	render: function() {
		this._super();
		
		this.navigation = new wizard.view.Navigation({
			model          : this.model,
			renderParent   : this,
			renderPosition : "navigation"
		});
		
		//this._updateModule();
		//this.model.bind("moduleselect", this._updateModule, this);
	},
	
	_updateModule: function()
	{
		if (!this.module && !this.model.selectedModule) {
			return;
		}
		if (this.module && (this.module.module === this.model.selectedModule)) {
			return;
		}
		if (this.module) {
			this.restoreElement("module");
			this.module.destroy();
			delete this.module;
		}
		if (this.model.selectedModule) {
			this.module = this.model.selectedModule.createModuleView();
			this.addChild(this.module, "module");
		}
	}
});

wizard.view = {};
