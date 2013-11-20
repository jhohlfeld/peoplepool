define(['backbone_p', 'lodash', 'jquery', 'app/tags/tags'], function(Backbone, _, $, Tags) {

    var pubsub = _.extend({}, Backbone.Events);

    // view defining a single list item
    var ListItemView = Backbone.Epoxy.View.extend({
        selected: false,
        el: '<a class="list-group-item" href="javascript:void(0)">',
        events: {
            'click': 'onClick'
        },
        bindings: {
            'a': 'text:name, classes:{active:selected}'
        },

        initialize: function() {
            this.$el.text(this.model.get('name'));
        },

        onClick: function(e) {
            pubsub.trigger('item:click', this);
        },

        select: function(selected) {
            this.model.set('selected', this.selected = selected);
        }
    });

    var ListItemModel = Backbone.Model.extend({
        defaults: {
            name: '',
            email: '',
            tags: new Tags.TagsCollection(),
            selected: false
        },
        referenceModel: null,
        wrapModel: function(model) {
            this.set(model.attributes);
            this.bindListeners(model);
            this.referenceModel = model;
            return this;
        },
        bindListeners: function(model) {
            this.listenTo(model, 'change', function(m) {
                this.set(m.attributes);
            });
            this.on('change', function() {
                model.set(_.pick(this.attributes, function(val, key) {
                    return model.has(key);
                }));
            });
            this.on('remove', function() {
                model.destroy();
            });
        }
    });

    // collection defining a model and a view reference
    var ListCollection = Backbone.Collection.extend({
        model: ListItemModel,
        comparator: 'name',

        view: ListItemView,

        constructor: function(options) {
            this.options = _.extend({}, options);
            this.view = this.options.renderView || ListItemView;
            Backbone.Collection.apply(this, arguments);
        },

        addAll: function(collection) {
            var model = this.model;
            this.reset(collection.map(function(m) {
                return new model().wrapModel(m);
            }));
            this.bindListeners(collection);
        },

        bindListeners:function(collection) {
            this.listenTo(collection, 'add', function(model) {
                this.add(new this.model().wrapModel(model));
            });
            this.listenTo(collection, 'destroy', function(model) {
                this.remove(model);
            });
        }
    });

    // binding view for list of collection items
    var ListView = Backbone.Epoxy.View.extend({
        pubsub: pubsub,
        curSelected: null,
        className: 'people-list__item-list list-group',
        bindings: {
            'div': 'collection:$collection'
        },

        initialize: function() {
            this.collection = new ListCollection();
            this.collection.addAll(this.options.people);
            this.listenTo(pubsub, 'item:click', this.onClick);
        },

        onClick: function(item) {
            if (this.curSelected && this.curSelected != item) {
                this.curSelected.select(false);
            }
            item.select(!item.selected);
            this.curSelected = item.selected ? item : null;
            this.trigger((this.curSelected ? 'select' : 'deselect'), this.curSelected, this);
        }
    });

    ListView.model = ListItemModel;

    return ListView;
});
