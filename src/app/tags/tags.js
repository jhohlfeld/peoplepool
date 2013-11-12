define(['backbone_p', 'jquery', 'lodash'], function(Backbone, $, _) {
    // return Backbone.View.extend({
    //     el: '<span><input type="text" value="eins,zwei" class="form-control" /></span>',
    //     initialize: function() {
    //         this.$input = this.$('input');
    //         this.$input.tagsinput();
    //         this.$input.tagsinput('input').typeahead({
    //             local: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
    //         }).on('typeahead:selected', _.bind(function(obj, data) {
    //             this.$input.tagsinput('add', data.value);
    //             this.$input.tagsinput('input').typeahead('setQuery', '');
    //         }, this));
    //     }
    // });

    return Backbone.View.extend({
        el: '<div class="form-group"><input class="form-control input-sm" multiple="1" /></div>',
        initialize: function() {
            this.$('.form-control').select2({
                tags: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo'],
                tokenSeparators: [',', ' ']
            });
        }
    });
});
