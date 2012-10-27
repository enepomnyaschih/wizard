wizard.view.editor.FocusManager = JW.ObservableConfig.extend({
	/*
	Fields
	wizard.view.editor.Element rootElement;
	wizard.view.editor.Element selectedElement;
	*/
	
	focus: function(element) {
		this._expandParents(element);
		this._collapseChildren(element);
	},
	
	focusRoot: function(element) {
	},
});
