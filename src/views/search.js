define(['./view', 'ldsh!templates/search'], function(View, tpl) {
    var SearchView = View.extend({

        template: tpl,

        events: {
            'submit': 'publish'
        },

        initialize: function() {
            this.setElement(this.template());
        },

        publish: function() {
            // this.pubSub.trigger('search:criteria', {
            //     retweets: this.$('retweets').val()
            // });
        }
    });

    return SearchView;
});
