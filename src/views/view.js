define(['jquery', 'backbone', 'util/pubsub'], function($, Backbone, pubSub) {
    var View = Backbone.View.extend({

        constructor: function() {
            Backbone.View.apply(this, arguments);
            this.pubSub = this.options.pubSub || this.pubSub;
        }

    });

    View.pubSub = pubSub;

    return View;
});
