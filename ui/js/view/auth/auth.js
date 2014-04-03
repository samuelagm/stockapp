define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'text!../../../templates/auth/loginform.html'
], function ($, _, Backbone, viewHtml) {
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
	var authView = Backbone.View.extend({
		
		el: $('#container'),
		
		events: {
			'click #vlogin':'login'
		},
		
		initialize: function () {
			this.$el.html(viewHtml);
		},
		
		render:function () {
			
		},
		
		login: function(){
			
			this.email = $("#email");
			this.password = $("#password");
			
			var view = this;
			$.ajax({
				type: "POST", url: 'login', data: { email: this.email.val(), password: this.password.val() }, success: function (rO) {
					if (rO.response == "OK") {
						view.goTo('sheet/'+view.options.sheetid, {trigger:true});
					} else {
						try{
							 $.Dialog({
								overlay: true,
								shadow: true,
								flat: true,
								icon: '',
								title: 'Invalid login credentials',
								content: "<br/><br/><strong style='padding:30px'>Wrong email or password</strong>",
								onShow: function(_dialog){
									//alert('Holla');
				
								}
							});								
						}catch(e){
							console.log(e)
						}
						
						
	
					}
				}, dataType: 'json'
			});
		}
		
	})
	
    return authView;
    // What we return here will be used by other modules
});