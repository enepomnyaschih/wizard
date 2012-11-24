wizard.view.editor.Structure = JW.UI.Component.extend({
	/*
	Required
	wizard.view.editor.Element element; // Warning! This component won't be destroyed automatically
	
	Optional
	wizard.view.editor.List parentList;
	
	Fields
	wizard.lib.SynchedComponent lists;
	*/
	
	render: function() {
		this._super();
		this.element.parentStructure = this;
		this.addChild(this.element, "element");
		this.lists = new wizard.lib.SynchedComponent({
			collection     : this.element.lists,
			creator        : this._createList,
			scope          : this,
			renderParent   : this,
			renderPosition : "lists"
		});
	},
	
	destroy: function() {
		this.element.remove();
		this._super();
	},
	
	_createList: function(list) {
		list.parentStructure = this;
		return list;
	}
});
