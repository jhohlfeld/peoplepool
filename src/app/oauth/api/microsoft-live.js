define(['lodash', 'backbone'], function(_, Backbone) {

    var config = {
        name: 'Microsoft Live',
        authParams: {
            response_type: 'token',
            client_id: '000000004C10C936',
            redirect_uri: 'http://jakob-ThinkPad-T430s.local:4000/blank.html',
            scope: 'wl.basic'
        },
        authUri: 'https://login.live.com/oauth20_authorize.srf'
    };

    return config;
});
