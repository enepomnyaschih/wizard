/*
	Focus model public interface:
	wizard.view.editor.Element:focus;
	wizard.view.editor.ContainerElement:focusIn;
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
	wizard.view.editor.Structure root;
	wizard.view.editor.Element focusedElement;
	*/
	
	destroy: function() {
		this.blur();
		this._super();
	},
	
	setRoot: function(root) {
		// assert !this.root;
		this.root = root;
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
		if (this._focusTimer) {
			clearTimeout(this._focusTimer);
			delete this._focusTimer;
		}
		if (!this.focusedElement) {
			return;
		}
		this.focusedElement.onBlur();
		this._collapse();
		delete this.focusedElement;
	},
	
	focusNext: function(element) {
	},
	
	focusPrev: function(element) {
	},
	
	issueFocus: function(element) {
		if (this._focusTimer) {
			clearTimeout(this._focusTimer);
		}
		this._focusTimer = setTimeout(function() {
			if (element.el) {
				element.doFocus();
			}
		}, 1);
	},
	
	_getExpandingBranch: function(element) {
		var branch = [];
		if (element.expanded) {
			return branch;
		}
		branch.push(element);
		while (element.parentElement && !element.parentElement.expanded) {
			element = element.parentElement;
			branch.push(element);
		}
		branch.reverse();
		return branch;
	},
	
	_collapse: function(rootElement) {
		var element = this.focusedElement;
		while (element && (element !== rootElement)) {
			element.setExpanded(false);
			element = element.parentElement;
		}
	}
});

wizard.view.editor = {};
