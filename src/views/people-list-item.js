define(['lodash', 'app/common/view', 'ldsh!templates/people-list-item'],
    function(_, View, tpl) {
        return View.extend({

            template: tpl,
            isSelected: false,

            events: {
                'click': 'onClick'
            },

            initialize: function() {

            },

            render: function() {
                this.setElement(this.template(this.model.attributes));
                this._selState();
                return this;
            },

            select: function(selected) {
                this.isSelected = selected;
                this._selState();
                this.trigger('select', this.isSelected);
            },

            _selState:function() {
                this.$el[(this.isSelected ? 'add' : 'remove') + 'Class']('active');
            },

            onClick: function() {
                this.trigger('click', this);
            }
        });
    });
