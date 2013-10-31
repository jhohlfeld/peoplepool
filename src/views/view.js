define(['jquery', 'lib/backbone.plugin', 'util/pubsub'], function($, Backbone, pubSub) {
    var View = Backbone.Epoxy.View.extend({

        pubSub: null,

        constructor: function() {
            this.pubSub = View.pubSub;

            Backbone.Epoxy.View.apply(this, arguments);
        }

    });

    View.pubSub = pubSub;

    return View;
});
