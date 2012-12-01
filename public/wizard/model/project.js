// TODO: Introduce wizard.lib.SynchedSortedMap to simplify project elements
// TODO: Introduce wizard.lib.IndexedMap to improve all-dependencies performance
// TODO: Introduce bulk "add" and "remove" collection events to improve initialization performance
// TODO: Rebase wizard.lib.SortedMap on binary tree to improve performance

wizard.model.Project = JW.ObservableConfig.extend({
	/*
	Events
	rootnamechange(JW.Event event, String oldValue, String newValue);
	
	Required
	wizard.Model model;
	String id;
	String rootName;
	
	Fields
	wizard.model.project.Classes classes; // only in this project, indexed by projectName
	wizard.model.project.AllClasses allClasses; // indexed by fullName
	
	wizard.model.project.Packs packs; // only in this project, indexed by projectName
	wizard.model.project.AllPacks allPacks; // indexed by fullName
	
	wizard.model.project.Dependencies dependencies; // projects in direct dependency, indexed by rootName
	wizard.model.project.AllDependencies allDependencies; // all dependency projects with link counters, indexed by rootName
	
	wizard.model.Pack rootPack;
	*/
	
	id       : "",
	rootName : "",
	
	init: function(config) {
		this._super(config);
		
		this.classes = new wizard.model.project.Classes(this);
		this.allClasses = new wizard.model.project.AllClasses(this);
		
		this.packs = new wizard.model.project.Packs(this);
		this.allPacks = new wizard.model.project.AllPacks(this);
		
		this.dependencies = new wizard.model.project.Dependencies(this);
		this.allDependencies = new wizard.model.project.AllDependencies(this);
		
		this.rootPack = new wizard.model.Pack({
			project : this,
			name    : this.rootName
		});
		this.packs.addItem(this.rootPack);
	},
	
	_updateRootName: function() {
		this.rootPack.updateNames();
	}
});

wizard.Util.addProperty(wizard.model.Project, String, "rootName");

wizard.model.project = {};

wizard.model.project.Classes = wizard.lib.IndexedSortedMap.extend({
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	
	keyField : "projectName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addClass,
			destroyer  : this._removeClass,
			indexer    : "projectName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_addClass: function(clazz) {
		this.project.allClasses.addItem(clazz);
		clazz.bind("namechange", this._onClassNameChange, this);
		return clazz;
	},
	
	_removeClass: function(clazz) {
		clazz.purge(this);
		this.project.allClasses.removeItem(clazz);
	},
	
	_onClassNameChange: function(event, oldValue, newValue) {
		this.move(oldValue, newValue);
	}
});

wizard.model.project.AllClasses = wizard.lib.IndexedSortedMap.extend({
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	
	keyField : "fullName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addClass,
			destroyer  : this._removeClass,
			indexer    : "fullName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_addClass: function(clazz) {
		clazz.bind("namechange", this._onClassNameChange, this);
		return clazz;
	},
	
	_removeClass: function(clazz) {
		clazz.purge(this);
	},
	
	_onClassNameChange: function(event, oldValue, newValue) {
		this.move(oldValue, newValue);
	}
});

wizard.model.project.Packs = wizard.lib.IndexedSortedMap.extend({
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	
	keyField : "projectName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addPack,
			destroyer  : this._removePack,
			indexer    : "projectName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_addPack: function(pack) {
		this.project.allPacks.addItem(pack);
		pack.bind("namechange", this._onPackNameChange, this);
		return pack;
	},
	
	_removePack: function(pack) {
		pack.purge(this);
		this.project.allPacks.removeItem(pack);
	},
	
	_onPackNameChange: function() {
		this.project.packs.reindex();
		this.project.classes.reindex();
	}
});

wizard.model.project.AllPacks = wizard.lib.IndexedSortedMap.extend({
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	
	keyField : "fullName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addPack,
			destroyer  : this._removePack,
			indexer    : "fullName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_addPack: function(pack) {
		pack.bind("namechange", this._onPackNameChange, this);
		return pack;
	},
	
	_removePack: function(pack) {
		pack.purge(this);
	},
	
	_onPackNameChange: function() {
		this.project.allPacks.reindex();
		this.project.allClasses.reindex();
	}
});

wizard.model.project.Dependencies = wizard.lib.IndexedSortedMap.extend({ // <wizard.model.Project>
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	
	keyField : "rootName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._createDependency,
			destroyer  : this._destroyDependency,
			indexer    : "rootName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_createDependency: function(project) {
		this.project.allDependencies.increaseDependency(project);
		return project;
	},
	
	_destroyDependency: function(project) {
		this.project.allDependencies.decreaseDependency(project);
	}
});

//wizard.model.project.DependencyLink = JW.Class.extend({
	/*
	Fields
	wizard.model.Project client;
	wizard.model.Project server;
	String linkName;
	*/
	/*
	init: function(client, server) {
		this._super();
		this.client = client;
		this.server = server;
		this.linkName = this.client.id + ":" + this.server.id;
	}
});

wizard.model.project.DependencyLinks = wizard.lib.IndexedSortedMap.extend({ // <wizard.model.Project>*/
	/*
	Fields
	wizard.model.Project project;
	JW.Syncher syncher;
	*/
	/*
	keyField : "linkName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._addDependencyLink,
			destroyer  : this._removeDependencyLink,
			indexer    : "linkName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	_addDependencyLink: function(dependencyLink) {
		this.project.allDependencies.increaseDependency(dependencyLink.server);
		return dependencyLink;
	},
	
	_removeDependencyLink: function(dependencyLink) {
		this.project.allDependencies.decreaseDependency(dependencyLink.server);
	}
});
*/
wizard.model.project.Dependency = JW.Class.extend({
	/*
	Fields
	wizard.model.Project client;
	wizard.model.Project server;
	JW.Syncher dependencySyncher;
	JW.Syncher packSyncher;
	JW.Syncher classSyncher;
	*/
	
	init: function(client, server) {
		this._super();
		this.client = client;
		this.server = server;
		this.dependencySyncher = new JW.Syncher({
			collection : this.server.dependencies.values,
			creator    : this._addDependency,
			destroyer  : this._removeDependency,
			indexer    : "rootName",
			scope      : this
		});
		this.packSyncher = new JW.Syncher({
			collection : this.server.packs.values,
			creator    : this._addPack,
			destroyer  : this._removePack,
			indexer    : "fullName",
			scope      : this
		});
		this.classSyncher = new JW.Syncher({
			collection : this.server.classes.values,
			creator    : this._addClass,
			destroyer  : this._removeClass,
			indexer    : "fullName",
			scope      : this
		});
		this.server.bind("rootnamechange", this._onRootNameChange, this);
	},
	
	destroy: function() {
		this.server.purge(this);
		this.classSyncher.destroy();
		this.packSyncher.destroy();
		this.dependencySyncher.destroy();
		this._super();
	},
	
	_addDependency: function(project) {
		this.client.allDependencies.increaseDependency(project);
		return project;
	},
	
	_removeDependency: function(project) {
		this.client.allDependencies.decreaseDependency(project);
	},
	
	_addPack: function(pack) {
		this.client.allPacks.addItem(pack);
		return pack;
	},
	
	_removePack: function(pack) {
		this.client.allPacks.removeItem(pack);
	},
	
	_addClass: function(clazz) {
		this.client.allClasses.addItem(clazz);
		return clazz;
	},
	
	_removeClass: function(clazz) {
		this.client.allClasses.removeItem(clazz);
	},
	
	_onRootNameChange: function(event, oldValue, newValue) {
		this.client.dependencies.move(oldValue, newValue);
	}
});

wizard.model.project.AllDependencies = wizard.lib.IndexedSortedMap.extend({ // <wizard.model.project.Dependency>
	/*
	Fields
	wizard.model.Project project;
	Map<Integer> linkCount;
	JW.Syncher syncher;
	*/
	
	keyField : "rootName",
	
	init: function(project) {
		this._super();
		this.project = project;
		this.linkCount = {};
		this.syncher = new JW.Syncher({
			collection : this.values,
			creator    : this._createDependency,
			destroyer  : "destroy",
			indexer    : "rootName",
			scope      : this
		});
	},
	
	destroy: function() {
		this.syncher.destroy();
		this._super();
	},
	
	increaseDependency: function(project) {
		this.linkCount[project.id] = this.linkCount[project.id] || 0;
		if (++this.linkCount[project.id] === 1) {
			this.addItem(project);
		}
	},
	
	decreaseDependency: function(project) {
		if (--this.linkCount[project.id] === 0) {
			this.removeItem(project);
		}
	},
	
	_createDependency: function(project) {
		return new wizard.model.project.Dependency(this.project, project);
	}
});
