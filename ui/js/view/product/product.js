define([
// These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'model/product',
  'jsrender',
  'mn'

], function ($, _, Backbone, product) {
    var productView = Backbone.View.extend({
        tagName: "tr",

        templates: function (type) {
            var tmpl = null;
            switch (type) {
                case 0:
                    tmpl = $.templates("#product-detail");
                    break;
                case 1:
                    tmpl = $.templates("#product-edit");
                    break;
                case 2:
                    tmpl = $.templates("#product-addstock");
                    break;
                case 3:
                    tmpl = $.templates("#product-recordsale");

            }

            return tmpl;

        },

        model: product,

        events: {
            'click #viewbtn': 'viewDetail',
            'click #cancel': 'render',
            'click #stockview': 'stockView',
            'click #rsalesview': 'salesView',
            'click #addstockbtn': 'addstock',
            'click #recordsalesbtn': 'recordsale',
            'click #editbtn': 'update',
            'click #del': 'del'
        },

        initialize: function () {

            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove)
        },

        render: function () {
            this.$el.html(this.templates(0).render(this.model.toJSON()))
            return this;
        },

        viewDetail: function () {

            //this.goTo("view/"+ this.model.get("id"), {trigger:true})
            this.$el.html(this.templates(1).render(this.model.toJSON()))
            return this;
            //alert(this.model.get("id"));
        },

        stockView: function () {
            this.$el.html(this.templates(2).render(this.model.toJSON()))
        },

        salesView: function () {
            this.$el.html(this.templates(3).render(this.model.toJSON()))
        },

        update: function () {
            this.model.set({
                name: $("#name").val(),
                description: $("#desc").val()
            });
            this.model.save();
            return false;
        },

        recordsale: function () {
            //alert('go');
            this.model.set({
                quantity: parseInt(this.model.get('quantity')) - parseInt($("#rquantity").val())
            });
            this.model.save();
            $.Notify({
                content: "Sale Recorded",
                shadow: true,
                style: { background: '#1ba1e2', color: 'white' }
            });

            return false;
        },

        addstock: function () {
            //alert('go');
            this.model.set({
                quantity: parseInt(this.model.get('quantity')) + parseInt($("#squantity").val())
            });
            this.model.save();
            $.Notify({
                content: "Stock added",
                shadow: true,
                style: { background: '#1ba1e2', color: 'white' }
            });
            return false;
        },

        del: function () {
            if (confirm("You're about to delete a product?, do you wish to continue") == true) {
                this.model.destroy();
            }
        }

    });

    return productView;
    // What we return here will be used by other modules
});