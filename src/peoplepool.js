define(['lib/backbone.plugin',
        'views/view', 'views/people-list', 'views/add-people',
        'views/people-item', 'views/master',
        'models/models',
        'lib/lodash.partials'
    ],
    function(Backbone, 
        View, PeopleListView, AddPeople,
        PeopleItem, MasterView,
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

                this.masterView = new MasterView();
            },

            render: function() {
                var $mv = this.masterView.render().$el;
                $mv.find('#mainview').append(
                    this.views.peopleList.render().el,
                    this.views.addPeople.render().el);
                $mv.find('#sidebar').append(
                    this.views.peopleItem.render().el);
                $mv.appendTo(this.$el.html(''));
            },
        });

        app.PeopleList = Backbone.Collection.extend({
            model: models.Person,

            localStorage: new Backbone.LocalStorage('people-backbone'),

            comparator: 'name'
        });

        return app;
    });
