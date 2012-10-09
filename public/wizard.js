var wizard = (function() {
	var _apply = "apply",
	    _constructor = "constructor",
	    _defineClass = "defineClass",
	    _init = "init",
	    _initialize = "initialize",
	    _instanceOf = "instanceOf",
	    _isExtend = "isExtend",
	    _length = "length",
	    _className = "className",
	    _pop = "pop",
	    _push = "push",
	    _split = "split",
	    _superclass = "superclass",
	    _Class = "Class",
	    __class = "_class",
	    __iid = "_iid",
	    $false = false,
	    $null = null,
	    $true = true,
	    $undefined = undefined,
	    $window = window,
	    $Error = Error,
	    classDefinitions = {},
	    lastIid = 0,
	    classes = {}; // null if initializing
	
	function apply(target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
	}
	
	function getVar(name) {
		var tokens = name[_split](".");
		var root = $window;
		for (var i = 0; i < tokens[_length]; ++i) {
			if (!root || (typeof root !== "object")) {
				return $undefined;
			}
			root = root[tokens[i]];
		}
		return root;
	}
	
	function setVar(name, value) {
		var tokens = name[_split](".");
		var root = $window;
		for (var i = 0; i < tokens[_length] - 1; ++i) {
			var token = tokens[i];
			root[token] = root[token] || {};
			root = root[token];
		}
		root[tokens[tokens[_length] - 1]] = value;
	}
	
	function newIid() {
		return ++lastIid;
	}
	
	function newClass() {
		var cls = function(constructorIndex, config, args) {
			var instance = {};
			instance[__class] = cls;
			var constructors = cls[_initialize](instance);
			apply(instance, config);
			constructors[constructorIndex][_apply](instance, args);
			return instance;
		};
		return cls;
	}
	
	function defineClass(clsName, supName, dependencies, clsFunc) {
		if (classDefinitions[clsName] !== $undefined) {
			throw new $Error("Can't define class '" + clsName + "': class with this name is already defined");
		}
		classDefinitions[clsName] = [
			supName,
			dependencies,
			clsFunc
		];
	}
	
	function init() {
		var dependencyStack = [];
		
		function initClass(clsName)
		{
			var cls = classes[clsName];
			if (cls === $null) {
				throw new $Error("Loop dependency detected while initializing class '" + clsName + "': " + dependencyStack.join(", "));
			}
			if (cls !== $undefined) {
				return cls;
			}
			if (getVar(clsName) !== $undefined) {
				throw new $Error("Can't define class '" + clsName + "': variable with this name is busy");
			}
			dependencyStack[_push](clsName);
			classes[clsName] = $null;
			var definition = classDefinitions[clsName];
			var supName = definition[0];
			var dependencies = definition[1];
			var clsFunc = definition[2];
			var funcArgs = [$null];
			var sup = initClass(supName);
			funcArgs[_push](sup);
			for (var i = 0; i < dependencies[_length]; ++i) {
				funcArgs[_push](initClass(dependencies[i]));
			}
			cls = newClass();
			funcArgs[0] = cls;
			var clsInitialize = clsFunc[_apply]($window, funcArgs);
			cls[_initialize] = function(instance) {
				return clsInitialize(instance, sup[_initialize](instance));
			};
			cls[_className] = clsName;
			cls[_superclass] = sup;
			setVar(clsName, cls);
			classes[clsName] = cls;
			dependencyStack[_pop]();
			return cls;
		}
		
		for (var name in classDefinitions) {
			initClass(name);
		}
		classDefinitions = {};
	}
	
	function isExtend(cls, sup) {
		while ($true) {
			if (cls === sup) {
				return $true;
			}
			if (cls === $undefined) {
				return $false;
			}
			cls = cls[_superclass];
		}
	}
	
	function instanceOf(instance, cls) {
		return isExtend(instance[__class], cls);
	}
	
	var Class = newClass();
	
	Class[_className] = "wizard.Class";
	Class[_initialize] = function(self) {
		self[__iid] = newIid();
		return [
			function() {}
		];
	};
	
	classes[Class[_className]] = Class;
	
	var result = {};
	result[_defineClass] = defineClass;
	result[_init] = init;
	result[_instanceOf] = instanceOf;
	result[_isExtend] = isExtend;
	result[_Class] = Class;
	return result;
})();
