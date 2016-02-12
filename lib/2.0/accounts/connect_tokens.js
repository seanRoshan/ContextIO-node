"use strict";

module.exports = (function(_callService, account_id, token) {

  if(!account_id) {
    throw new Error("Missing required parameter 'account_id'");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/connect_tokens/';

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
