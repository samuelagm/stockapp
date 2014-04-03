define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'model/product'
], function ($, _, Backbone, product) {
	
	var products = Backbone.Collection.extend({
		model: product
	})
    return products;
    // What we return here will be used by other modules
});