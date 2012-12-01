/*
interface wizard.model.clazz.IGenericConfig {
	String name;
	wizard.model.Class extendz;
}
*/

wizard.model.clazz.Generic = JW.ObservableConfig.extend({
	/*
	Events
	namechange(JW.Event event, String oldValue, String newValue);
	extendzchange(JW.Event event, wizard.model.Class oldValue, wizard.model.Class newValue);
	
	Required
	wizard.model.Class clazz;
	String name;
	wizard.model.Class extendz;
	*/
});

wizard.Util.addProperty(wizard.model.clazz.Generic, String, "name");
wizard.Util.addProperty(wizard.model.clazz.Generic, null, "extendz");
