wizard.model.module.Kind["class"] = new wizard.model.module.Kind({
	id : "class"
});

/*
interface wizard.model.IClassConfig {
	Optional
	String name; // auto-generated if missing
	wizard.model.clazz.Kind classKind;
	wizard.model.Class extendz; // default value is saved in wizard.Model field
}
*/

wizard.model.Class = wizard.model.Module.extend({
	/*
	Event
	classkindchange(JW.Event event, wized.model.clazz.Kind value);
	
	Optional
	wizard.model.clazz.Kind classKind;
	wizard.model.Class extendz; // can be null for inheritance root only
	
	Fields
	wizard.model.clazz.Generics generics;
	JW.Collection<wizard.model.clazz.Interface> implementz;
	JW.Collection<wizard.model.clazz.StaticField> staticFields;
	JW.Collection<wizard.model.clazz.Field> fields;
	JW.Collection<wizard.model.clazz.Constructor> constructors;
	JW.Collection<wizard.model.clazz.Method> methods;
	JW.Collection<wizard.model.clazz.StaticMethod> staticMethods;
	*/
	
	moduleKind : wizard.model.module.Kind["class"],
	
	init: function(config) {
		this._super(config);
		this.generics = new wizard.model.clazz.Generics(this);
		this.implementz = new JW.Collection();
		this.staticFields = new JW.Collection();
		this.fields = new JW.Collection();
		this.constructors = new JW.Collection();
		this.methods = new JW.Collection();
		this.staticMethods = new JW.Collection();
		this.updateNames();
	},
	
	createModuleView: function(model) {
		return new wizard.view.Class({
			model  : model,
			module : this
		});
	}
});

wizard.Util.addProperty(wizard.model.Class, null, "classKind");

wizard.model.clazz = {};
