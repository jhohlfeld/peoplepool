requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        lodash: 'lib/lodash',
        text: 'lib/requirejs-text',
        ldsh: 'lib/lodash-template-loader',
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
        'lib/bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['peoplepool', 'jquery',
        'lib/jquery.keyevent', 'lib/jquery.loadcss', 'lib/lodash.viewhelper',
        'lib/bootstrap'
    ],
    function(app, $) {
        $.loadCSS([
            'css/peoplepool.css',
            '//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css'
        ]);

        new app.AppView().render();
    });
