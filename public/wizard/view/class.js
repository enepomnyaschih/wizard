wizard.view.Class = wizard.view.Module.extend({
	/*
	Required options
	wizard.model.Class module;
	
	Fields
	wizard.view.editor.ClassDefinitionElement element;
	wizard.view.editor.Structure structure;
	wizard.view.Editor editor;
	*/
	
	render: function() {
		this._super();
		this.deleteEl.click(JW.Function.inScope(this._onDeleteClick, this));
		this.editor = new wizard.view.Editor({
			model : this.model
		});
		this.element = new wizard.view.editor.ClassDefinitionElement({
			model  : this.model,
			clazz  : this.module,
			editor : this.editor
		});
		this.structure = new wizard.view.editor.Structure({
			element        : this.element,
			renderParent   : this,
			renderPosition : "structure"
		});
		this.editor.setRoot(this.structure);
	},
	
	afterAppend: function() {
		this._super();
		this.element.focus();
	},
	
	destroyComponent: function() {
		this.editor.destroy();
		this._super();
	},
	
	_onDeleteClick: function() {
		this.module.remove();
	}
});
