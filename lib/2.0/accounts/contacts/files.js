"use strict";

module.exports = (function(_callService, account_id, email ) {

  if(!email) {
    throw new Error("Missing required parameter email");
  }

  var resource = 'accounts/' + account_id + '/contacts/' + email + '/files';

  return {
    get() {
      return _callService.get(resource);
    }
  }

});
