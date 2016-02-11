"use strict";
var content = require('./content');
var related = require('./related');

module.exports = (function(_callService, account_id, file_id) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + account_id + '/files/';

  if (file_id) { resource += file_id + '/'; }

  return {
    get(params) {
      return _callService.get(resource, params);
    },

    content(params) {
      if(!file_id) {
        throw new Error("Missing required parameter file_id");
      }

      return content(_callService, account_id, file_id);
    },

    related() {
      if(!file_id) {
        throw new Error("Missing required parameter file_id");
      }

      return related(_callService, account_id, file_id);
    }
  }
});
