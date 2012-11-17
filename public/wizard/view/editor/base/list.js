wizard.view.editor.List = wizard.lib.SynchedComponent.extend({
	/*
	Required
	String title;
	wizard.view.Editor editor;
	wizard.view.editor.IListCollection collection;
	Subclass<wizard.view.editor.Element> provider;
	
	Optional
	String dataField;
	Object extraCfg;
	*/
	
	childBox  : "items",
	dataField : "data",
	
	render: function() {
		this._super();
		this.titleEl.text(this.title);
		
		var collection = this.collection;
		this.addEl.click(function() {
			collection.createItem(0);
		});
	},
	
	creator: function(data) {
		return new wizard.view.editor.ListItem({
			element    : this._createElement(data),
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
