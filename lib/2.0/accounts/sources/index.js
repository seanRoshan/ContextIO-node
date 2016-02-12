"use strict";
var folders = require('./folders');

module.exports = (function(_callService, account_id, label) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/sources/';

  if (label) {
    resource += encodeURIComponent(label) + '/';
  }

  return {
    get(params) {
      return _callService.get(resource, params);
    },

    post(body) {
      return _callService.get(resource, body);
    },

    delete() {
      if(!label) {
        throw new Error("Missing required parameter label");
      }

      return _callService.delete(resource);
    },

    folders(folder) {
      return folders(_callService, account_id, label, folder);
    }
  }

});
