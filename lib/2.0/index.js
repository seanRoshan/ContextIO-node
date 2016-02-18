"use strict";
var callService = require('../call-service')

//2.0 endpoints.
module.exports = (function(settings) {

  //Private Members
  var _callService

  //Public functions
  return new class {

    constructor() {
      if(!settings || !(settings.secret && settings.key)) {
        throw new Error("Oauth attribues 'secret' and 'key' are both required")
      }

      //Instantiate our callService
      _callService = new callService('2.0', settings)
    }

    accounts(account_id) {
      var resource = account_id ? 'accounts/' + encodeURIComponent(account_id) + '/' : 'accounts/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource),

        //Subresources
        connect_tokens(token) {
          resource += token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        }
      }
    }

    //Connect Tokens
    connect_tokens(token) {
      var resource = token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

    //Discovery
    discovery() {
      return {
        get: _callService.get.bind(this, 'discovery/')
      }
    }

    //OAuth Providers
    oauth_providers(key) {
      var resource = key ? 'oauth_providers/' + encodeURIComponent(key) + '/' : 'oauth_providers/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

  }()

})
