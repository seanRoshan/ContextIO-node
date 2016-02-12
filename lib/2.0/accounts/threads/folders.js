"use strict";

module.exports = (function(_callService, account_id, thread_id ) {

  if(!thread_id) {
    throw new Error("Missing required parameter thread_id");
  }
  
  var resource = 'accounts/' + account_id + '/threads/' + thread_id + '/folders';

  return {
    post(body) {
      return _callService.post(resource, body);
    },

    put(body) {
      return _callService.put(resource, body);
    }
  }

});
