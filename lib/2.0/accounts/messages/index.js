"use strict";
var body = require('./body');
var flags = require('./flags');
var folders = require('./folders');
var headers = require('./headers');
var source = require('./source');
var thread = require('./thread');

module.exports = (function(_callService, account_id, message_id) {

  if(!account_id) {
    throw new Error("Missing required parameter account_id");
  }

  var resource = 'accounts/' + account_id + '/messages/';
  if (message_id) { resource += message_id + '/'; }

  return {
    get() {
      return _callService.get(resource);
    },

    post(body) {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return _callService.post(resource);
    },

    delete(body) {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return _callService.delete(resource);
    },

    body() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return body(_callService, account_id, message_id);
    },

    flags() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return flags(_callService, account_id, message_id);
    },

    folders() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return folders(_callService, account_id, message_id);
    },

    headers() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return headers(_callService, account_id, message_id);
    },

    source() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return source(_callService, account_id, message_id);
    },

    thread() {
      if(!message_id) {
        throw new Error("Missing required parameter message_id");
      }

      return thread(_callService, account_id, message_id);
    }

  }

});
