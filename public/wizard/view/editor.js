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
	Function _bodyClickHandler;
	Boolean _skipClickFocus;
	*/
	
	_skipClickFocus : false,
	
	destroy: function() {
		this.blur();
		if (this.root) {
			JW.UI.bodyEl.unbind("click", this._bodyClickHandler);
		}
		this._super();
	},
	
	setRoot: function(root) {
		if (this.root) {
			throw new Error("wizard.view.Editor instance is already assigned to root structure");
		}
		this.root = root;
		this._bodyClickHandler = JW.Function.inScope(this._onBodyClick, this);
		JW.UI.bodyEl.bind("click", this._bodyClickHandler);
	},
	
	onFocus: function(element) {
		if (this.focusedElement) {
			this.focusedElement.onBlur();
		}
		var branch = this._getExpandingBranch(element);
		if (branch[0]) {
			this._collapse(branch[0].parentElement);
			JW.eachByMethod(branch, "setExpanded", [ true ]);
		} else {
			// In this case, some expanded element is being focused
			this._collapse(element);
		}
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
		if (!element.parentElement) {
			this.blur();
			return;
		}
		var found = false;
		var nextElement;
		element.parentElement.form.elements.some(function(child) {
			if (found) {
				nextElement = child;
				return true;
			}
			if (child === element) {
				found = true;
			}
		}, this);
		if (nextElement) {
			nextElement.focus();
		} else {
			this.focusNext(element.parentElement);
		}
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
	
	skipClickFocus: function() {
		if (this._skipClickFocus) {
			return;
		}
		this._skipClickFocus = true;
		var self = this;
		setTimeout(function() {
			self._skipClickFocus = false;
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
	},
	
	_onBodyClick: function() {
		if (this._skipClickFocus) {
			this._skipClickFocus = false;
		} else {
			this.blur();
		}
	}
});

wizard.view.editor = {};
