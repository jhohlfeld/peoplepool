define(['underscore', 'backbone'], function(_, Backbone) {
    var pubSub = _.extend({}, Backbone.Events);
    return pubSub;
});
