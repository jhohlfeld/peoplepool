define(['lodash'], function(_) {
    var config = {
        name: 'Facebook',
        authUri: 'https://www.facebook.com/dialog/oauth',
        authParams: {
            app_id: '568262759920841',
            client_id: 'ce767453b23218cdaf145b8dbb2aede7',
            redirect_uri: 'http://dev.peoplepool.netronaut.de:4000/blank.html',
            response_type: 'token',
            scope: 'email'
        }
    };

    return {
        init: function(Profile) {
            return Profile.apis['facebook'] = new Profile(config);
        }
    };
});
