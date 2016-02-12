"use strict";
var content = require('./content');
var related = require('./related');

module.exports = (function(_callService, account_id, file_id) {

  if(!account_id) {
    throw new Error("Missing required parameter 'account_id'");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/files/';

  if (file_id) {
    resource += encodeURIComponent(file_id) + '/';
  }

  return {
    get(params) {
      return _callService.get(resource, params);
    },

    content() {
      return content(_callService, account_id, file_id);
    },

    related() {
      return related(_callService, account_id, file_id);
    }
  }
});
