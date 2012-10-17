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
		
		if (this.module.isRoot()) {
			this.removeEl("name-field");
			this.removeEl("parent-field");
			return;
		}
		
		this.namePicker = new wizard.view.picker.Name({
			validator      : JW.Function.inScope(this._validateName, this),
			applier        : JW.Function.inScope(this._applyName, this),
			value          : this.module.name,
			renderParent   : this,
			renderPosition : "name-picker"
		});
		
		this.el.find(".label").css("width", "100px");
		/*
		this.parentPicker = new wizard.view.picker.Pack({
			model          : this.model,
			renderParent   : this,
			renderPosition : "parent-picker"
		});
		*/
	},
	
	afterAppend: function() {
		this._super();
		
		if (this.namePicker) {
			this.namePicker.focus();
		}
	},
	
	_onNewPackClick: function() {
		this.model.selectModule(this.module.newPack());
	},
	
	_onNewClassClick: function() {
		this.model.selectModule(this.module.newClass());
	},
	
	_onDeleteClick: function() {
		this.module.remove();
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
