"use strict";

module.exports = (function(_callService, account_id) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + account_id + '/sync/';

  return {
    get() {
      return _callService.get(resource);
    },

    post() {
      return _callService.post(resource);
    }
  }
});
