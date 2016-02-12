"use strict";
var body = require('./body');
var flags = require('./flags');
var folders = require('./folders');
var headers = require('./headers');
var source = require('./source');
var thread = require('./thread');

module.exports = (function(_callService, account_id, message_id) {

  if(!account_id) {
    throw new Error("Missing required parameter 'account_id'");
  }

  var resource = 'accounts/' + encodeURIComponent(account_id) + '/messages/';

  if (message_id) {
    resource += encodeURIComponent(message_id) + '/';
  }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      return _callService.post(resource, body);
    },

    delete(body) {
      if(!message_id) {
        throw new Error("Missing required parameter 'message_id'");
      }

      return _callService.delete(resource);
    },

    body() {
      return body(_callService, account_id, message_id);
    },

    flags() {
      return flags(_callService, account_id, message_id);
    },

    folders() {
      return folders(_callService, account_id, message_id);
    },

    headers() {
      return headers(_callService, account_id, message_id);
    },

    source() {
      return source(_callService, account_id, message_id);
    },

    thread() {
      return thread(_callService, account_id, message_id);
    }

  }

});
