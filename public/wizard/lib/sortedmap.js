wizard.lib.SortedMap = JW.Class.extend({
	/*
	//Events
	//add(JW.Event event, Integer index, String key, Object value);
	//remove(JW.Event event, Integer index, String key, Object value);
	//replace(JW.Event event, Integer index, String key, Object oldValue, Object newValue);
	//move(JW.Event event, Integer fromIndex, String fromKey, Integer toIndex, String toKey, Object value);
	//clear(JW.Event event);
	//reorder(JW.Event event);
	//filter(JW.Event event);
	//reset(JW.Event event);
	//change(JW.Event event);
	//lengthchange(JW.Event event, Integer length);
	
	Fields
	JW.Collection<String> keys;
	JW.Collection<Object> values;
	Map<Object> map;
	*/
	
	init: function() {
		this._super();
		this.keys = new JW.Collection();
		this.values = new JW.Collection();
		this.map = {};
	},
	
	// O(1), quick
	getLength: function() {
		return this.keys.getLength();
	},
	
	// O(1), quick
	isEmpty: function() {
		return this.keys.isEmpty();
	},
	
	// O(1), quick
	getKeyAt: function(index) {
		return this.keys.getItemAt(index);
	},
	
	// O(k log n), k - average length of key string, n - size of collection, quick
	getAt: function(index) {
		return this.values.getItemAt(index);
	},
	
	// O(k log n), quick
	get: function(key) {
		return this.map[key];
	},
	
	// O(k log n), quick
	indexOfKey: function(key) {
		return wizard.Util.binarySearch(this.keys.base, String(key));
	},
	
	// O(k n), slow
	indexOf: function(value) {
		return this.values.findBy("", value);
	},
	
	// O(k log n) in case of replacing, quick
	// O(k n) in case of insertion, slow
	set: function(key, value) {
		key = String(key);
		var index = this.indexOfKey(key);
		if (this.keys.getItemAt(index) === key) {
			this.map[key] = value;
			this.values.setItem(index, value);
			//this.trigger("replace", index, key, oldValue, value);
			//this.trigger("change");
		} else {
			this.map[key] = value;
			this.keys.addItemAt(key, index);
			this.values.addItemAt(value, index);
			//this.trigger("add", index, key, value);
			//this.trigger("change");
			//this.trigger("lengthchange", this.keys.length);
		}
	},
	
	// O(k n)
	del: function(key) {
		key = String(key);
		var index = this.indexOfKey(key);
		if (this.keys.getItemAt(index) !== key) {
			return;
		}
		delete this.map[key];
		this.keys.removeItemAt(index);
		this.values.removeItemAt(index);
		//this.trigger("remove", index, key, value);
		//this.trigger("change");
		//this.trigger("lengthchange", this.keys.length);
	},
	
	// O(k n)
	move: function(fromKey, toKey) {
		fromKey = String(fromKey);
		toKey = String(toKey);
		if (this.map.hasOwnProperty(toKey)) {
			return;
		}
		var fromIndex = this.indexOfKey(fromKey);
		if (this.keys.getItemAt(fromIndex) !== fromKey) {
			return;
		}
		var toIndex = this.indexOfKey(toKey);
		if (toIndex < fromIndex) {
			++toIndex;
		}
		this.map[toKey] = this.map[fromKey];
		delete this.map[fromKey];
		this.keys.move(fromIndex, toIndex);
		this.values.move(fromIndex, toIndex);
		//this.trigger("move", fromIndex, fromKey, toIndex, toKey, value);
		//this.trigger("change");
	},
	
	// O(n)
	clear: function()
	{
		this.map = {};
		this.keys.clear();
		this.values.clear();
		//this.trigger("clear");
		//this.trigger("change");
		//this.trigger("lengthchange");
	}
});

wizard.lib.IndexedSortedMap = wizard.lib.SortedMap.extend({
	/*
	Optional
	String keyField;
	*/
	
	keyField : "id",
	
	init: function(keyField) {
		if (JW.isSet(keyField)) {
			this.keyField = keyField;
		}
		this._super();
	},
	
	getKey: function(item) {
		return JW.get(item, this.keyField);
	},
	
	addItem: function(item) {
		this.set(this.getKey(item), item);
	},
	
	removeItem: function(item) {
		this.del(this.getKey(item));
	},
	
	updateItemKey: function(oldKey) {
		this.move(oldKey, this.getKey(this.get(oldKey)));
	},
	
	// override
	indexOf: function(item) {
		return this.indexOfKey(this.getKey(item));
	},
	
	reindex: function() {
		var items = JW.map(this.keys.base, function(key, index) {
			var value = this.values.getItemAt(index);
			return {
				key   : this.getKey(value),
				value : value
			};
		}, this);
		JW.Array.sortBy(items, "key");
		wizard.Util.replaceCollectionItems(this.keys, JW.mapBy(items, "key"));
		this.keys.triggerReset();
		wizard.Util.replaceCollectionItems(this.values, JW.mapBy(items, "value"));
		this.values.triggerReorder();
	}
});
