define(['./view', './people-list-item', 'hbs!templates/people-list'],
    function(View, PeopleListItemView, tpl) {
        var PeopleListView = View.extend({

            template: tpl,

            initialize: function() {
                this.setElement(this.template());
                this.$list = this.$('ul');

                this.people = this.options.people || null;
                // this.listenTo(this.pubSub, 'search:set', this.setupSearch, this);
                this.listenTo(this.people, 'add', this.render);

            },

            setupSearch: function(search) {
                // this.stopListening(this.people);
                // this.people = search.get('people');
                // this.listenTo(this.people, 'reset', this.render, this);
                // this.render();
            },

            addAll: function(people) {
                people.each(function(model) {
                    this.$el.append(new PeopleListItemView({
                        model: model
                    }).render().el);
                });
            },

            render: function() {
                var l = this.$list;
                l.html('');
                this.people.each(function(item) {
                    l.append(new PeopleListItemView({
                        model: item
                    }).render().el);
                });
                return this;
            }
        });

        return PeopleListView;
    });
