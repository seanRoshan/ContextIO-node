"use strict";
var folders = require('./folders');

module.exports = (function(_callService, account_id, thread_id) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + account_id + '/threads/';

  if (thread_id) {
    resource += thread_id + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    delete() {
      if(!thread_id) {
        throw new Error("Missing required parameter thread_id");
      }
      return _callService.delete(resource);
    },

    folders() {
      return folders(_callService, account_id, thread_id);
    }
  }

});
