define(['lodash', 'backbone', 'when',
    './google-plus', './facebook', './microsoft-live', './stack-exchange'
], function(_, Backbone, when) {

    // provider profiles may be added beyond the third depenednecy
    var profiles = _.values(arguments).slice(3);

    /**
     * Auth provider profile.
     *
     * Authentication providers are organized in profiles
     * which extend from {oauth.Profile}.
     *
     * By overriding individual methods, it's possible to
     * customize the behavior of the authentication process.
     *
     * @class Profile
     */
    var Profile = function(config) {
        this.config = config;
        this.name = config.name;
    };

    /**
     * Extend.
     *
     * Creates a new class based on {Profile}. Used to
     * define new authentication provider profiles.
     *
     * @method extend
     */
    Profile.extend = function(protoProperties) {
        var cls = Profile;
        cls.prototype = _.extend(cls.prototype, protoProperties);
        return cls;
    };

    /**
     * Form the auth request.
     *
     * With this method, it's possible to override the behavior
     * how requests are formed.
     *
     * @method formRequest
     * @return {String} the request url with parameters
     */
    Profile.prototype.formRequest = function() {
        return this.config.authUri + '?' + _.map(this.config.authParams, function(v, k) {
            return k + '=' + encodeURI(v);
        }).join('&');
    };

    /**
     * Request.
     *
     * Do the request.
     *
     * @method request
     * @param {Window} A popup window instance
     */
    Profile.prototype.request = function(w) {
        w.location.href = this.formRequest();
        var deferred = when.defer(),
            poll,
            resp,
            self = this;
        (poll = function() {
            try {
                resp = self.fetchResponse(w);
            } catch (e) {}
            if (_.isObject(resp)) {
                w.close();
                resp = self.handleResponse(resp);
                if (!resp.error) {
                    deferred.resolve(resp);
                } else {
                    deferred.reject(resp);
                }
                return;
            }
            setTimeout(poll, 100);
        })();
        return deferred.promise;
    };

    /**
     * A way to fetch the response from the auth window.
     *
     * By overriding this method, it's possible to define
     * how authentication responses are extracted from
     * the client window.
     *
     * @method fetchResponse
     */
    Profile.prototype.fetchResponse = function(w) {
        var hash = w.location.hash,
            resp;
        if (hash.search(/access_token/) != -1) {
            resp = {};
            var a = hash.substr(1).split('&'),
                p = _.forEach(a, function(q) {
                    var k = q.split('=');
                    resp[k[0]] = k[1];
                });
        }
        return resp;
    };

    /**
     * Handle auth response.
     *
     * By overriing this, responses may be post-processed.
     *
     * @method handleResponse
     */
    Profile.prototype.handleResponse = function(resp) {
        return resp;
    };

    /**
     * Initialize all profiles.
     *
     * Authentication provider profiles are stored in a dictionary
     * for future reference.
     */
    Profile.apis = {};
    profiles.forEach(function(p) {
        p.init(Profile);
    });

    return {
        Profile: Profile,
        request: function(api, event) {
            var w = window.open();
            api.request(w).then(function(resp) {
                console.log('yey authenticated!');
                console.log(resp);
            });
        },
        getApis: function(keys) {
            return _.pick(Profile.apis, keys);
        }
    };
});
