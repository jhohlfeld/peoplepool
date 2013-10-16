define(['backbone'], function(Backbone) {
    return {
        'Person': Backbone.Model.extend({
            defaults: {
                name: '',
                email: '',
                tags: []
            }
        })
    };
});
