requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        'backbone_p': 'lib/backbone.plugin',
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
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'lib/bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['jquery',
        'backbone_p',
        'peoplepool',
        'lib/jquery.keyevent', 'lib/jquery.loadcss', 'lib/lodash.viewhelper',
        'lib/bootstrap'
    ],
    function($, bb, app) {
        $.loadCSS([
            'css/peoplepool.css',
            '//netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css'
        ]);

        new app.AppView().render();
    });
