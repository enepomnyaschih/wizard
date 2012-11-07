wizard.view.editor.MenuElement = wizard.view.editor.Element.extend({
	/*
	Events
	formchange(JW.Event event, wizard.view.editor.Form form);
	
	Fields
	wizard.view.editor.Form form;
	wizard.view.editor.Dropdown dropdown;
	
	Abstract methods
	wizard.view.editor.Form _createForm();
	Array<wizard.view.editor.MenuOption> _createOptions();
	String _getMenuValue();
	*/
	
	render: function() {
		this._super();
		this._updateExpanded();
		this._initForm();
	},
	
	destroyComponent: function() {
		this._doneForm();
		this._super();
	},
	
	focusIn: function() {
		var element = this.form.elements.getItemAt(0);
		if (element) {
			element.focus();
		} else {
			this.editor.focusNext(this);
		}
	},
	
	_updateForm: function() {
		this._doneForm();
		this._initForm();
		this.trigger("formchange", this.form);
	},
	
	_initForm: function() {
		if (this.form) {
			return;
		}
		this.form = this._createForm();
		this.form.elements.every(function(element) {
			element.parentElement = this;
		}, this);
		this.addChild(this.form);
	},
	
	_doneForm: function() {
		if (!this.form) {
			return;
		}
		this.form.destroy();
		delete this.form;
	},
	
	// override
	_onFocus: function() {
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
		this.dropdown.bind("submit", this._onDropdownSubmit, this);
		this.dropdown.filterEl.blur(JW.Function(this._onDropdownBlur, this));
		this.dropdown.filterEl.keydown(JW.Function(this._onDropdownKeyDown, this));
	},
	
	_focusField: function() {
		this.dropdown.filterEl.focus();
	},
	
	_onDropdownSubmit: function(event, option) {
		this._submit(option);
	},
	
	_onDropdownBlur: function() {
		this.editor.issueBlur();
	},
	
	_onDropdownKeyDown: function(event) {
		switch (event.which) {
			case 13: this._submit(this.dropdown.getSelectedOption()); break;
			case 27: this._doneDropdown(); break;
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
		}
		this._doneDropdown();
		this.focusIn();
	},
	
	_doneDropdown: function() {
		if (!this.dropdown) {
			return;
		}
		this.dropdown.destroy();
		delete this.dropdown;
	}
});
