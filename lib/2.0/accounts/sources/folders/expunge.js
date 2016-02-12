"use strict";

module.exports = (function(_callService, account_id, label, folder) {

  if(!folder) {
    throw new Error("Missing required parameter folder");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/sources/' + encodeURIComponent(label) + '/folders/' + encodeURIComponent(folder) + '/expunge/';

  return {
    post() {
      return _callService.post(resource);
    }
  }

});
