var model, view;

jQuery(function() {
	model = new wizard.Model();
	
	view = new wizard.View({
		model    : model,
		renderTo : "body"
	});
});
