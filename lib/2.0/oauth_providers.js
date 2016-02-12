"use strict";

module.exports = (function(_callService, key) {

  var resource = 'oauth_providers/';

  if (key) {
    resource += encodeURIComponent(key) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete(params) {
      if(!key) {
        throw new Error("Missing required parameter key");
      }
      
      return _callService.delete(resource);
    }
  }

});
