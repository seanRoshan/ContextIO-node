"use strict";

module.exports = (function(_callService, account_id, message_id ) {
  var resource = 'accounts/' + account_id + '/messages/' + message_id + '/flags';

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    }
  }

});
