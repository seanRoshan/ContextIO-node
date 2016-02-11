"use strict";

module.exports = (function(_callService, account_id, email ) {
  var resource = 'accounts/' + account_id + '/contacts/' + email + '/files';

  return {
    get() {
      return _callService.get(resource);
    }
  }

});
