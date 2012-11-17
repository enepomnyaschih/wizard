wizard.view.editor.ListItem = wizard.view.editor.Structure.extend({
	/*
	Required
	wizard.view.editor.Element element;
	wizard.view.editor.IListCollection collection;
	*/
	
	render: function() {
		this._super();
		
		var self = this;
		this.addEl.click(function() {
			self.collection.createItem(self._getIndex() + 1);
		});
		this.remEl.click(function() {
			self.collection.removeItemAt(self._getIndex());
		});
	},
	
	_getIndex: function() {
		return JW.findBy(this.parent.plainChildren, "", this);
	}
});
