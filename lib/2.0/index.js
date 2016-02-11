"use strict";
var callService = require('../call-service');

//Endpoints
var accounts = require('./resources/accounts');
var connect_tokens = require('./resources/connect_tokens');
var discovery = require('./resources/discovery');
var oauth_providers = require('./resources/oauth_providers');

module.exports = (function(consumer) {
  // Private Members
  var _callService;

  // Public class ClientV2
  return new class {

    constructor() {
      if(!consumer || !(consumer.secret && consumer.key)) {
        throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
      }
      _callService = new callService('2.0', consumer);
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
