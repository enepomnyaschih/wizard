wizard.view.editor.List = wizard.lib.SynchedComponent.extend({
	/*
	Required
	String title;
	wizard.view.Editor editor;
	wizard.view.editor.IListCollection collection;
	Subclass<wizard.view.editor.Element> provider;
	wizard.view.editor.Structure parentStructure;
	
	Optional
	String dataField;
	Object extraCfg;
	
	Fields
	wizard.view.editor.ButtonElement addElement;
	*/
	
	childBox  : "items",
	dataField : "data",
	
	render: function() {
		this._super();
		this.titleEl.text(this.title);
		
		this.addElement = new wizard.view.editor.ButtonElement({
			editor         : this.editor,
			parentList     : this,
			renderParent   : this,
			renderPosition : "add"
		});
		
		var collection = this.collection;
		this.addElement.el.click(function() {
			collection.createItem(0);
		});
	},
	
	creator: function(data) {
		return new wizard.view.editor.ListItem({
			editor     : this.editor,
			element    : this._createElement(data),
			parentList : this,
			collection : this.collection
		});
	},
	
	destroyer: function(item) {
		item.destroy();
	},
	
	_createElement: function(data) {
		var config = JW.apply({ editor : this.editor }, this.extraCfg);
		config[this.dataField] = data;
		return new this.provider(config);
	}
});

/*
interface wizard.view.editor.IListCollection extends JW.ICollection {
	void createItem(Integer index);
}
*/
