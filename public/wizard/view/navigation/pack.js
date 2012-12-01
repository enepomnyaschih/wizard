wizard.view.navigation.Pack = wizard.view.navigation.Module.extend({
	/*
	Events
	expandedchange(JW.Event event, Boolean value);
	
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
		this.module.packs.values.bind("lengthchange", this._updateEmpty, this);
		this.module.classes.values.bind("lengthchange", this._updateEmpty, this);
	},
	
	destroyComponent: function() {
		this.module.packs.values.purge(this);
		this.module.classes.values.purge(this);
		
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
		return this.module.fullName;
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

wizard.Util.addProperty(wizard.view.navigation.Pack, Boolean, "expanded");

wizard.view.navigation.pack = {};
