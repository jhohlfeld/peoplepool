requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        lodash: 'lib/lodash',
        text: 'lib/requirejs-text',
        ldsh: 'lib/lodash-template-loader',
        bootstrap: 'lib/bootstrap',
    },
    map: {
        '*': {
            underscore: 'lodash'
        }
    },
    shim: {
        'lib/backbone.localstorage': {
            deps: ['lodash', 'backbone']
        },
        'lib/backbone.epoxy': {
            deps: ['backbone']
        },
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

require(['peoplepool', 'jquery',
        'lib/jquery.keyevent', 'lib/jquery.loadcss', 'lib/lodash.viewhelper'
    ],
    function(app, $) {
        $.loadCSS([
            'css/peoplepool.css',
            '//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css'
        ]);

        new app.AppView().render();
    });
