define(['./view', 'hbs!templates/people-item'],
    function(View, tpl) {
        return View.extend({

            template: tpl,

            initialize: function() {
                this.setElement(this.template(this.model.attributes));
                this.$name = this.$('.name');
                this.$tags = this.$('.tags');
                this.$el.hide();
            },

            show: function(model) {
                this.model = model;
                this.render();
                this.$el.show();
            },

            render: function() {
                var parent, pos;
                if (jQuery.contains(document.documentElement, this.el)) {
                    parent = this.$el.parent();
                    pos = this.$el.index();
                    this.$el.remove();
                }
                this.setElement(this.template(this.model.attributes));
                if (parent) {
                    var t;
                    if ((t = parent.children().eq(pos)).length) {
                        t.before(this.$el);
                    } else {
                        parent.append(this.$el);
                    }
                }

                return this;
            }

        });
    });
