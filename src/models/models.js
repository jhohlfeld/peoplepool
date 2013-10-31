define(['lib/backbone.plugin'], function(Backbone) {
    return {
        'Person': Backbone.Epoxy.Model.extend({
            defaults: {
                name: '',
                email: '',
                tags: []
            }
        })
    };
});
