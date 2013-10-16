define(['./view', 'hbs!templates/people-item'],
    function(View, tpl) {
        return View.extend({

            template: tpl,

            visible: false,

            events: {
                'click [data-action=delete]' : 'delete',
                'click .editable' : 'edit'
            },

            initialize: function() {
                this.setElement(this.template(this.model.attributes));
                this.$el.hide();
            },

            show: function(model) {
                this.model = model;
                this.render();
                this.$el.show();
                this.visible = true;
            },

            hide: function() {
                this.$el.hide();
                this.visible = false;
            },

            render: function() {
                var parent, pos;

                // remember element's position in the dom, if attached
                if (jQuery.contains(document.documentElement, this.el)) {
                    parent = this.$el.parent();
                    pos = this.$el.index();
                    this.$el.remove();
                }

                // replace with newly rendered element
                this.setElement(this.template(this.model.attributes));
                
                // based on the visible state, show or hide the element
                this.$el[this.visible ?'show' :'hide']();

                // append element at original location (if viable)
                if (parent) {
                    var t;
                    if ((t = parent.children().eq(pos)).length) {
                        t.before(this.$el);
                    } else {
                        parent.append(this.$el);
                    }
                }

                return this;
            },

            delete:function(e) {
                this.model.destroy();
                this.hide();
            },

            edit: function(e) {
                
            }

        });
    });
