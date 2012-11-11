wizard.view.editor.Structure = JW.UI.Component.extend({
	/*
	Required
	wizard.view.editor.Element element; // Warning! This component won't be destroyed automatically
	
	Fields
	wizard.lib.SynchedComponent lists;
	*/
	
	render: function() {
		this._super();
		this.addChild(this.element, "element");
		this.lists = new wizard.lib.SynchedComponent({
			collection     : this.element.lists,
			renderParent   : this,
			renderPosition : "lists"
		});
	},
	
	destroy: function() {
		this.element.remove();
		this._super();
	}
});
