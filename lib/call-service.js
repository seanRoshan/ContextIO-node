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

    get(url, params) {
      var options = {
        url: apiBase + url,
        oauth: oauth,
        qs: params
      }

      return request(options)
      .then(function(body) {
        return JSON.parse(body);
      });
    }

    getFile(url, params) {
        var options = {
        url: apiBase + url,
        oauth: oauth,
        qs: params,
        resolveWithFullResponse: true
      }

      return request(options)
      .then(function(res) {
        return {headers: res.headers, body: res.body};
      });
    }

    getRaw(url, params) {
            var options = {
        url: apiBase + url,
        oauth: oauth,
        qs: params
      }

      return request(options)
      .then(function(body) {
        return body;
      });
    }

    post(url, body, params) {
      var options = {
        method: 'POST',
        url: apiBase + url,
        oauth: oauth,
        form: body,
        qs: params
      }

      return request(options)
      .then(function(body) {
        return JSON.parse(body);
      });
    }

    delete(url, params) {
      var options = {
        method: 'DELETE',
        url: apiBase + url,
        oauth: oauth,
        qs: params
      }

      return request(options)
      .then(function(body) {
        return JSON.parse(body);
      });
    }

  }();

});
