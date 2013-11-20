define(['lib/jquery.editable', 'lodash', 'app/common/view',
        'ldsh!./tpl/detail', 'backbone_p',
        'app/people/list', 'app/tags/tags'
    ],
    function($, _, View, tpl, Backbone, ListView, Tags) {

        return View.extend({

            model: new ListView.model(),

            visible: true,

            template: tpl,

            events: {
                'click [data-action=delete]': 'delete'
            },

            bindings: {
                'input[name=name]': "value:name",
                'input[name=email]': "value:email"
            },

            initialize: function() {
                this.setElement(this.template(this.model.attributes)).hide();
                this.$('input').editable({
                    replacement: '<div/>'
                });
                this.tagsView = new Tags.TagsView({
                    collection: this.model.get('tags')
                });
            },

            render: function() {
                View.prototype.render.apply(this);
                this.$('.form-group-tags').append(this.tagsView.render().el);
                return this;
            },

            show: function(model) {
                if (model) {
                    this.model = model;
                    this.applyBindings();
                    this.tagsView.setCollection(this.model.get('tags'));
                }
                this.$('input').editable();
                this.$el.show();
                this.visible = true;
            },

            hide: function() {
                this.$el.hide();
                this.visible = false;
            },

            delete: function(e) {
                this.model.collection.remove(this.model);
                this.hide();
            }
        });
    });
