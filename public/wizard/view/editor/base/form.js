wizard.view.editor.Form = JW.UI.Component.extend({
	/*
	Required
	wizard.view.Editor editor;
	
	Optional
	string title;
	
	Fields
	JW.Collection<wizard.view.editor.Element> elements;
	JW.Collection<wizard.view.editor.Form> children;
	JW.Collection<wizard.view.editor.Element> listItems;
	*/
	
	isList : false,
	
	render: function() {
		this._super();
		
		this.el.addClass("wizard-editor-form");
		
		this.elements = new JW.Collection(this._createElements());
		this.children = new JW.Collection(this._createChildren());
		
		if (this.title) {
			this.el.text(this.title);
		}
	},
	
	_createElements: function() {
		return [];
	},
	
	_createChildren: function() {
		return [];
	},
	
	_onAddClick: function() {
	}
});
