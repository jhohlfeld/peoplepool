requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery/jquery',
        backbone: 'lib/backbone/backbone',
        'backbone_p': 'lib/backbone.plugin',
        lodash: 'lib/lodash/lodash.compat',

        bootstrap: 'lib/bootstrap/bootstrap',
        typeahead: 'lib/typeahead.js/typeahead',
        'backbone.epoxy': 'lib/backbone.epoxy/backbone.epoxy',
        'backbone.localStorage': 'lib/backbone.localStorage/backbone.localStorage',

        /* requirejs plugins */
        ldsh: 'lib/lodash-template-loader/loader',
        async: 'lib/requirejs-plugins/async',
        font: 'lib/requirejs-plugins/font',
        goog: 'lib/requirejs-plugins/goog',
        image: 'lib/requirejs-plugins/image',
        json: 'lib/requirejs-plugins/json',
        noext: 'lib/requirejs-plugins/noext',
        mdown: 'lib/requirejs-plugins/mdown',
        text: 'lib/requirejs-plugins/text',
        propertyParser: 'lib/requirejs-plugins/propertyParser',
        markdownConverter: 'lib/requirejs-plugins/Markdown.Converter',
    },
    map: {
        '*': {
            underscore: 'lodash'
        }
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'lib/bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'app/gplus/api', 'lib/jquery.plugin'],
    function($, App) {
        $.loadCSS([
            'css/peoplepool.css',
            '//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css'
        ]);

        var authButton = $('<a>Login with GPlus</a>').appendTo($('body'));
        new App(authButton);
    });
