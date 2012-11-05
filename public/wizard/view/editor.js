/*
	Focus model public interface:
	wizard.view.editor.Element:focus;
	wizard.view.Editor:blur;
	wizard.view.Editor:focusNext;
	wizard.view.Editor:focusPrev;
	
	There is no public expand model - it is managed automatically via focus model.
*/

wizard.view.Editor = JW.ObservableConfig.extend({
	/*
	Required
	wizard.Model model;
	
	Fields
	wizard.view.editor.Element rootElement;
	wizard.view.editor.Element focusedElement;
	*/
	
	setRootElement: function(element) {
		// assert !this.rootElement;
		this.rootElement = element;
	},
	
	findClickableElement: function(element) {
		while (element.parent && !element.parent.expanded) {
			element = element.parent;
		}
		return element;
	},
	
	onFocus: function(element) {
		if (this.focusedElement) {
			this.focusedElement.onBlur();
		}
		var branch = this._getExpandingBranch(element);
		var rootElement = branch[0] || element;
		this._collapse(rootElement);
		JW.eachByMethod(branch, "setExpanded", [ true ]);
		this.focusedElement = element;
	},
	
	blur: function() {
		if (!this.focusedElement) {
			return;
		}
		this.focusedElement.onBlur();
		this._collapse();
		delete this.focusedElement;
	},
	
	focusNext: function() {
		
	},
	
	focusPrev: function() {
		
	},
	
	_getExpandingBranch: function(element) {
		var branch = [];
		if (element.expanded) {
			return branch;
		}
		branch.push(element);
		while (element.parent && !element.parent.expanded) {
			element = element.parent;
			branch.push(element);
		}
		branch.reverse();
		return branch;
	},
	
	_collapse: function(rootElement) {
		if (!this.focusedElement || (this.focusedElement === rootElement)) {
			return;
		}
		var element = this.focusedElement.parent;
		while (element && (element !== rootElement)) {
			element.setExpanded(false);
			element = element.parent;
		}
	}
});

wizard.view.editor = {};
