wizard.view.editor.TextElement = wizard.view.editor.Element.extend({
	/*
	Optional
	String value;
	
	Fields
	String _initialValue;
	String _currentValue;
	Integer _changeTimer;
	Boolean _valid;
	
	Abstract methods
	String validator(String value);
	void applier(String value);
	*/
	
	value  : "",
	_valid : true,
	
	render: function() {
		this._super();
		
		this.inputEl.val(this.value);
		this._updateInput();
		this._updateValid();
		
		this.inputEl.bind("focus", JW.Function.inScope(this._onInputFocus, this));
		this.inputEl.bind("blur", JW.Function.inScope(this._onInputBlur, this));
		this.inputEl.bind("change", JW.Function.inScope(this._testChange, this));
		this.inputEl.bind("keydown", JW.Function.inScope(this._onKeyDown, this));
		this.inputEl.bind("mouseup", function(event) { event.preventDefault(); });
	},
	
	doFocus: function() {
		this.inputEl.focus();
	},
	
	_commit: function() {
		if (!this._changeTimer || !this._valid) {
			return;
		}
		this.value = this._editValue;
		this.applier(this.value);
		this._endEdit();
	},
	
	_revert: function() {
		if (!this._changeTimer) {
			return;
		}
		this.inputEl.val(this._initialValue);
		this._endEdit();
	},
	
	_onInputFocus: function() {
		this._setFocused(true);
	},
	
	_onInputBlur: function() {
		this._setFocused(false);
	},
	
	_updateFocused: function() {
		this._super();
		if (this.focused) {
			this._beginEdit();
		} else {
			if (!this._changeTimer) {
				return;
			}
			if (this._valid) {
				this._commit();
			} else {
				this._revert();
			}
		}
	},
	
	_onKeyDown: function(event) {
		switch (event.which) {
			case 13: this._commit(); break;
			case 27: this._revert(); break;
			default: this._testChange();
		}
	},
	
	_beginEdit: function() {
		if (this._changeTimer) {
			return;
		}
		this.inputEl.val(this.value);
		this.inputEl.select();
		this._initialValue = this.value;
		this._editValue = this._initialValue;
		this._changeTimer = setInterval(JW.Function.inScope(this._testChange, this), 10);
		this._valid = true;
		this._updateInput();
		this._updateValid();
	},
	
	_endEdit: function() {
		if (!this._changeTimer) {
			return;
		}
		clearInterval(this._changeTimer);
		delete this._initialValue;
		delete this._editValue;
		delete this._changeTimer;
		delete this._valid;
		this.inputEl.blur();
		this._updateInput();
		this._updateValid();
	},
	
	_testChange: function() {
		var value = this.inputEl.val();
		if (this._editValue === value) {
			return;
		}
		this._editValue = value;
		this._updateInput();
		
		var message = this.validator(value);
		this._valid = !message;
		this._updateValid();
		if (!this._valid) {
			this.iconEl.attr("title", message);
		}
	},
	
	_updateInput: function() {
		this.inputEl.attr("size", this.inputEl.val().length + 1);
	},
	
	_updateValid: function() {
		this.iconEl.css("display", this._valid ? "none" : "");
	}
});
