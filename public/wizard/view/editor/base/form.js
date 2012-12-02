wizard.view.editor.Form = JW.UI.Component.extend({
	/*
	Required
	wizard.view.Editor editor;
	
	Optional
	String title;
	String tooltip;
	
	Fields
	JW.Collection<wizard.view.editor.Element> elements;
	JW.Collection<wizard.view.editor.List> lists;
	*/
	
	isList : false,
	
	render: function() {
		this._super();
		this.el.addClass("wizard-editor-form");
		this.elements = new JW.Collection(this._createElements());
		this.lists = new JW.Collection(this._createLists());
		if (this.title) {
			this.el.text(this.title);
		}
		if (this.tooltip) {
			this.el.attr("title", this.tooltip);
		}
	},
	
	_createElements: function() {
		return [];
	},
	
	_createLists: function() {
		return [];
	}
});
