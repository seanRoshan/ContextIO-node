"use strict";

module.exports = (function(_callService, account_id, address) {

  if(!account_id) {
    throw new Error("Missing required parameter id");
  }

  var resource = 'accounts/' + account_id + 'email_addresses/';
  if (address) { resource += addresses + '/'; }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete() {
      if(!address) {
        throw new Error("Missing required parameter email address");
      }
      return _callService.delete(resource);
    }
  }
});
