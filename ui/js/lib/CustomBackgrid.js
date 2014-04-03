define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'backgrid'
], function ($, _, Backbone,Backgrid) {
	var CustomBackgrid = Backgrid.Grid.extend({
		changes:{
			meta:{
				editorName:"",
				date:""
			},
			data:[]
		}
	})
	
    return CustomBackgrid;
    // What we return here will be used by other modules
});