define(['lodash'], function(_) {
    var config = {
        name: 'Stack Exchange',
        authUri: 'https://stackexchange.com/oauth/dialog',
        authParams: {
            client_id: '2388',
            redirect_uri: 'http://localhost:4000/blank.html',
            scope: '',
            state: ''   // unguessable random string!
        }
    };

    return config;
});
