define(['jquery', './view', 'hbs!templates/add-people', ''],
    function($, View, tpl, PeopleListItem) {
        return View.extend({
            template: tpl,

            events: {
                'click [name=add]': 'add',
                'keypress [name=name]': 'add'
            },

            initialize: function() {
                this.setElement(this.template());
                this.$name = this.$('[name=name]');

                this.people = this.options.people;
            },

            add: function(e) {
                if (this.$name.val() == '') {
                    return true;
                }
                switch (e.type) {
                    case 'keypress':
                        if (!(e.which == $.KeyEvent.DOM_VK_RETURN)) {
                            return true;
                        }
                    case 'click':

                        this.people.create({
                            name: this.$name.val()
                        });
                        this.$name.val('');
                        break;
                }
            }
        });
    });
