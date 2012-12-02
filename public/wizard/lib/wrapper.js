wizard.lib.Wrapper = JW.Observable.extend({
	/*
	Events
	change(JW.Event event, Any oldValue, Any newValue);
	
	Fields
	Any value;
	*/
	
	init: function(value) {
		this._super();
		this.value = value;
	},
	
	set: function(value) {
		if (this.value === value) {
			return;
		}
		var oldValue = value;
		this.value = value;
		this.trigger("change", oldValue, value);
	}
});
