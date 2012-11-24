wizard.view.editor.MenuElement = wizard.view.editor.ContainerElement.extend({
	/*
	Fields
	wizard.view.editor.Dropdown dropdown;
	
	Abstract methods
	Array<wizard.view.editor.MenuOption> _createOptions();
	String _getMenuValue();
	*/
	
	destroyComponent: function() {
		this._doneDropdown();
		this._super();
	},
	
	_updateFocused: function() {
		this._super();
		if (this.focused) {
			this._initDropdown();
			this.dropdown.filterEl.focus();
		} else {
			this._doneDropdown();
		}
	},
	
	_initDropdown: function() {
		if (this.dropdown) {
			return;
		}
		var options = this._createOptions();
		var value = this._getMenuValue();
		var index = JW.findBy(options, value);
		this.dropdown = new wizard.view.editor.Dropdown({
			options       : options,
			selectedIndex : index
		});
		var offset = this.el.offset();
		offset.top += this.el.outerHeight() + 3;
		this.dropdown.el.offset(offset);
		this.dropdown.el.click(JW.Function.inScope(this._blockClickHandler, this));
		this.dropdown.bind("submit", this._onDropdownSubmit, this);
		this.dropdown.filterEl.keydown(JW.Function(this._onDropdownKeyDown, this));
	},
	
	_doneDropdown: function() {
		if (!this.dropdown) {
			return;
		}
		this.dropdown.destroy();
		delete this.dropdown;
	},
	
	_onDropdownSubmit: function(event, option) {
		this._submit(option);
	},
	
	_onDropdownKeyDown: function(event) {
		switch (event.which) {
			case 13: this._submit(this.dropdown.getSelectedOption()); break;
			default: return;
		}
		event.preventDefault();
	},
	
	_submit: function(option) {
		if (!option) {
			return;
		}
		if (option.value !== this._getMenuValue()) {
			option.applier.call(option.scope, option);
			this.validate();
		}
		this._doneDropdown();
		this.focusIn();
	}
});
