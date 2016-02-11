"use strict";

module.exports = (function(_callService, account_id, message_id ) {
  var resource = 'accounts/' + account_id + '/messages/' + message_id + '/body';

  return {
    get(params) {
      return _callService.get(resource, params);
    }
  }

});
