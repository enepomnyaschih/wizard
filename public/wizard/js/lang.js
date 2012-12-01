wizard.js.Lang = wizard.model.Project.extend({
	id       : "lang",
	rootName : "com.wizard.js",
	
	init: function(config) {
		this._super(config);
		var langPack = this.rootPack.addPack({
			name : "lang"
		});
		langPack.addClass({
			name      : "primitive",
			classKind : wizard.model.clazz.Kind.items["primitive"]
		});
		langPack.addClass({
			name      : "void",
			classKind : wizard.model.clazz.Kind.items["primitive"],
			extendz   : langPack.classes.get("primitive")
		});
		langPack.addClass({
			name      : "number",
			classKind : wizard.model.clazz.Kind.items["primitive"],
			extendz   : langPack.classes.get("primitive")
		});
		langPack.addClass({
			name      : "boolean",
			classKind : wizard.model.clazz.Kind.items["primitive"],
			extendz   : langPack.classes.get("primitive")
		});
		langPack.addClass({
			name      : "string",
			classKind : wizard.model.clazz.Kind.items["primitive"],
			extendz   : langPack.classes.get("primitive")
		});
		langPack.addClass({
			name      : "IObject",
			classKind : wizard.model.clazz.Kind.items["interface"],
			extendz   : langPack.classes.get("primitive")
		});
		langPack.addClass({
			name      : "INumber",
			classKind : wizard.model.clazz.Kind.items["interface"],
			extendz   : langPack.classes.get("primitive")
			// implementz IObject
		});
		langPack.addClass({
			name      : "IBoolean",
			classKind : wizard.model.clazz.Kind.items["interface"],
			extendz   : langPack.classes.get("primitive")
			// implementz IObject
		});
		langPack.addClass({
			name      : "IString",
			classKind : wizard.model.clazz.Kind.items["interface"],
			extendz   : langPack.classes.get("primitive")
			// implementz IObject
		});
		langPack.addClass({
			name      : "Object",
			classKind : wizard.model.clazz.Kind.items["abstract"],
			extendz   : langPack.classes.get("primitive")
			// implementz IObject
		});
		langPack.addClass({
			name      : "Number",
			classKind : wizard.model.clazz.Kind.items["regular"],
			extendz   : langPack.classes.get("Object")
			// implementz INumber
		});
		langPack.addClass({
			name      : "Boolean",
			classKind : wizard.model.clazz.Kind.items["regular"],
			extendz   : langPack.classes.get("Object")
			// implementz IBoolean
		});
		langPack.addClass({
			name      : "String",
			classKind : wizard.model.clazz.Kind.items["regular"],
			extendz   : langPack.classes.get("Object")
			// implementz IString
		});
	}
});
