"use strict";

module.exports = (function(_callService, account_id, message_id ) {
  var resource = 'accounts/' + account_id + '/messages/' + message_id + '/source';

  return {
    get() {
      return _callService.get(resource);
    }
  }

});
