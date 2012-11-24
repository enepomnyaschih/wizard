wizard.view.editor.ButtonElement = wizard.view.editor.Element.extend({
	/*
	Fields
	Element dummyInputEl;
	*/
	
	render: function() {
		this._super();
		this.el.mousedown(JW.Function.inScope(this._preventMouseDownHandler, this));
		this.el.click(JW.Function.inScope(this._blockClickHandler, this));
	},
	
	destroyComponent: function() {
		if (this.dummyInputEl) {
			this.dummyInputEl.remove();
		}
		this._super();
	},
	
	_updateFocused: function() {
		this._super();
		if (this.focused) {
			this.dummyInputEl = jQuery('<input type="text" class="wizard-dummy-input" />');
			this.dummyInputEl.css("top", this.el.offset().top + "px");
			this.dummyInputEl.keydown(JW.Function.inScope(this._onInputKeyDown, this));
			JW.UI.bodyEl.append(this.dummyInputEl);
			this.dummyInputEl.focus();
		} else {
			this.dummyInputEl.remove();
			delete this.dummyInputEl;
		}
	},
	
	_onInputKeyDown: function(event) {
		switch (event.which) {
			case 9:
				event.preventDefault();
				this.editor.focusNext(this);
				break;
		}
	}
});
