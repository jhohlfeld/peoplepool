define(['lodash', 'backbone'], function(_, Backbone) {
    var config = {
        apiKey: 'AIzaSyDh_rzhrresLezNYiqhAnO4dZLKEoz0lJk',
        clientId: '498863542464-5rjn9g912doqridict2ron9b3bk15abm.apps.googleusercontent.com',
        scopes: 'https://www.googleapis.com/auth/plus.login email'
    };

    var ApiManager = function(el) {
        this.loadGapi();
        this.$el = $(el);
    };

    _.extend(ApiManager.prototype, Backbone.Events);

    ApiManager.prototype.init = function() {
        var self = this;
        gapi.client.setApiKey(config.apiKey);

        var checkAuth = function() {
        	if(!gapi.auth.getToken()) {
        		return handleAuthResult(null);
        	}
            gapi.auth.authorize({
                client_id: config.clientId,
                scope: config.scopes,
                immediate: true
            }, handleAuthResult);
        }

        var handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                self.$el.hide();
                makeApiCall();
            } else {
                self.$el.show();
                self.$el.on('click', handleAuthClick);
            }
        }

        var handleAuthClick = function(event) {
            gapi.auth.authorize({
                client_id: config.clientId,
                scope: config.scopes,
                immediate: false
            }, handleAuthResult);
            return false;
        }

        var makeApiCall = function() {
            gapi.client.load('plus', 'v1', function() {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function(resp) {
                    
                    console.log(resp);

                });
            });
        }

        window.setTimeout(checkAuth, 1);
    };

    ApiManager.prototype.loadGapi = function() {
        var self = this;

        // Don't load gapi if it's already present
        if (typeof gapi !== 'undefined') {
            return this.init();
        }

        require(['https://apis.google.com/js/client.js?onload=define'], function() {

            // Poll until gapi is ready
            function checkGAPI() {
                if (gapi && gapi.client) {
                    self.init();
                } else {
                    setTimeout(checkGAPI, 100);
                }
            }
            checkGAPI();
        });
    };

    return ApiManager;
});
