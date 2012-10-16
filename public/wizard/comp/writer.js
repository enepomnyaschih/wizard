wizard.comp.Writer = JW.Class.extend({
	/*
	Fields
	_buf    : Array of String
	_tab    : Array of String
	_ln     : Boolean
	_nameCt : Map<Boolean>
	*/
	
	init: function() {
		this._buf    = [];
		this._tab    = [];
		this._ln     = true;
		this._nameCt = {};
		
		var reservedWords = [
			"break", "case", "catch", "continue", "debugger", "default", "delete", "do", "else", "finally", "for",
			"function", "if", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var",
			"void", "while", "with"
		];
		
		for (var i = 0; i < reservedWords.length; ++i) {
			this._nameCt[reservedWords[i]] = true;
		}
	},
	
	write: function(s) {
		if (arguments.length !== 1) {
			for (var i = 0; i < arguments.length; ++i) {
				this.write(arguments[i]);
			}
			return;
		}
		
		if (this._ln) {
			this._buf.push(this._tab.join(""));
			this._ln = false;
		}
		
		this._buf.push(s);
	},
	
	writeln: function() {
		this.write.apply(this, arguments);
		this._buf.push('\n');
		this._ln = true;
	},
	
	tab: function(callback, scope) {
		this._tab.push("\t");
		callback.call(scope);
		this._tab.pop();
	},
	
	define: function(names, callback, scope) {
		var abbr = [];
		for (var i = 0; i < names.length; ++i) {
			var name = names[i];
			var suffix = "";
			if (this._nameCt[name]) {
				var j = 0;
				do {
					++j;
					suffix = "$" + j;
				} while (this._nameCt[name + suffix]);
			}
			
			abbr[i] = name + suffix;
			this._nameCt[name + suffix] = true;
		}
		
		callback.apply(scope, names);
		
		for (var i = 0; i < abbr.length; ++i) {
			this._nameCt[abbr[i]] = false;
		}
	}
});

wizard.comp = {};
