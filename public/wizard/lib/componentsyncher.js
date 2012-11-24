wizard.lib.ComponentSyncher = JW.Syncher.extend({
	/*
	Required
	JW.UI.Component target;
	*/
	
	_inserter: function(item, index)
	{
		this.target.addChild(item, index);
	},
	
	_remover: function(index)
	{
		this.target.removeChild(index);
	},
	
	_clearer: function()
	{
		this.target.removeChildren();
	}
});
