wizard.view.editor.FormElement = wizard.view.editor.ContainerElement.extend({
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
			JW.UI.bodyEl.append(this.dummyInputEl);
			this.dummyInputEl.focus();
		} else {
			this.dummyInputEl.remove();
			delete this.dummyInputEl;
		}
	}
});
