define(['./view', 'hbs!templates/people-list-item'], function(View, tpl) {
    return View.extend({

        template: tpl,
        
        initialize: function() {
        	this.setElement(this.template(this.model.attributes));
        }
        
    });
});
