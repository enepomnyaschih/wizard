wizard.view.editor.ClassGenericClassesForm = wizard.view.editor.Form.extend({
	/*
	Required
	wizard.model.Class clazz;
	
	Fields
	wizard.lib.CollectionSyncher syncher;
	*/
	
	title : "generic classes",
	
	render: function() {
		this._super();
		
		this.listItems = new JW.Collection();
		/*
		this.syncher = new wizard.lib.CollectionSyncher({
			collection : this.clazz.genericClasses,
			provider   : wizard.view.editor.GenericClassDefinitionElement,
			dataField  : "genericClass",
			
			extraCfg : {
				editor : this.editor,
				clazz  : this.clazz
			}
		});*/
	},
	
	// override
	_onAddClick: function() {
		this.clazz.genericClasses.addItem(new wizard.model.clazz.GenericClass());
	}
});
