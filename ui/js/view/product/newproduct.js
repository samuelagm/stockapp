define([
// These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'model/product',
  'text!../../../templates/product/newproduct.html',
  'utility',
  'md',
  'mn'



], function ($, _, Backbone, product, viewHtml, Utils) {
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    var newproductView = Backbone.View.extend({

        el: $("#container"),

        model: new product,

        id: "",
        name: "",
        description: "",

        events: {
            'submit': 'create',
            'click #navback': 'navback',
            'click #cancelbtn': 'navback'
        },

        initialize: function () {
             $("#navback").html('<span class=" icon-arrow-left-3" ></span>');
              
            this.$el.html(viewHtml);
            this.name = $("#name");
            this.description = $("#desc");

            this.listenTo(this.model, 'sync', this.done)
            //this.creator = $("")
            //this.initUploader();

        },

        render: function () {

        },

        create: function () {

            this.model.set({
                id: Utils.generateId(this.name.val()),
                name: this.name.val(),
                description: this.description.val(),
            });

            this.model.sync('create', this.model);
             $.Notify({
                content: "Product succesfully added",
                shadow: true,
                style: { background: '#1ba1e2', color: 'white' }
            });

            /*            $.Dialog({
            overlay: true,
            shadow: true,
            flat: true,
            icon: '<i class="icon-plus-2 fg-white" style="background: green; color: white; padding: 10px; border-radius: 50%"></i>',
            title: 'Please Wait',
            content: "please wait while the records are being uploaded, this might take a very long time depending on the number of records",
            onShow: function(_dialog){
            //alert('Holla');

            }
            });*/

            return false;
        },

        navback: function () {
            this.close();
            this.goTo("/", { trigger: true });
            return false;
        },

        done: function () {
            $.Notify({
                content: "product created",
                shadow: true,
                style: { background: '#1ba1e2', color: 'white' }
            });

            //$.Dialog.close();
            //this.close();
            var self = this;
            setTimeout(function () {
                self.goTo("/", { trigger: true })
            },
						'5000');
        }




    })

    return newproductView;
    // What we return here will be used by other modules
});
