wizard.view.picker.Name = wizard.view.Picker.extend({
	/*
	Optional options
	String value;
	
	Fields
	Integer _changeTimer;
	
	Abstract methods
	String validator(String value);
	void applier(String value);
	*/
	
	value : "",
	
	render: function() {
		this._super();
		
		this.inputEl.bind("focus", JW.Function.inScope(this._onFocus, this));
		this.inputEl.bind("blur", JW.Function.inScope(this._onBlur, this));
		this.inputEl.bind("change", JW.Function.inScope(this._testChange, this));
		this.inputEl.bind("keydown", JW.Function.inScope(this._onKeyDown, this));
	},
	
	focus: function() {
		this.inputEl.focus();
	},
	
	_onFocus: function() {
		this._doneChangeTimer();
		this._initChangeTimer();
	},
	
	_onBlur: function() {
		this._doneChangeTimer();
	},
	
	_initChangeTimer: function() {
		this._changeTimer = setInterval(JW.Function.inScope(this._testChange, this), 40);
	},
	
	_doneChangeTimer: function() {
		if (!this._changeTimer) {
			return;
		}
		clearInteval(this._changeTimer);
		delete this._changeTimer;
	},
	
	_testChange: function() {
		var value = this.inputEl.val();
		if (this.value === value) {
			return;
		}
		var message = this.validator(value);
		this.iconEl.css("display", message ? "" : "none");
		if (message) {
			this.iconEl.attr("title", message);
		}
		this.inputEl.attr("size", value.length() + 2);
	},
	
	_onKeyDown: function(event) {
	}
});
