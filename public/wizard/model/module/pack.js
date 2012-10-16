wizard.model.module.Kind.pack = new wizard.model.module.Kind({
	id : "pack"
});

wizard.model.module.Pack = wizard.model.Module.extend({
	/*
	Fields
	pack : wizard.model.Pack
	*/
	
	kind : wizard.model.module.Kind.pack,
	
	init: function(pack) {
		this.pack = pack;
	},
	
	triggerSelect: function() {
		this.pack.trigger("selectedchange", true);
	},
	
	triggerUnselect: function() {
		this.pack.trigger("selectedchange", false);
	}
});
