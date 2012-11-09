wizard.view.editor.line.List = wizard.lib.SynchedComponent.extend({
	/*
	Optional
	JW.Collection<wizard.view.editor.Form> forms;
	
	Fields
	wizard.lib.CollectionSyncher formSyncher;
	*/
	
	initComponent: function() {
		this.collection = new JW.Collection();
		this._super();
	},
	
	render: function() {
		this._super();
		this._initFormSyncher();
	},
	
	destroyComponent: function() {
		this._initFormSyncher();
		this._super();
	},
	
	setForms: function(forms) {
		this._doneFormSyncher();
		this.forms = forms;
		this._initFormSyncher();
	},
	
	_initFormSyncher: function() {
		if (!this.forms) {
			return;
		}
		this.formSyncher = new wizard.lib.CollectionSyncher({
			collection : this.forms,
			target     : this.collection,
			provider   : wizard.view.editor.Line,
			dataField  : "form"
		});
	},
	
	_doneFormSyncher: function() {
		if (!this.forms) {
			return;
		}
		this.formSyncher.destroy();
		delete this.formSyncher;
		delete this.forms;
	}
});
