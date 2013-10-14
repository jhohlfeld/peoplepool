requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars',
        'backbone.localstorage': 'lib/backbone.localStorage',
        text: 'lib/requirejs-text',
        hbs: 'lib/requirejs-hbs'
    },
    hbs: {
        templateExtension: ".html"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        'backbone.localstorage': {
            deps: ['underscore', 'backbone']
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(['peoplepool', 'jquery', 'backbone.localstorage',
        'lib/jquery.keyevent', 'lib/jquery.loadcss'
    ],
    function(app, $) {
        $.loadCSS([
            '//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css',
            'css/peoplepool.css'
        ]);
        new app.AppView().render();
    });
