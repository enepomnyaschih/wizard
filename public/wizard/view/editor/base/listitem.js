wizard.view.editor.ListItem = wizard.view.editor.Structure.extend({
	/*
	Required
	wizard.view.editor.Element element;
	wizard.view.editor.IListCollection collection;
	
	Fields
	wizard.view.editor.ButtonElement addElement;
	wizard.view.editor.ButtonElement remElement;
	*/
	
	render: function() {
		this._super();
		
		this.addElement = new wizard.view.editor.ButtonElement({
			editor          : this.editor,
			parentStructure : this,
			renderParent    : this,
			renderPosition  : "add"
		});
		this.remElement = new wizard.view.editor.ButtonElement({
			editor          : this.editor,
			parentStructure : this,
			renderParent    : this,
			renderPosition  : "rem"
		});
		
		var self = this;
		this.addElement.el.click(function() {
			self.collection.createItem(self._getIndex() + 1);
		});
		this.remElement.el.click(function() {
			self.collection.removeItemAt(self._getIndex());
		});
	},
	
	_getIndex: function() {
		return JW.findBy(this.parent.plainChildren, "", this);
	}
});
