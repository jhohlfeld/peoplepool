define(['backbone_p', 'jquery', 'lodash'], function(Backbone, $, _) {

    var TagModel = Backbone.Model.extend({
        defaults: {
            label: ''
        }
    });
    var TagItemView = Backbone.Epoxy.View.extend({
        el: '<span class="label label-primary"/>',
        model: TagModel,
        bindings: {
            ':el': 'text:label'
        }
    });
    var TagsCollection = Backbone.Collection.extend({
        model: TagModel,
        view: TagItemView,
        getItems: function() {
            return _.map(this.models, function(v, k) {
                return v.get('label');
            }).join(',');
        }
    });

    var TagsView = Backbone.Epoxy.View.extend({
        bindings: {
            ':el': 'collection:$collection'
        },

        events: {
            'click': 'edit'
        },

        initialize: function() {
            this.collection = this.options.collection || new TagsCollection();
        },

        edit: function(e) {
            if (!this.editView) {
                this.editView = new TagsEditView({
                    tagsView: this
                });
                this.listenTo(this.editView, 'destroy', function() {
                    this.stopListening(this.editView);
                    this.editView = null;
                });
            }
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
        }
    });

    var TagsEditView = Backbone.View.extend({
        el: '<div><input type="text" class="form-control"></div>',
        initialize: function() {
            this.tagsView = this.options.tagsView;
            this.$tags = this.tagsView.$el;
            this.$tagsOriginalCss = this.$tags.css(['position', 'top', 'padding']);
            this.$tags.css({
                'position': 'absolute',
                'top': 0,
                'padding': '.4em'
            });
            this.$input = this.$('input');
            this.on('afterRender', function() {
                this.$input.select()
            });
            // this.listenTo(this.$input, 'keyup', this.enter);
            this.$input.on('keydown keyup', _.bind(this.enter, this));
            this.$input.on('blur', _.bind(this.destroy, this));
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
            this.$el.insertBefore(this.tagsView.$el);
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
            this.tagsView.$el.css(this.$tagsOriginalCss);
            this.trigger('destroy');
            this.remove();
        }
    });

    return {
        TagsView: TagsView,
        TagsCollection: TagsCollection
    }

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
