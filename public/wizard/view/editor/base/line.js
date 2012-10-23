wizard.view.editor.Line = JW.UI.Component.extend({
	/*
	Optional
	wizard.view.editor.Element element;
	wizard.view.editor.Form form;
	
	Fields
	wizard.lib.SynchedComponent children;
	wizard.lib.SynchedComponent listItems;
	*/
	
	render: function() {
		this._super();
		
		if (this.element) {
			this.addChild(this.element, "item");
			this.form = this.element.form;
			this.element.bind("formchange", this._onElementFormChange, this);
		}
		
		this.children = new wizard.lib.SynchedComponent({
			renderParent   : this,
			renderPosition : "children"
		});
		
		this.listItems = new wizard.lib.SynchedComponent({
			renderParent   : this,
			renderPosition : "list-items"
		});
		
		this._initForm();
	},
	
	destroyComponent: function() {
		this._doneForm();
		this.element.purge(this);
		
		this._super();
	},
	
	_onElementFormChange: function() {
		if (this.form === this.element.form) {
			return;
		}
		this._doneForm();
		this.form = this.element.form;
		this._initForm();
	},
	
	_initForm: function() {
		if (!this.form) {
			return;
		}
		this.addEl.css("display", this.form.listItems ? "" : "none");
		this.children.setCollection(this.form.children);
		this.listItems.setCollection(this.form.listItems);
	},
	
	_doneForm: function() {
		if (!this.form) {
			return;
		}
		this.addEl.css("display", "none");
		this.children.setCollection(null);
		this.listItems.setCollection(null);
		delete this.form;
	}
});
