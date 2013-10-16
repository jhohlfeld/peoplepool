define(['lib/backbone-plugin', 'views/view', 'views/people-list', 'views/add-people',
        'views/people-item', 'models/models'
    ],
    function(Backbone, View, PeopleListView, AddPeople,
        PeopleItem, models,
        partials) {

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
                    peopleItem: new PeopleItem({
                        model: new models.Person()
                    }),
                    addPeople: new AddPeople({
                        people: people
                    }),
                };

                this.listenTo(this.pubSub, 'peoplelist:select', function(item) {
                    this.views.peopleItem.show(item.model);
                });
                this.listenTo(this.pubSub, 'peoplelist:unselect', function() {
                    this.views.peopleItem.hide();
                });
            },

            render: function() {
                this.$el.html('').append(_.map(this.views, function(v) {
                    return v.render().$el;
                }));
            },
        });

        app.PeopleList = Backbone.Collection.extend({
            model: models.Person,

            localStorage: new Backbone.LocalStorage('people-backbone'),

            comparator: 'name'
        });

        return app;
    });
