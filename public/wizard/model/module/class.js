wizard.model.module.Kind["class"] = new wizard.model.module.Kind({
	id : "class"
});

wizard.model.module.Class = wizard.model.Module.extend({
	/*
	Fields
	clazz : wizard.model.Class
	*/
	
	kind : wizard.model.module.Kind["class"],
	
	init: function(clazz) {
		this.clazz = clazz;
	},
	
	triggerSelect: function() {
		this.clazz.trigger("selectedchange", true);
	},
	
	triggerUnselect: function() {
		this.clazz.trigger("selectedchange", false);
	}
});
