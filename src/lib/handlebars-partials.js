define(['text!templates/partials.html', 'handlebars', 'jquery'],
    function(tpl, Handlebars, $) {

        var $parts = $(tpl).filter('script');

        $parts.each(function(i, el) {
            var $el = $(el),
                name = $el.attr('id'),
                compiled = Handlebars.compile($el.html());
            Handlebars.registerPartial(name, compiled);
        });

    });
