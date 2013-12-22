define(['lodash', 'backbone_p', 'ldsh!./tpl/view', './manager'], function(
    _, Backbone, tpl, apiManager) {

    var OAuthView = Backbone.View.extend({
        template: tpl,

        initialize: function() {
            this.manager = this.options.manager || apiManager;
        },

        render: function() {
            this.setElement(this.template({
                apis: this.manager.getApis()
            }));
            this.bindEvents();
            return this;
        },

        bindEvents: function() {
            var self = this;
            _.forIn(this.manager.getApis(), function(api, key) {
                var cb = _.bind(self.manager.authenticate, self.manager, key);
                self.$('.btn-' + key).on('click', cb);
            });
        }
    });

    return {
        OAuthView: OAuthView,
        manager: apiManager
    }
});
