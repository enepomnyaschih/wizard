wizard.view.editor.ClassDefinitionElement = wizard.view.editor.MenuElement.extend({
	/*
	Required
	wizard.model.Class clazz;
	*/
	
	render: function() {
		this._super();
		this.clazz.bind("classkindchange", this._updateForm, this);
	},
	
	destroyComponent: function() {
		this.clazz.purge(this);
		this._super();
	},
	
	// override
	_createForm: function() {
		if (!this.clazz.classKind) {
			return new wizard.view.editor.Form({
				editor : this.editor,
				title  : "(select)"
			});
		}
		return new wizard.view.editor.ClassDefinitionForm({
			editor : this.editor,
			clazz  : this.clazz
		});
	},
	
	// override
	_isValid: function() {
		return JW.isSet(this.clazz.classKind);
	},
	
	// override
	_createOptions: function() {
		var kinds = JW.getValuesArray(wizard.model.clazz.Kind.items);
		kinds = JW.filterBy(kinds, "visible", true);
		return JW.map(kinds, this._createDropdownOption, this);
	},
	
	// override
	_getMenuValue: function() {
		return this.clazz.classKind ? this.clazz.classKind.id : null;
	},
	
	_createDropdownOption: function(kind) {
		var self = this;
		return new wizard.view.editor.MenuOption({
			label   : kind.name,
			value   : kind.id,
			applier : function() {
				self.clazz.setClassKind(kind);
			}
		});
	},
	
	// override
	_getFocusInElement: function() {
		return this.form.nameElement;
	}
});
