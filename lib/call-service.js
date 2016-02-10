"use strict";
var request = require('request-promise');

module.exports = (function(version, consumer) {
  // Private Members
  var apiBase = "https://api.context.io/";
  var oauth;

  // Public class CallService
  return new class {
    constructor() {

      if(!version) {
        throw new Error("CallService must be created with a context.io api version.")
      }

      if(!consumer || !(consumer.secret && consumer.key)) {
        throw new Error("Missing required consumer attribute with 'key' and 'secret' properties.");
      }

      apiBase = apiBase + version + '/'
      oauth = {
        consumer_key: consumer.key,
        consumer_secret: consumer.secret
      };
    }

    doCall(url) {
      console.log(apiBase + url)
      return request({url: apiBase + url, oauth: oauth});
    }

  }();

});
