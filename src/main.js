requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars',
        'backbone.localstorage': 'lib/backbone.localStorage',
        text: 'lib/requirejs-text',
        hbs: 'lib/requirejs-hbs',
        bootstrap: 'lib/bootstrap',
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
        },
        bootstrap: {
            deps: ['jquery']
        },
        'lib/less': {
            exports: 'less'
        }
    }
});

require(['peoplepool', 'jquery',
        'bootstrap',
        'lib/handlebars-helper', 'lib/handlebars-partials',
        'lib/jquery.keyevent', 'lib/jquery.loadcss'
    ],
    function(app, $) {
        $.loadCSS([
            // '//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.no-icons.min.css',
            'less/style.less',
            '//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css',
            // 'css/peoplepool.css'
        ]);

        // less has to be loaded after LESS file
        require(['lib/less']);

        new app.AppView().render();
    });
