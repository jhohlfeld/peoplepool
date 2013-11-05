define(['./view', 'ldsh!./tpl/master'], function(View, tpl) {
    return View.extend({

        template: tpl,

        initialize: function() {
            this.setElement(this.template());
        }
    });
});
