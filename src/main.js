requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        handlebars: 'lib/handlebars',
        'backbone.localstorage' : 'lib/backbone.localStorage',
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
        'backbone.localstorage':{
            deps:['underscore', 'backbone']
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

require(['peoplepool', 'backbone.localstorage', 'lib/jquery.keyevent'],
    function(app) {
        new app.AppView().render();
    });
