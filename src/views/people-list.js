define(['underscore', './view', './people-list-item',
        'hbs!templates/people-list'
    ],
    function(_, View, PeopleListItemView, tpl) {
        var PeopleListView = View.extend({

            template: tpl,

            items: [],

            orderIndex: {},

            selectedCurrent: null,

            initialize: function() {
                this.setElement(this.template());
                this.$list = this.$('.people-list__item-list');

                this.people = this.options.people || null;
                this.listenTo(this.people, 'add', function(model) {
                    this.add(model);
                    this.render();
                });

                this.addAll(this.people);
            },

            add: function(model) {
                var view = new PeopleListItemView({
                    model: model
                });
                this.listenTo(view, 'click', this.select);
                this.items.push(view)
                this.orderIndex[model.cid] = view;
            },

            addAll: function(collection) {
                collection.each(function(model) {
                    this.add(model);
                }, this);
            },

            render: function() {
                var l = this.$list;
                l.html('');
                this.people.forEach(function(model) {
                    l.append(this.orderIndex[model.cid].render().el);
                }, this);
                return this;
            },

            select: function(selItem) {
                if (selItem == this.selectedCurrent) {
                    selItem.select(false);
                    this.selectedCurrent = null;
                    this.pubSub.trigger('peoplelist:unselect', selItem);
                    return;
                }
                if(this.selectedCurrent) {
                    this.selectedCurrent.select(false);
                }
                this.pubSub.trigger('peoplelist:unselect',
                    this.selectedCurrent);
                this.pubSub.trigger('peoplelist:select', selItem);
                this.selectedCurrent = selItem;
                this.selectedCurrent.select(true);
            }
        });

        return PeopleListView;
    });
