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
	Function _bodyMouseDownHandler;
	Boolean _skipClickFocus;
	Boolean _activateMouseDown;
	*/
	
	_skipClickFocus    : false,
	_activateMouseDown : false,
	
	destroy: function() {
		this.blur();
		if (this.root) {
			JW.UI.bodyEl.unbind("click", this._bodyClickHandler);
			JW.UI.bodyEl.unbind("mousedown", this._bodyMouseDownHandler);
		}
		this._super();
	},
	
	setRoot: function(root) {
		if (this.root) {
			throw new Error("wizard.view.Editor instance is already assigned to root structure");
		}
		this.root = root;
		this._bodyClickHandler = JW.Function.inScope(this._onBodyClick, this);
		this._bodyMouseDownHandler = JW.Function.inScope(this._onBodyMouseDown, this);
		JW.UI.bodyEl.bind("click", this._bodyClickHandler);
		JW.UI.bodyEl.bind("mousedown", this._bodyMouseDownHandler);
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
			var structure, list;
			if (element.parentStructure) {
				if ((element === element.parentStructure.element) && element.parentStructure.remElement) {
					element.parentStructure.remElement.focus();
					return;
				}
				if (element === element.parentStructure.remElement) {
					element.parentStructure.addElement.focus();
					return;
				}
				var firstList = element.parentStructure.lists.plainChildren[0];
				if (firstList) {
					firstList.addElement.focus();
					return;
				}
				structure = element.parentStructure;
			} else if (element.parentList) {
				var firstChild = element.parentList.plainChildren[0];
				if (firstChild) {
					firstChild.element.focus();
					return;
				}
				list = element.parentList;
			} else {
				throw new Error("Element which doesn't have parent list or structure detected");
			}
			while (true) {
				if (structure) {
					if (!structure.parentList) {
						this.blur();
						return;
					}
					var found = false;
					var nextStructure;
					JW.some(structure.parentList.plainChildren, function(child) {
						if (found) {
							nextStructure = child;
							return true;
						}
						if (child === structure) {
							found = true;
						}
					}, this);
					if (nextStructure) {
						nextStructure.element.focus();
						return;
					} else {
						list = structure.parentList;
						structure = null;
					}
				} else {
					var found = false;
					var nextList;
					JW.some(list.parentStructure.lists.plainChildren, function(child) {
						if (found) {
							nextList = child;
							return true;
						}
						if (child === list) {
							found = true;
						}
					}, this);
					if (nextList) {
						nextList.addElement.focus();
						return;
					} else {
						structure = list.parentStructure;
						list = null;
					}
				}
			}
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
	
	activateMouseDown: function() {
		if (this._activateMouseDown) {
			return;
		}
		this._activateMouseDown = true;
		var self = this;
		setTimeout(function() {
			self._activateMouseDown = false;
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
	},
	
	// TODO: focus on mousedown instead of click (typical HTML inputs do so, and it will prevent some unexpected bugs)
	_onBodyMouseDown: function(event) {
		if (this._activateMouseDown) {
			this._activateMouseDown = false;
		}
	}
});

wizard.view.editor = {};
