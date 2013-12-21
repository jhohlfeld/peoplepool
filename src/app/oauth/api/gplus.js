define(['lodash', 'backbone'], function(_, Backbone) {

    var config = {
        name: 'Google+ API',
        signInButton: '/images/gplus_signin.png',
        authParams: {
            response_type: 'token',
            client_id: '498863542464-5rjn9g912doqridict2ron9b3bk15abm.apps.googleusercontent.com',
            redirect_uri: 'http://localhost:4000/blank.html',
            scope: 'profile email'
            // clientId: '498863542464-5rjn9g912doqridict2ron9b3bk15abm.apps.googleusercontent.com',
            // apiKey: 'AIzaSyDh_rzhrresLezNYiqhAnO4dZLKEoz0lJk',
            // scopes: 'profile email'
        },
        authUri: 'https://accounts.google.com/o/oauth2/auth'
    };

    return config;
});
