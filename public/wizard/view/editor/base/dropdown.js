wizard.view.editor.Dropdown = JW.UI.Component.extend({
	/*
	Events
	submit(JW.Event event, wizard.view.editor.MenuOption option);
	
	Required
	JW.Collection<wizard.view.editor.MenuOption> options;
	
	Optional
	Integer selectedIndex;
	
	Fields
	wizard.lib.TextChangeListener filterChangeListener;
	JW.UI.Syncher syncher;
	*/
	
	renderTo      : "body",
	childBox      : "options",
	selectedIndex : -1,
	
	render: function() {
		this._super();
		this.filterChangeListener = new wizard.lib.TextChangeListener({
			el : this.filterEl
		});
		this.filterChangeListener.bind("change", this._onFilterChange, this);
		this.filterEl.keydown(JW.Function.inScope(this._onFilterKeyDown, this));
		this.syncher = new JW.UI.Syncher({
			collection : this.options,
			creator    : this._createOptionView,
			scope      : this
		});
		this._initSelectedIndex();
		this._setSelectedIndex(this._adjustSelection());
	},
	
	destroyComponent: function() {
		this.syncher.destroy();
		this.filterChangeListener.destroy();
		this._super();
	},
	
	getSelectedOption: function() {
		return this.options[this.selectedIndex];
	},
	
	_createOptionView: function(option) {
		var optionView = new wizard.view.editor.dropdown.Option({
			option : option
		});
		var self = this;
		optionView.el.mousedown(function() {
			self.trigger("submit", option);
		});
		return optionView;
	},
	
	_onFilterChange: function(event, value) {
		JW.each(this.plainChildren, function(optionView) {
			optionView.setAvailable(this._isAvailable(optionView.option.value, value));
		}, this);
		this._setSelectedIndex(this._adjustSelection());
	},
	
	_onFilterKeyDown: function(event) {
		switch (event.which) {
		}
	},
	
	_isAvailable: function(option, filter) {
		if (filter.length === "") {
			return true;
		}
		var lowerFilter = filter.toLowerCase();
		if (lowerFilter === filter) {
			var lowerOption = option.toLowerCase();
			if (lowerOption.substr(0, filter.length) === lowerFilter) {
				return true;
			}
		}
		return false;
	},
	
	_adjustSelection: function() {
		var start = (this.selectedIndex === -1) ? 0 : this.selectedIndex;
		for (var shift = 0; shift < this.plainChildren.length; ++shift) {
			var index = (start + shift) % this.plainChildren.length;
			var child = this.plainChildren[index];
			if (child.available)
				return index;
		}
		return -1;
	},
	
	_setSelectedIndex: function(value) {
		if (this.selectedIndex === value) {
			return;
		}
		this._doneSelectedIndex();
		this.selectedIndex = value;
		this._initSelectedIndex();
	},
	
	_initSelectedIndex: function() {
		if (this.selectedIndex === -1) {
			this.blankEl.show();
			this.optionsEl.hide();
		} else {
			this.blankEl.hide();
			this.optionsEl.show();
			this.plainChildren[this.selectedIndex].setSelected(true);
		}
	},
	
	_doneSelectedIndex: function() {
		if (this.selectedIndex === -1) {
			return;
		}
		this.plainChildren[this.selectedIndex].setSelected(false);
		this.selectedIndex = -1;
	}
});

wizard.view.editor.dropdown = {};
