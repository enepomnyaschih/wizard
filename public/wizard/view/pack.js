wizard.view.Pack = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Pack module;
	
	Fields
	wizard.view.picker.Name namePicker;
	wizard.view.picker.Pack parentPicker
	*/
	
	render: function() {
		this._super();
		
		this.newPackEl.click(JW.Function.inScope(this._onNewPackClick, this));
		this.newClassEl.click(JW.Function.inScope(this._onNewClassClick, this));
		this.deleteEl.click(JW.Function.inScope(this._onDeleteClick, this));
		
		this.namePicker = new wizard.view.picker.Name({
			validator      : this._validateName,
			applier        : this._applyName,
			renderParent   : this,
			renderPosition : "name"
		});
		
		if (this.module.isRoot()) {
			this.removeEl("parent-field");
		}
		else {
			this.parentPicker = new wizard.view.picker.Pack({
				model          : this.model,
				renderParent   : this,
				renderPosition : "parent"
			});
		}
	},
	
	_validateName: function(name) {
		if (!wizard.view.Pack.nameRegex.test(name)) {
			return "Invalid package name. Must contain lowercase liters and numbers only, must start from liter.";
		}
		var isFree = this.module.parent.packs.every(function(sibling) {
			return (sibling === this.module) || (sibling.name !== name);
		}, this);
		if (!isFree) {
			return "Package with such name exists already.";
		}
	},
	
	_applyName: function(name) {
		this.module.setName(name);
	}
});

wizard.view.Pack.nameRegex = /^[a-z][a-z0-9]*$/;
