wizard.Comp = JW.Class.extend({
	compileClass: function(clazz, project) {
		var w = new wizard.comp.Writer();
		
		w.writeln('wizard.defineClass(');
		
		w.tab(function() {
			w.writeln('"', clazz.getFullName(), '",');
			w.writeln('"', clazz.extendz.getFullName(), '",');
			
			w.writeln('[');
			w.writeln('],');
			
			w.define([ clazz.getName(), clazz.extendz.getName() ], function(className, extendsName) {
				w.writeln('function(', clazzName, ', ', extendzName, ') {');
				
				w.tab(function() {
					w.define([ 'self', 'super_constructors' ], function(selfName, super_constructorsName) {
						w.writeln('return function(', selfName, ', ', super_constructorsName, ') {');
						
						w.tab(function() {
							w.writeln('return [');
							w.writeln('\t', super_constructorsName, '[0]');
							w.writeln('];');
						}, this);
						
						w.writeln('};');
					}, this);
				}, this);
				
				w.writeln('}');
			}, this);
		}, this);
		
		w.writeln(');');
	}
});

wizard.comp = {};
