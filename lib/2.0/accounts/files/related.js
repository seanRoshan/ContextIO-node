"use strict";

module.exports = (function(_callService, account_id, file_id) {
  var resource = 'accounts/' + account_id + '/files/' + file_id + '/related' ;

  return {
    get() {
      return _callService.get(resource);
    }
  }
});
