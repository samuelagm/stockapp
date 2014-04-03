define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'backbone'    // lib/backbone/backbone
  
], function ($, Backbone) {
	var Product = Backbone.Model.extend({
		
        defaults: {
            id:"",
            name: "",
            description : "", 
            quantity: 0
        },

        idAttribute: 'id',

        urlRoot: "product"
	})
	return Product;
   
});