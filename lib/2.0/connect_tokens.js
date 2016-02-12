"use strict";

module.exports = (function(_callService, token) {

  var resource = 'connect_tokens/';

  if (token) {
    resource += encodeURIComponent(token) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete() {
      if(!token) {
        throw new Error("Missing required parameter 'token'");
      }

      return _callService.delete(resource);
    }
  }

});
