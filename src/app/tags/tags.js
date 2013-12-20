/**
 * Here we got a tag view that already implements in-place editing (#editable).
 *
 */
define(['backbone_p', 'jquery', 'lodash', 'ldsh!./tpl/tags'], function(
    Backbone, $, _, tpl) {

    // model for tags
    var TagModel = Backbone.Epoxy.Model.extend({
        defaults: {
            label: ''
        },
        computeds: {
            cid: function() {
                return this.cid;
            }
        }
    });

    // view for single tag
    var TagItemView = Backbone.Epoxy.View.extend({
        el: '<span class="label label-primary" />',
        model: TagModel,
        bindings: {
            ':el': 'text:label,attr:{"data-cid":cid}'
        }
    });

    // collection of tags
    var TagsCollection = Backbone.Collection.extend({
        model: TagModel,
        view: TagItemView,
        getItems: function() {
            return _.map(this.models, function(v, k) {
                return v.get('label');
            }).join(',');
        }
    });

    // tag's normal view
    var TagsView = Backbone.Epoxy.View.extend({
        el: tpl(),
        bindings: {
            '.tags': 'collection:$collection'
        },
        $muted: null,

        initialize: function() {
            this.options = _.defaults(this.options, {
                editClassName: 'editable-edit'
            });
            var c = this.collection = this.options.collection || new TagsCollection();
            this.$tags = this.$('.tags');
            this.$el.on('click', _.bind(this.edit, this));
            this.$muted = $('<i class="text-muted">Enter value here</i>').appendTo(this.$el);
            if (this.collection.length > 0) {
                this.$muted.hide();
            }
        },

        edit: function(e) {
            if (this.editView) {
                return;
            }
            e.preventDefault();
            this.editView = new TagsEditView({
                tagsView: this
            });
            this.listenToOnce(this.editView, 'destroy', function() {
                this.$el.toggleClass(this.options.editClassName);
                if (!(this.collection.length > 0)) this.$muted.show();
                this.stopListening(this.editView);
                this.editView = null;
            });
            this.$el.toggleClass(this.options.editClassName);
            this.$muted.hide();
            this.editView.render();
        },

        getItems: function() {
            return this.getTags().map(function(i, v) {
                return $(v).text()
            });
        },

        getTags: function() {
            return this.$('.label');
        },

        addItem: function(text) {
            this.collection.add({
                label: text
            });
        },

        setCollection: function(collection) {
            this.collection = collection;
            this.applyBindings();
            this.$muted[this.collection.length > 0 ? 'hide' : 'show']();
        }
    });

    // tag's edit view
    var TagsEditView = Backbone.View.extend({
        el: '<input type="text" class="form-control">',
        initialize: function() {
            this.tagsView = this.options.tagsView;
            this.$tags = this.tagsView.$tags;
            this.$input = this.$el;
            this.on('afterRender', function() {
                this.$input.select()
            });
            this.$input.on('keydown keyup', _.bind(this.enter, this));
            $(document).on('click', _.bind(function(e) {
                var p = $(e.target).parentsUntil('document');
                if (!_.contains(p, this.tagsView.el)) {
                    this.destroy();
                }
            }, this));
        },

        recalculate: function() {
            var k = parseInt(getStyle($('body')[0], 'font-size')) * .4,
                $t = this.tagsView.getTags().last();
            if (!($t.length > 0)) return;

            var pos = $t.position(),
                padLeft = pos.left + $t.outerWidth() + k,
                padTop = pos.top;

            // ?? verify that ..
            if (padLeft > this.$input.innerWidth()) {
                padLeft = k;
            }

            this.$input.css({
                'padding-left': padLeft,
                'padding-top': padTop
            });
        },

        render: function() {
            this.$el.insertAfter(this.$tags);
            this.recalculate();
            this.trigger('afterRender', this);
            return this;
        },

        enter: function(e) {
            var tabPressed = function() {
                return _.contains([$.KeyEvent.DOM_VK_TAB], e.which);
            };
            if (e.type != 'keyup' && !tabPressed()) return;
            var text = this.$input.val();
            switch (true) {
                case tabPressed():
                case _.contains([$.KeyEvent.DOM_VK_COMMA,
                    $.KeyEvent.DOM_VK_RETURN
                ], e.which):
                    this.addTag(text);
                case _.contains([$.KeyEvent.DOM_VK_ESCAPE], e.which):
                    this.$input.val('');
            }
        },

        addTag: function(text) {
            var text = text.replace(/^[\s,]+|[\s,]+$/g, '');
            if (text.length < 1) return;
            this.tagsView.addItem(text);
            this.recalculate();
        },

        destroy: function(e) {
            this.trigger('destroy');
            this.remove();
        }
    });

    return {
        TagsView: TagsView,
        TagsCollection: TagsCollection
    }

    // helper method for extracting styles

    function getStyle(el, styleProp) {
        var camelize = function(str) {
            return str.replace(/\-(\w)/g, function(str, letter) {
                return letter.toUpperCase();
            });
        };

        if (el.currentStyle) {
            return el.currentStyle[camelize(styleProp)];
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)
                .getPropertyValue(styleProp);
        } else {
            return el.style[camelize(styleProp)];
        }
    }
});
