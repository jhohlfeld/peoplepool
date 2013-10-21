define(['jquery', 'lodash', './view', 'ldsh!templates/people-item'],
    function($, _, View, tpl) {
        return View.extend({

            template: tpl,

            visible: false,

            events: {
                'click [data-action=delete]': 'delete',
                'click .editable': 'edit'
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
                this.$el[this.visible ? 'show' : 'hide']();

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

            delete: function(e) {
                this.model.destroy();
                this.hide();
            },

            edit: function(e) {
                e.stopPropagation();
                if (this.$edit) {
                    this.restore();
                }
                var $target = this.$(e.target),
                    $group = $target.parents('[data-attr]'),
                    attr = $group.data('attr');
                if (attr) {
                    // var $editable = $group.find('.editable'),
                    //     template = Handlebars.partials['editable-edit'],
                    //     context = {
                    //         'key': attr,
                    //         'value': this.model.get(attr)
                    //     };
                    // this.$edit = $(template(context));
                    // $editable.before(this.$edit).remove();
                    // this.$edit.on({
                    //     'keyup': _.bind(this.save, this),
                    //     'blur': _.bind(this.restore, this)
                    // }).focus();
                }
            },

            save: function(e) {
                if (e.which == $.KeyEvent.DOM_VK_RETURN) {
                    var attr = {};
                    attr[this.$edit.attr('name')] = this.$edit.val();
                    this.model.set(attr);
                    this.restore();
                } else
                if (e.which == $.KeyEvent.DOM_VK_ESCAPE) {
                    this.restore();
                }
            },

            restore: function(e) {
                // if (!this.$edit) {
                //     return;
                // }
                // var key = this.$edit.attr('name'),
                //     template = Handlebars.partials['editable'];
                // this.$edit.before($(template(this.model.get(key)))).remove();
                // this.$edit = null;
                // this.delegateEvents(this.events);
            }

        });
    });
