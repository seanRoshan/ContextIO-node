"use strict";
var callService = require('./call-service');

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

    // Accounts
    accounts(account_id) {
      var resource = 'accounts/';
      if (account_id) { resource += account_id + '/'; }

      return {
        get(params) {
          return _callService.get(resource, params);
        },

        post(body, params) {
          return _callService.post(resource, body, params);
        },

        delete() {
          if(!account_id) {
            throw new Error("Missing required parameter id");
          }
          return _callService.delete(resource);
        },

        // accounts/connect_tokens
        connect_tokens(token) {

          if(!account_id) {
            throw new Error("Missing required parameter id");
          }

          resource += 'connect_tokens/';
          if (token) { resource += token + '/'; }

          return {
            get() {
              return _callService.get(resource);
            },

            post(body) {
              return _callService.post(resource, body);
            },

            delete() {
              if(!token) {
                throw new Error("Missing required parameter token");
              }
              return _callService.delete(resource);
            }
          }
        },
        // end accounts/connect_tokens

        // accounts/connect_tokens
        contacts(email) {

          if(!account_id) {
            throw new Error("Missing required parameter id");
          }

          resource += 'contacts/';
          if (email) { resource += email + '/'; }

          return {
            get(params) {
              return _callService.get(resource, params);
            },

            files() {

              if(!email) {
                throw new Error("Missing required parameter email");
              }

              resource += 'files/';
              console.log(resource)

              return {
                get(params) {
                  return _callService.get(resource, params);
                }
              }
            },

            messages() {

              if(!email) {
                throw new Error("Missing required parameter email");
              }

              resource += 'messages/';
              console.log(resource)

              return {
                get(params) {
                  return _callService.get(resource, params);
                }
              }
            },

            threads() {

              if(!email) {
                throw new Error("Missing required parameter email");
              }

              resource += 'threads/';
              console.log(resource)

              return {
                get(params) {
                  return _callService.get(resource, params);
                }
              }
            }
          }
        }
        // end accounts/connect_tokens

      }
    }
    //End Accounts

    // Connect Tokens
    connect_tokens(token) {
      var resource = 'connect_tokens/';
      if (token) { resource += token + '/'; }

      return {
        get() {
          return _callService.get(resource);
        },

        post(body) {
          return _callService.post(resource, body);
        },

        delete() {
          if(!token) {
            throw new Error("Missing required parameter token");
          }
          return _callService.delete(resource);
        }
      }
    }
    //End Connect Tokens

    // Discovery
    discovery() {
      var resource = 'discovery/';

      return {
        get(params) {
          return _callService.get(resource, params);
        }
      }
    }
    //End Discovery

    // Oauth Providers
    oauth_providers(key) {
      var resource = 'oauth_providers/';
      if (key) { resource += key + '/'; }

      return {
        get() {
          return _callService.get(resource);
        },

        post(body) {
          return _callService.get(resource);
        },

        delete(params) {
          if(!key) {
            throw new Error("Missing required parameter key");
          }
          return _callService.delete(resource);
        }
      }
    }
    //End Oauth Providers

  }();

});
