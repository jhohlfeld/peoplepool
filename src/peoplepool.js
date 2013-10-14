define(['backbone', 'views/view', 'views/people-list', 'views/add-people'],
    function(Backbone, View, PeopleListView, AddPeople) {

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
                    addPeople: new AddPeople({
                        people: people
                    })
                };

                this.listenTo(this.pubSub, 'peoplelist:select', function(item) {
                    console.log('selected: ' + item.model.get('name'));
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
