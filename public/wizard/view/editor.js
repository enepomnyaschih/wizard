/*
	Focus model public interface:
	wizard.view.editor.Element:focus;
	wizard.view.editor.MenuElement:focusIn;
	wizard.view.Editor:blur;
	wizard.view.Editor:issueBlur;
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
		clearTimeout(this._blurTimer);
		this.blur();
		this._super();
	},
	
	setRoot: function(root) {
		// assert !this.root;
		this.root = root;
	},
	
	findClickableElement: function(element) {
		while (element.parentElement && !element.parentElement.expanded) {
			element = element.parentElement;
		}
		return element;
	},
	
	onFocus: function(element) {
		clearTimeout(this._blurTimer);
		this._lock = true;
		if (this.focusedElement) {
			this.focusedElement.onBlur();
		}
		var branch = this._getExpandingBranch(element);
		var rootElement = branch[0] || element;
		this._collapse(rootElement);
		JW.eachByMethod(branch, "setExpanded", [ true ]);
		this.focusedElement = element;
		delete this._lock;
	},
	
	blur: function() {
		clearTimeout(this._blurTimer);
		if (!this.focusedElement || this._lock) {
			return;
		}
		this._lock = true;
		this.focusedElement.onBlur();
		this._collapse();
		delete this.focusedElement;
		delete this._lock;
	},
	
	issueBlur: function() {
		if (this._lock || this._blurTimer) {
			return;
		}
		this._blurTimer = setTimeout(JW.Function(this.blur, this), 1);
	},
	
	focusNext: function() {
		clearTimeout(this._blurTimer);
		if (this._lock) {
			return;
		}
		this._lock = true;
		delete this._lock;
	},
	
	focusPrev: function() {
		clearTimeout(this._blurTimer);
		if (this._lock) {
			return;
		}
		this._lock = true;
		delete this._lock;
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
