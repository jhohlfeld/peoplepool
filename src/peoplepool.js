define(['backbone', 'views/view', 'views/people-list', 'views/add-people',
        'views/people-item'
    ],
    function(Backbone, View, PeopleListView, AddPeople, PeopleItem) {

        var app = {};

        app.AppView = View.extend({
            el: '#peoplepool',

            views: {},

            initialize: function() {
                var people = new app.PeopleList();
                people.fetch();
                this.views = {
                    peopleList: new PeopleListView({
                        people: people
                    }),
                    peopleItem: new PeopleItem({
                        model: new app.Person()
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

        app.Person = Backbone.Model.extend({
            defaults: {
                name: '',
                tags: []
            }
        });

        app.PeopleList = Backbone.Collection.extend({
            model: app.Person,

            localStorage: new Backbone.LocalStorage('people-backbone'),

            comparator: 'name'
        });

        return app;
    });
