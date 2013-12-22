define(['lodash', 'backbone_p',
    './api/google-plus', './api/facebook', './api/github',
    './api/stack-exchange', './api/twitter', './api/dropbox', 
    './api/microsoft-live'
], function(_, Backbone,
    googleplus, facebook, github, stackexchange, twitter, dropbox,
    microsoft) {

    var OAuthManager = function() {
        this.status = 'logged-out';
        this.apis = {};
    };

    _.extend(OAuthManager.prototype, Backbone.Events);

    OAuthManager.prototype.getStatus = function() {
        return status;
    };

    OAuthManager.prototype.addApi = function(apiName, apiManager) {
        this.apis[apiName] = apiManager;
    };

    OAuthManager.prototype.getApi = function(apiName) {
        return this.apis[apiName];
    };

    OAuthManager.prototype.getApis = function() {
        return this.apis;
    };

    OAuthManager.prototype.authenticate = function(apiName) {
        var self = this,
            conf = this.getApi(apiName),
            req = {};

        req = conf.authUri + '?' + _.map(conf.authParams, function(v, k) {
            return k + '=' + encodeURI(v);
        }).join('&');

        var poll,
            w = window.open(req, 'Google+ Login Window');

        (poll = function() {
            try {
                if (w.closed) {
                    return;
                }
                var hash = w.location.hash;
                if (hash != '' && hash.search(/access_token/)) {
                    var resp = {},
                        a = hash.substr(1).split('&'),
                        p = _.forEach(a, function(q) {
                            var k = q.split('=');
                            resp[k[0]] = k[1];
                        });
                    w.close();
                    if (!resp.error) {
                        self.authApi = apiName;
                        this.status = 'authenticated';
                        self.trigger('authenticate', resp);
                    } else {
                        this.status = error;
                        this.apiError = resp.error;
                        self.trigger('autherror', resp);
                    }
                    return;
                }
            } catch (e) {
                // console.log('not allowed to contact window');
            }
            setTimeout(poll, 100);
        })();
    };

    var manager = new OAuthManager();
    manager.addApi('google-plus', googleplus);
    manager.addApi('facebook', facebook);
    // manager.addApi('twitter', twitter);
    // manager.addApi('github', github);
    manager.addApi('stack-exchange', stackexchange);
    // manager.addApi('dropbox', dropbox);
    manager.addApi('windows', microsoft);

    return manager;
});
