"use strict";
var connect_tokens = require('./resources/connect_tokens');
var email_addresses = require('./resources/email_addresses');
var files = require('./resources/files');

module.exports = (function(_callService, account_id) {
  var resource = 'accounts/';
  if (account_id) { resource += account_id + '/'; }

  return {
    get(params) {
      return _callService.get(resource, params);
    },

    post(body, params) {
      return _callService.post(resource, body, params);
    },

    delete() {
      if(!account_id) {
        throw new Error("Missing required parameter id");
      }
      return _callService.delete(resource);
    },

    //Connect Tokens
    connect_tokens(token) {
      return connect_tokens(_callService, account_id, token);
    },

    connectTokens(token) {
      return connect_tokens(_callService, account_id, token);
    },

    //Email Addresses
    email_addresses(address) {
      return email_addresses(_callService, account_id, address)
    },

    emailAddress(address) {
      return email_addresses(_callService, account_id, address)
    },


  }

});
