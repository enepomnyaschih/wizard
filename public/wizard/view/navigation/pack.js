wizard.view.navigation.Pack = wizard.view.navigation.Module.extend({
	/*
	Required options
	wizard.model.Pack module
	
	Fields
	wizard.view.navigation.pack.Body body
	Boolean expanded
	*/
	
	expanded : false,
	
	render: function() {
		this._super();
		
		this._updateEmpty();
		this.module.packs.bind("lengthchange", this._updateEmpty, this);
		this.module.classes.bind("lengthchange", this._updateEmpty, this);
	},
	
	destroyComponent: function() {
		this.module.packs.purge(this);
		this.module.classes.purge(this);
		
		this._super();
	},
	
	setExpanded: function(value) {
		value = Boolean(value);
		if (this.expanded === value) {
			return;
		}
		this.expanded = value;
	},
	
	_updateExpanded: function() {
		this.rowEl.toggleClass("wizard-expanded", this.expanded);
		this.body.el.css("display", this.expanded ? "" : "none");
	},
	
	_renderBody: function() {
		this.body = new wizard.view.navigation.pack.Body({
			model          : this.model,
			pack           : this.module,
			renderParent   : this,
			renderPosition : "body"
		});
		this._updateExpanded();
	},
	
	_getLabel: function() {
		return this.module.isRoot() ? "(root)" : this.module.getFullName();
	},
	
	_onMouseDown: function(event) {
		if (this.module.selected || !this.expanded) {
			this.setExpanded(!this.expanded);
		}
		this._super(event);
	},
	
	_updateEmpty: function() {
		this.rowEl.toggleClass("wizard-empty", this.module.isEmpty());
	},
	
	_updateName: function() {
		this._super();
		JW.eachByMethod(this.body.packs.plainChildren, "_updateName");
	}
});

wizard.Util.addProperty(wizard.view.navigation.Pack, Boolean, "expanded", false, "_updateExpanded");

wizard.view.navigation.pack = {};
