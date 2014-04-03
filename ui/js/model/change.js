define([
  'backbone'    // lib/backbone/backbone
], function (Backbone) {

	var change = Backbone.Model.extend({
		defaults:{
			id:"",
			username:"",
			datainfo:"",
			created:""
		},
		
		idAttribute:"",
		urlRoot:"change"
		
	});
	
    return change;
    // What we return here will be used by other modules
});