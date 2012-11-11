wizard.view.editor.List = wizard.lib.SynchedComponent.extend({
	/*
	Required
	String title;
	wizard.view.editor.IListCollection collection;
	*/
	
	childBox : "items",
	
	render: function() {
		this._super();
		this.titleEl.text(this.title);
		
		var collection = this.collection;
		this.addEl.click(function() {
			collection.createElement(0);
		});
	},
	
	creator: function(element) {
		return new wizard.view.editor.ListItem({
			element    : element,
			collection : this.collection
		});
	},
	
	destroyer: function(item) {
		item.destroy();
	}
});

/*
interface wizard.view.editor.IListCollection extends JW.ICollection<wizard.view.editor.Element> {
	void createElement(Integer index);
}
*/
