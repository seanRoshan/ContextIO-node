"use strict";
var expunge = require('./expunge');
var messages = require('./messages');

module.exports = (function(_callService, account_id, label, folder) {

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/sources/' + encodeURIComponent(label) + '/folders/';

  if (folder) {
    resource += encodeURIComponent(folder) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    delete() {
      if(!folder) {
        throw new Error("Missing required parameter folder");
      }

      return _callService.delete(resource);
    },

    put(body) {
      return _callService.put(resource, body);
    },

    expunge() {
      return expunge(_callService, account_id, label, folder);
    },

    messages(async_job_id) {
      return messages(_callService, account_id, label, folder, async_job_id);
    }
  }

});
