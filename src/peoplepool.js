define(['backbone', 'views/search', 'views/people-list', 'views/add-people'],
    function(Backbone, SearchView, PeopleListView, AddPeople) {

        var app = {};

        app.AppView = Backbone.View.extend({
            el: '#peoplepool',

            views: {},

            initialize: function() {
                var people = new app.PeopleList();
                people.fetch();
                this.views = {
                    search: new SearchView(),
                    peopleList: new PeopleListView({
                        people: people
                    }),
                    addPeople: new AddPeople({
                        people: people
                    })
                };
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
