wizard.model.clazz.Implements = JW.Collection.extend({ // <wizard.model.clazz.Implement>
	/*
	Fields
	wizard.model.Class clazz;
	*/
	
	init: function(clazz) {
		this._super();
		this.clazz = clazz;
	},
	
	addImplement: function( // wizard.model.clazz.Implement
		clazz, // wizard.model.Class
		index)
	{
		if (!JW.isSet(index)) {
			index = this.getLength();
		}
		var implement = new wizard.model.clazz.Implement(this.clazz, clazz);
		this.addItemAt(implement, index);
		return implement;
	},
	
	createItem: function(index) {
		this.addImplement(null, index);
	}
});
