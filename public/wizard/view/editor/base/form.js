wizard.view.editor.Form = JW.UI.Component.extend({
	/*
	Required
	wizard.Model model;
	
	Optional
	boolean isList;
	string title;
	
	Fields
	Array<wizard.view.editor.Element> elements;
	Array<wizard.view.editor.Form> children;
	JW.Collection<wizard.view.editor.Element> listItems;
	
	Abstract methods
	Array<wizard.view.editor.Element> _createElements();
	Array<wizard.view.editor.Form> _createChildren();
	*/
	
	isList : false,
	
	render: function() {
		this._super();
		
		this.elements = this._createElements();
		this.children = this._createChildren();
		
		if (this.title) {
			this.el.text(this.title);
		}
	},
	
	_createElements: function() {
		return [];
	},
	
	_createChildren: function() {
		return [];
	}
});
