wizard.lib.ComponentSyncher = JW.Syncher.extend({
	/*
	Required
	JW.UI.Component scope;
	*/
	
	_inserter: function(item, index)
	{
		this.scope.addChild(item, index);
	},
	
	_remover: function(index)
	{
		this.scope.removeChild(index);
	},
	
	_clearer: function()
	{
		this.scope.removeChildren();
	}
});
