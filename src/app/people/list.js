define(['backbone_p', 'jquery'], function(Backbone, $) {

    // view defining a single list item
    var ListItemView = Backbone.View.extend({
        el: '<div class="list-group-item">',
        initialize: function() {
            this.$el.text(this.model.get('name'));
        }
    });

    // collection defining a model and a view reference
    var ListCollection = Backbone.Collection.extend({
        model: Backbone.Model,
        view: ListItemView
    });

    // binding view for list of collection items
    var ListView = Backbone.Epoxy.View.extend({
        el: '<div class="people-list__item-list list-group">',
        initialize: function() {
            this.collection = new ListCollection();
            this.collection.reset([{
                name: 'Jakob Hohlfeld'
            }, {
                name: 'Max Mustermann'
            }]);
        }
    });

    return ListView;
});
