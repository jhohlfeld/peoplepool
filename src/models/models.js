define(['backbone_p'], function(Backbone) {
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
