"use strict";
var connect_tokens = require('./connect_tokens');
var contacts = require('./contacts');
var email_addresses = require('./email_addresses');
var files = require('./files');
var messages = require('./messages');
var sources = require('./sources');
var sync = require('./sync');
var webhooks = require('./webhooks');

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

    //Contacts
    contacts(email) {
      return contacts(_callService, account_id, email);
    },

    //Email Addresses
    email_addresses(email) {
      return email_addresses(_callService, account_id, email)
    },

    emailAddress(email) {
      return email_addresses(_callService, account_id, email)
    },

    //Files
    files(file_id) {
      return files(_callService, account_id, file_id)
    },

    //Messages
    messages(message_id) {
      return messages(_callService, account_id, message_id);
    },

    //Sources
    sources(label) {
      return sources(_callService, account_id, label);
    },

    //Sync
    sync() {
      return sync(_callService, account_id);
    },

    //Webhooks
    webhooks(webhook_id) {
      return webhooks(_callService, account_id, webhook_id);
    },
  }

});
