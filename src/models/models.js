define(['backbone_p', 'lodash', 'app/tags/tags'], function(Backbone, _, Tags) {
    return {
        'Person': Backbone.Epoxy.Model.extend({
            defaults: {
                name: '',
                email: '',
                tags: null
            },
            parse: function(response) {
                return _.extend({}, response, {
                    tags: new Tags.TagsCollection(response.tags)
                });
            },
            initialize: function() {
                this.on('change:tags', this.bindEvents, this);
            },
            bindEvents: function(model) {
                model.get('tags').on('add remove', function() {
                    this.trigger('update:tags update', this);
                }, this);
            }
        })
    };
});
