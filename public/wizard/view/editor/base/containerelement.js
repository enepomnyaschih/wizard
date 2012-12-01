wizard.view.editor.ContainerElement = wizard.view.editor.Element.extend({
	/*
	Events
	formchange(JW.Event event, wizard.view.editor.Form form);
	
	Fields
	wizard.view.editor.Form form;
	
	Abstract methods
	wizard.view.editor.Form _createForm();
	*/
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-container-element");
		this._initForm();
		this.el.mousedown(JW.Function.inScope(this._preventMouseDownHandler, this));
		this.el.click(JW.Function.inScope(this._selectClickHandler, this));
	},
	
	destroyComponent: function() {
		this._doneForm();
		this._super();
	},
	
	focusIn: function() {
		var element = this._getFocusInElement();
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
		this.form.elements.each(function(element) {
			element.parentElement = this;
		}, this);
		this.addChild(this.form);
		this.form.lists.each(function(list) {
			this.lists.addItem(list);
		}, this);
	},
	
	_doneForm: function() {
		if (!this.form) {
			return;
		}
		this.lists.clear();
		this.form.destroy();
		delete this.form;
	},
	
	_getFocusInElement: function() {
		return this.form.elements.getItemAt(0);
	}
});
