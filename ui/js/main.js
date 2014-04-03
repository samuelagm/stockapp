require.config({

    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        bp: 'lib/backbone-pageable.min',
        backgrid: 'lib/backgrid',
        bsa: 'lib/backgrid-select-all.min',
        bpaginator: 'lib/backgrid-paginator.min',
        bf: 'lib/backgrid-filter.min',
        lunr: 'lib/lunr.min',
        crypto: 'lib/crypto-md5',
        fineuploader: 'lib/jquery.fineuploader-3.9.0-3',
        jsrender: 'lib/jsrender',
        jqw: 'jquery.widget.min',
        md: 'metro-dialog',
        mn: 'metro-notify',
        mc: 'metro-calendar',
        mdtp: 'metro-datepicker',
        xchart: 'xcharts'
    },
    shim: {
        backbone: {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },

        backgrid: {

            deps: ['jquery', 'backbone', 'underscore'],

            exports: 'Backgrid'
        },

        bp: {
            deps: ['backbone']
        },

        bpaginator: {
            deps: ['backgrid', 'bf']
        },

        bf: {
            deps: ['backgrid', 'lunr']
        },

        bsa: {
            deps: ['backgrid']
        },

        lunr: {
            deps: ['jquery']
        },

        underscore: {
            exports: '_'
        },

        jsrender: {

            deps: ['jquery']
        },

        fineuploader: {
            deps: ['jquery']
        },

        crypto: {
            exports: 'Crypto'
        },

        jqw: {
            deps: ['jquery']
        },

        md: {
            deps: ['jqw']
        },

        mn: {
            deps: ['jqw']
        },

        mc: {
            deps: ['jqw']
        },

        mdtp: {
            deps: ['mc']
        },

        xchart: {
            deps:['d3']
            
        }

    }

});

require([

  // Load our app module and pass it to our definition function
  'app'
], function (App) {
    // The "app" dependency is passed in as "App"
    App.init();
});