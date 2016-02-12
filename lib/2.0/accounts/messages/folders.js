"use strict";

module.exports = (function(_callService, account_id, message_id ) {

  if(!message_id) {
    throw new Error("Missing required parameter message_id");
  }

  var resource = 'accounts/' + account_id + '/messages/' + message_id + '/folders';

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    put(body) {
      return _callService.put(resource, body);
    }
  }

});
