define([
	'jquery',
	'underscore',
	'backbone',
	'router', // Request router.js
	//'jquery.widget.min',
	//'metro-dialog',
/*	'metro-core',
	'metro-touch-handler',
	
	'metro-accordion',
	'metro-button-set',
	'metro-date-format',
	'metro-calendar',
	'metro-datepicker',
	'metro-carousel',
	'metro-countdown',
	'metro-dropdown',
	'metro-input-control',
	'metro-live-tile',
	//'drag-tile',
	'metro-progressbar',
	'metro-rating',
	'metro-slider',
	'metro-tab-control',
	'metro-table',
	'metro-times',
	
	'metro-notify',
	'metro-listview',
	'metro-treeview',
	'metro-fluentmenu'
	'metro-hint',
	'metro-streamer',
	'metro-scroll'  */
	  
  
], function ($, _, Backbone, Router) {
    var initialize = function () {
        //console.log(Router);
        // Pass in our Router module and call it's initialize function
        Router.init();
    }

    return {
        init: initialize
    };
});