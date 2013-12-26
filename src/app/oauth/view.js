define(['lodash', 'backbone_p', 'ldsh!./tpl/view', './api/oauth'], function(
    _, Backbone, tpl, oauth) {

    var OAuthView = Backbone.View.extend({
        template: tpl,
        className: 'social-buttons',

        initialize: function() {
            this.apis = oauth.getApis(['google-plus', 'facebook', 'stack-exchange', 'windows']);
        },

        render: function() {
            this.$el.append(this.template({
                apis: this.apis
            }));
            this.bindEvents();
            return this;
        },

        bindEvents: function() {
            var self = this;
            _.forIn(this.apis, function(api, key) {
                var cb = _.bind(oauth.request, null, api);
                self.$('.btn-' + key).on('click', cb);
            });
        }
    });

    return {
        OAuthView: OAuthView,
    }
});
