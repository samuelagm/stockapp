define([
  'jquery',
  'underscore',
  'backbone',
  'view/product/productlist',
  'view/product/newproduct',
  'view/reports/report',
  'view/auth/auth'


], function ($, _, Backbone, productList, product, Report, AuthView) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            // Define some URL routes
            '': 'index',
            'np': 'newproduct',
            'report': 'reportView',
            'sheet/:id': 'openSheet',
            //'newalbum/:id': 'newalbum',
            //'album/detail/:id': 'albumDetail',
            //'signup':'signup',

            // Default
            '*actions': 'defaultAction'
        },

        index: function () {
            //alert('index');
            new productList;

        },

        newproduct: function () {

            new product;
        },

        reportView: function () {

            new Report;
            console.log('12');
        },

        openSheet: function (id) {
            var p = new Payroll({ sheetid: id });
            //p.render();
        },



        defaultAction: function () {

        }


    });

    var initialize = function () {
        var app_router = new AppRouter();
        Backbone.View.prototype.goTo = function (loc, options) {

            app_router.navigate(loc, options);
        }

        Backbone.View.prototype.close = function () {
            //this.remove();
            this.unbind();
        }



        Backbone.history.start();
    };
    return {
        init: initialize
    };
});