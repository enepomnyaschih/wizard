﻿wizard.view.editor.FormElement = wizard.view.editor.ContainerElement.extend({
	/*
	Fields
	Element dummyInputEl;
	*/
	
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
