define(['jquery'], function($) {
    var loadCSS = function(url, callback) {
        var f = function(u) {
            var m, type = (m = u.match(/.(\w+)$/)) ? m[1] : 'css',
                rel = 'stylesheet' + (type == 'css' ? '' : '/' + type);
            $('<link>', {
                rel: rel,
                type: 'text/css',
                'href': u
            }).on('load', function() {
                if (typeof callback == 'function') callback();
            }).appendTo('head');
        }
        if (typeof url == 'String') {
            f(u, callback);
        } else if (url instanceof Array) {
            url.forEach(function(v) {
                f(v, callback);
            });
        }
    };
    $.extend({
        loadCSS: loadCSS
    });
    return loadCSS;
});
