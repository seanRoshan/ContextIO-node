"use strict";

module.exports = (function(_callService, account_id, label, folder) {

  if(!folder) {
    throw new Error("Missing required parameter folder");
  }

  var resource = 'accounts/' + account_id + '/sources/' + label + '/folders/' + folder + '/expunge/';

  return {
    post() {
      return _callService.post(resource);
    }
  }

});
