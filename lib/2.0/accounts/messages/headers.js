"use strict";

module.exports = (function(_callService, account_id, message_id ) {

  if(!message_id) {
    throw new Error("Missing required parameter message_id");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/messages/' + encodeURIComponent(message_id) + '/headers';

  return {
    get(params) {
      return _callService.get(resource, params);
    }
  }

});
