define(['backbone_p',
        'app/common/view', 'app/people/list', 'views/add-people',
        'app/people/view', 'app/tags/edit', 'app/common/master',
        'models/models', 'app/common/lodash.partials'
    ],
    function(Backbone,
        View, PeopleListView, AddPeopleView,
        PeopleItemView, Tags, MasterView,
        models) {

        var app = {};

        app.AppView = View.extend({
            el: '#peoplepool',

            views: {},

            initialize: function() {

                // people collection
                var people = new app.PeopleList();
                people.on('change', function(model) {
                    this.sync('update', model);
                });
                people.fetch();

                this.views = {
                    peopleList: new PeopleListView({
                        people: people
                    }),
                    peopleItem: new PeopleItemView(PeopleListView.model),
                    addPeople: new AddPeopleView({
                        people: people
                    }),
                };

                this.listenTo(this.views.peopleList, 'select', function(item, list) {
                    this.views.peopleItem.show(item.model);
                });

                this.views.peopleItem.listenTo(this.views.peopleList, 'deselect',
                    this.views.peopleItem.hide);

                this.masterView = new MasterView();
            },

            render: function() {
                var $mv = this.masterView.render().$el;

                // test tags
                var tagsCollection = new Tags.TagsCollection([{
                    label: 'Riese'
                }, {
                    label: 'Zwerg'
                }]);
                var editable;

                $mv.find('#mainview').append(

                    $('<div class="form-group">').append(editable = new Tags.TagsView({
                        collection: tagsCollection
                    }).render().el),

                    this.views.peopleList.render().el,
                    this.views.addPeople.render().el);
                $mv.find('#sidebar').append(
                    this.views.peopleItem.render().el);
                $mv.appendTo(this.$el.html(''));

                // $(editable).editable();
            },
        });

        app.PeopleList = Backbone.Collection.extend({
            model: models.Person,

            localStorage: new Backbone.LocalStorage('people-backbone'),

            comparator: 'name'
        });

        return app;
    });
