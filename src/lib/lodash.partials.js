define(['lib/lodash.viewhelper', 'jquery', 'text!templates/partials.html'],
    function(_, $, tpl) {

        var $parts = $(tpl).filter('script');

        $parts.each(function(i, el) {
            var $el = $(el),
                name = $el.attr('id'),
                compiled = _.template($el.html());
            _.registerPartial(name, compiled);
        });

    });
