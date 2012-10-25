﻿wizard.lib.SynchedComponent = JW.UI.Component.extend({
	/*
	Optional
	JW.Collection<JW.UI.Component> collection;
	
	Fields
	wizard.lib.ComponentInsertSyncher syncher;
	*/
	
	render: function() {
		this._super();
		this._initSyncher();
	},
	
	destroyComponent: function() {
		this._doneSyncher();
		this._super();
	},
	
	setCollection: function(collection) {
		this._doneSyncher();
		this.collection = collection;
		this._initSyncher();
	},
	
	_initSyncher: function(form) {
		if (!this.collection) {
			return;
		}
		this.syncher = new wizard.lib.ComponentInsertSyncher({
			collection : this.collection,
			scope      : this
		});
	},
	
	_doneSyncher: function() {
		if (!this.collection) {
			return;
		}
		this.syncher.destroy();
		delete this.syncher;
		delete this.collection;
	}
});