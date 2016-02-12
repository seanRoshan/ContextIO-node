"use strict";
var connect_tokens = requre('./connect_tokens');

module.exports = (function(_callService, user_id) {
  var resource = 'users/';
  if (user_id) { resource += user_id + '/'; }

  return {
    get(params) {
      return _callService.get(resource, params);
    },

    post(params) {
      return _callService.get(resource, params);
    },


  }

});
