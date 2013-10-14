define(['jquery', 'backbone', 'util/pubsub'], function($, Backbone, pubSub) {
    var View = Backbone.View.extend({

        pubSub: null,

        constructor: function() {
            this.pubSub = View.pubSub;

            Backbone.View.apply(this, arguments);
        }

    });

    View.pubSub = pubSub;

    return View;
});
