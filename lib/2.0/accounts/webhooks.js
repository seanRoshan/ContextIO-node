"use strict";

module.exports = (function(_callService, account_id, webhook_id) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/webhooks/';

  if (webhook_id) {
    resource += encodeURIComponent(webhook_id) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete() {
      if(!webhook_id) {
        throw new Error("Missing required parameter 'webhook_id'");
      }

      return _callService.delete(resource);
    }
  }

});
