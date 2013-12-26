define(['lodash'], function(_) {
    var config = {
        name: 'Stack Exchange',
        authUri: 'https://stackexchange.com/oauth/dialog',
        authParams: {
            client_id: '2388',
            redirect_uri: 'http://dev.peoplepool.netronaut.de:4000/blank.html',
            scope: '',
            state: '' // unguessable random string!
        }
    };

    return {
        init: function(Profile) {
            return Profile.apis['stack-exchange'] = new Profile(config);
        }
    };
});
