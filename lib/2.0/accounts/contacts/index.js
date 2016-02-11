"use strict";
var files = require('./files');
var messages = require('./messages');
var threads = require('./threads');

module.exports = (function(_callService, account_id, email) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + account_id + '/contacts/';
  if (email) { resource += email + '/'; }

  return {
    get() {
      return _callService.get(resource);
    },

    files() {
      if(!email) {
        throw new Error("Missing required parameter email");
      }

      return files(_callService, account_id, email);
    },

    messages() {
      if(!email) {
        throw new Error("Missing required parameter email");
      }

      return messages(_callService, account_id, email);
    },

    threads() {
      if(!email) {
        throw new Error("Missing required parameter email");
      }

      return threads(_callService, account_id, email);
    }
  }

});
