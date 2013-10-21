define(['lodash'], function(_) {
    var objOrKeyVal = function(args) {
        var value = args[0];
        if (args[0].constructor != Object && args.length == 2) {
            value = {};
            value[args[0]] = args[1];
        }
        return value;
    },
        viewHelpers = {
            partial: function(partialName, data) {
                var data = data || {},
                    a = arguments,
                    partial = _.template.partials[partialName];
                if (_.isFunction(partial)) return partial(data);
                else {
                    a[0] = partial;
                    return _.template.apply(this, a);
                }
            }
        };

    var origTemplateFunc = _.template;
    _.mixin({
        template: function(text, data, options) {
            var a = arguments;
            if (data) _.defaults(data, viewHelpers);
            var render = origTemplateFunc.apply(this, a);
            return (render.constructor == Function) ? function(data) {
                _.defaults(data, viewHelpers);
                return render(data);
            } : render;
        },

        registerViewHelper: function(helper) {
            _.extend(viewHelpers, objOrKeyVal(arguments));
        },

        registerPartial: function(partial) {
            _.extend(_.template.partials, objOrKeyVal(arguments));
        }
    });

    _.template.partials = {};

    return _;
});
