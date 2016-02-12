"use strict";

module.exports = (function(_callService, account_id, email) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + 'email_addresses/';

  if (email) {
    resource += encodeURIComponent(email) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete() {
      if(!email) {
        throw new Error("Missing required parameter email address");
      }
      
      return _callService.delete(resource);
    }
  }
});
