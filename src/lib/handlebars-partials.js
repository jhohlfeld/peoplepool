define(['text!templates/partials.html', 'handlebars', 'jquery'],
    function(tpl, Handlebars, $) {

        var $parts = $(tpl).filter('script');

        $parts.each(function(i, el) {
            var $el = $(el);
            Handlebars.registerPartial($el.attr('id'), $el.html());
        });
        
    });
