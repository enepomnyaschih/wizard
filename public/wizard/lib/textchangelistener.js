wizard.lib.TextChangeListener = JW.ObservableConfig.extend({
	/*
	Events
	change(JW.Event event, String value);
	
	Required
	Element el;
	
	Fields
	String _value;
	Function _focusHandler;
	Function _blurHandler;
	Function _changeHandler;
	Integer _changeTimer;
	*/
	
	init: function(config) {
		this._super(config);
		this._value = this.el.val();
		this._focusHandler   = JW.Function.inScope(this._onFocus,    this);
		this._blurHandler    = JW.Function.inScope(this._onBlur,     this);
		this._changeHandler  = JW.Function.inScope(this._testChange, this);
		this.el.bind("focus",   this._focusHandler);
		this.el.bind("blur",    this._blurHandler);
		this.el.bind("change",  this._changeHandler);
		this.el.bind("keydown", this._changeHandler);
	},
	
	destroyComponent: function() {
		clearInterval(this._changeTimer);
		this.el.unbind("focus",   this._focusHandler);
		this.el.unbind("blur",    this._blurHandler);
		this.el.unbind("change",  this._changeHandler);
		this.el.unbind("keydown", this._changeHandler);
		this._super();
	},
	
	_onFocus: function() {
		if (this._changeTimer) {
			return;
		}
		this._changeTimer = setInterval(JW.Function.inScope(this._testChange, this), 10);
	},
	
	_onBlur: function() {
		this._testChange();
		if (!this._changeTimer) {
			return;
		}
		clearInterval(this._changeTimer);
		delete this._changeTimer;
	},
	
	_testChange: function() {
		var value = this.el.val();
		if (this._value === value) {
			return;
		}
		this._value = value;
		this.trigger("change", value);
	}
});
