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
		this._selectNext();
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
		var someAvailable = false;
		JW.each(this.plainChildren, function(optionView) {
			var available = this._isAvailable(optionView.option.label, value);
			optionView.setAvailable(available);
			someAvailable = someAvailable || available;
		}, this);
		if (someAvailable) {
			var option = this.getSelectedOption();
			if (!option || !option.available) {
				this._selectNext();
			}
		} else {
			this._setSelectedIndex(-1);
		}
	},
	
	_onFilterKeyDown: function(event) {
		switch (event.which) {
			case 38: // up
				event.preventDefault();
				this._selectPrev();
				break;
			case 40: // down
				event.preventDefault();
				this._selectNext();
				break;
			case 27: // esc
				this.filterEl.val("");
				break;
			case 13: // enter
				var option = this.getSelectedOption();
				if (option) {
					this.trigger("submit", option);
				}
				break;
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
	
	_selectNext: function() {
		for (var index = this.selectedIndex + 1; index < this.plainChildren.length; ++index) {
			if (this.plainChildren[index].available) {
				this._setSelectedIndex(index);
				return;
			}
		}
	},
	
	_selectPrev: function() {
		if (this.selectedIndex === -1) {
			this._selectNext();
			return;
		}
		for (var index = this.selectedIndex - 1; index >= 0; --index) {
			if (this.plainChildren[index].available) {
				this._setSelectedIndex(index);
				return;
			}
		}
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
