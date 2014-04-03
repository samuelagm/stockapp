define([
// These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'collection/products',
  'view/product/product',
  'text!../../../templates/product/products.html',


], function ($, _, Backbone, productCollection, productView, viewHtml) {

    var productList = Backbone.View.extend({
        el: $("#container"),

        events: {
            'click #newproduct': 'openCreateView',
            'click #viewreport': 'openReportView',
            'click #navback': 'back'
        },

        collection: null,

        initialize: function () {
            this.$el.html(viewHtml);

            this.collection = new productCollection([], { url: "products" })
            $("#navback").html('');
            $("#logout").show();
            this.listenTo(this.collection, "add", this.addOne);
            this.listenTo(this.collection, "reset", this.addAll);
            this.listenTo(this.collection, "all", this.render);

            $("#list").html('') //clear empty row placeholder

            this.collection.fetch(); //
            //console.log(createHtml)
            //alert('Hello');
        },

        render: function () {
            console.log(this.collection.toJSON());
        },

        addOne: function (product) {
            var v = new productView({ model: product });
            $("#list").append(v.render().el);
        },

        addAll: function () {

            this.collection.each(this.addOne, this);
        },

        create: function () {
            //this.goto = "h";
            return false;
        },

        openCreateView: function () {

            this.close();
            this.goTo('np', { trigger: true })

            /*			 $.Dialog({
            overlay: true,
            shadow: true,
            flat: true,
            icon: '<i class="icon-plus-2 fg-white" style="background: green; color: white; padding: 10px; border-radius: 50%"></i>',
            title: 'Create new product',
            content: createHtml,
            onShow: function(_dialog){
            alert('Holla');

            }
            });	*/
        },

        openReportView: function () {
            this.close();
            this.goTo('report', { trigger: true })
        },

        back: function () {
            //this.close();
            console.log('action');
            //window.location.href = '';
            return false;
        }

    });

    return productList;
    // What we return here will be used by other modules
});