define(['lodash', 'backbone'], function(_, Backbone) {

    var config = {
        name: 'Google Plus',
        authParams: {
            response_type: 'token',
            client_id: '498863542464-5rjn9g912doqridict2ron9b3bk15abm.apps.googleusercontent.com',
            redirect_uri: 'http://dev.peoplepool.netronaut.de:4000/blank.html',
            scope: 'profile email'
        },
        authUri: 'https://accounts.google.com/o/oauth2/auth'
    };

    return {
        init: function(Profile) {
            var GooglePlus = Profile.extend();
            Profile.apis['google-plus'] = new GooglePlus(config);
        }
    }
});
