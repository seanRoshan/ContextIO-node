"use strict";
var callService = require('../call-service');

//Endpoints
var accounts = require('./accounts');
var connect_tokens = require('./connect_tokens');
var discovery = require('./discovery');
var oauth_providers = require('./oauth_providers');

//2.0 endpoints. Resource names such as connect_tokens() are aliased as connectTokens().
module.exports = (function(settings) {

  // Private Members
  var _callService;

  // Public functions
  return new class {

    constructor() {
      if(!settings || !(settings.secret && settings.key)) {
        throw new Error("Oauth attribues 'secret' and 'key' are both required");
      }

      //Instantiate our callService
      _callService = new callService('2.0', settings);
    }

    //Accounts
    accounts(account_id) {
      return accounts(_callService, account_id);
    }

    //Connect Tokens
    connect_tokens(token) {
      return connect_tokens(_callService, token);
    }

    connectTokens(token) {
      return connect_tokens(_callService, token);
    }

    // Discovery
    discovery() {
      return discovery(_callService);
    }

    //OAuth Providers
    oauth_providers(key) {
      return oauth_providers(_callService, key);
    }

    oauthProviders(key) {
      return oauth_providers(_callService, key);
    }

  }();

});
