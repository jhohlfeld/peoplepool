define(['lib/jquery.editable', 'lodash', 'app/common/view',
        'ldsh!templates/people-item', 'backbone'
    ],
    function($, _, View, tpl, Backbone) {

        return View.extend({

            model: new Backbone.Epoxy.Model({
                defaults: {
                    name: '',
                    email: ''
                }
            }),

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
                this.$('input').editable({replacement: '<div/>'});
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
                this.model.destroy();
                this.hide();
            }
        });
    });
