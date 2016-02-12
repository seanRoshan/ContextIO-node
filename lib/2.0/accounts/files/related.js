"use strict";

module.exports = (function(_callService, account_id, file_id) {

  if(!file_id) {
    throw new Error("Missing required parameter file_id");
  }

  var resource = 'accounts/' + account_id + '/files/' + file_id + '/related' ;

  return {
    get() {
      return _callService.get(resource);
    }
  }
});
