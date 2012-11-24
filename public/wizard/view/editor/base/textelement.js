﻿wizard.view.editor.TextElement = wizard.view.editor.Element.extend({
	/*
	Required
	void applier(String value);
	Object scope;
	
	Optional
	String value;
	String validator(String value);
	
	Fields
	String _editValue;
	Integer _changeTimer;
	Boolean _valid;
	*/
	
	value  : "",
	_valid : true,
	
	render: function() {
		this._super();
		this.textEl.text(this.value);
		this.inputEl.bind("change", JW.Function.inScope(this._testChange, this));
		this.inputEl.bind("keydown", JW.Function.inScope(this._onKeyDown, this));
		this.textEl.click(JW.Function.inScope(this._selectClickHandler, this));
		this.inputBoxEl.click(JW.Function.inScope(this._blockClickHandler, this));
	},
	
	_commit: function() {
		if (!this._changeTimer || !this._valid) {
			return;
		}
		this.value = this._editValue;
		this.textEl.text(this.value);
		this.applier.call(this.scope || this, this.value);
		this.inputEl.select();
	},
	
	_revert: function() {
		if (!this._changeTimer) {
			return;
		}
		this.inputEl.val(this.value);
		this._testChange();
		this.inputEl.select();
	},
	
	_updateFocused: function() {
		this._super();
		if (this.focused) {
			this._beginEdit();
		} else {
			if (this._valid) {
				this._commit();
			}
			this._endEdit();
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
		this.textEl.hide();
		this.inputBoxEl.show();
		this.inputEl.val(this.value);
		this.inputEl.focus();
		this.inputEl.select();
		this._editValue = null;
		this._testChange();
		this._changeTimer = setInterval(JW.Function.inScope(this._testChange, this), 10);
	},
	
	_endEdit: function() {
		if (!this._changeTimer) {
			return;
		}
		clearInterval(this._changeTimer);
		delete this._editValue;
		delete this._changeTimer;
		delete this._valid;
		this.inputBoxEl.hide();
		this.textEl.show();
	},
	
	_testChange: function() {
		var value = this.inputEl.val();
		if (this._editValue === value) {
			return;
		}
		this._editValue = value;
		this.inputEl.attr("size", value.length + 1);
		
		var message;
		if (this.validator) {
			message = this.validator.call(this.scope || this, value);
		}
		this._valid = !message;
		this.iconEl.css("display", this._valid ? "none" : "");
		if (!this._valid) {
			this.iconEl.attr("title", message);
		}
	}
});
