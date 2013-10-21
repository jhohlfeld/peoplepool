requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        lodash: 'lib/lodash',
        'backbone.localstorage': 'lib/backbone.localStorage',
        text: 'lib/requirejs-text',
        ldsh: 'lib/lodash-template-loader',
        bootstrap: 'lib/bootstrap',
        knockout: 'lib/knockout',
    },
    map: {
        '*': {
            underscore: 'lodash'
        }
    },
    shim: {
        'backbone.localstorage': {
            deps: ['lodash', 'backbone']
        },
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery']
        },
        knockout: {

        }
    }
});

require(['peoplepool', 'jquery',
        'lib/jquery.keyevent', 'lib/jquery.loadcss'
    ],
    function(app, $) {
        $.loadCSS([
            'css/peoplepool.css',
            '//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css'
        ]);

        new app.AppView().render();
    });
