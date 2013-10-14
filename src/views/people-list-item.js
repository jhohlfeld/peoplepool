define(['underscore', './view', 'hbs!templates/people-list-item'],
    function(_, View, tpl) {
        return View.extend({

            template: tpl,
            isSelected: false,

            events: {
                'click': 'onClick'
            },

            initialize: function() {
                this.setElement(this.template(this.model.attributes));
            },

            select: function(selected) {
                this.isSelected = selected;
                this.$el[(this.isSelected ? 'add' : 'remove') + 'Class']('active');
                this.trigger('select', this.isSelected);
            },

            onClick: function() {
                this.trigger('click', this);
            }
        });
    });
