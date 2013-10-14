define(['jquery'], function($) {
    var loadCSS = function(url, callback) {
        $('<link>', {
            rel: 'stylesheet',
            type: 'text/css',
            'href': url
        }).on('load', function() {
            if (typeof callback == 'function') callback();
        }).appendTo('head');
    };
    $.extend({
        loadCSS: loadCSS
    });
    return loadCSS;
});
