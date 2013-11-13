define(['backbone_p', 'jquery', 'lodash'], function(Backbone, $, _) {
    return Backbone.View.extend({
        el: '<div class="form-group"><input type="text" value="eins,zwei" class="form-control" /></div>',
        initialize: function() {
            this.$input = this.$('input');
            this.$input.tagsinput({
                confirmKeys: [$.KeyEvent.DOM_VK_RETURN, $.KeyEvent.DOM_VK_TAB]
            });

            // add typeahead support
            this.$input.tagsinput('input').typeahead({
                local: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
            }).on('typeahead:selected', _.bind(function(obj, data) {
                this.$input.tagsinput('add', data.value);
                this.$input.tagsinput('input').typeahead('setQuery', '');
            }, this));

            // fix typeahead to forget queries that didn't make it into tags 
            this.$('.tt-query').on('blur', function(e) {
                e.target.value = '';
            });
        }
    });
});
