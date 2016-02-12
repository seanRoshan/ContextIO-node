"use strict";

module.exports = (function(_callService, account_id, message_id ) {

  if(!message_id) {
    throw new Error("Missing required parameter 'message_id'");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/messages/' + encodeURIComponent(message_id) + '/flags';

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    }
  }

});
