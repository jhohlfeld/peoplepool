define(['lib/jquery.editable', 'lodash', 'app/common/view',
        'ldsh!./tpl/view', 'backbone_p',
        'app/people/list'
    ],
    function($, _, View, tpl, Backbone, ListView) {

        return View.extend({

            model: new ListView.model(),

            visible: true,

            template: tpl,

            events: {
                'click [data-action=delete]': 'delete'
            },

            bindings: {
                'input[name=name]': "value:name",
                'input[name=email]': "value:email",
                'p.tags': 'text:tags'
            },

            initialize: function() {
                this.setElement(this.template(this.model.attributes)).hide();
                this.$('input').editable({
                    replacement: '<div/>'
                });
            },

            show: function(model) {
                if (model) {
                    this.model = model;
                    this.applyBindings();
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
