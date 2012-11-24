wizard.lib.SynchedComponent = JW.UI.Component.extend({
	/*
	Optional
	JW.Collection<Object> collection; // Warning! These components won't be destroyed automatically if destroyer is undefined
	JW.UI.Component creator(Object data); // By default, assumes that collection contains children to add
	void destroyer(JW.UI.Component child, Object data);
	Object scope; // By default, this
	
	Fields
	wizard.lib.ComponentSyncher syncher;
	*/
	
	render: function() {
		this._super();
		this._initSyncher();
	},
	
	destroy: function() {
		this._doneSyncher();
		this._super();
	},
	
	setCollection: function(collection) {
		this._doneSyncher();
		this.collection = collection;
		this._initSyncher();
	},
	
	_initSyncher: function() {
		if (!this.collection) {
			return;
		}
		this.syncher = new wizard.lib.ComponentSyncher({
			collection : this.collection,
			creator    : this.creator,
			destroyer  : this.destroyer,
			scope      : this.scope || this,
			target     : this
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
