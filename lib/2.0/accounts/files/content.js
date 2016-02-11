"use strict";

module.exports = (function(_callService, account_id, file_id) {
  var resource = 'accounts/' + account_id + '/files/' + file_id + '/content' ;

  return {
    get(params) {
      if(params) {
        return _callService.getRaw(resource, params);
      } else {
        return _callService.getFile(resource)
      }
    }
  }
});
