"use strict";
var request = require('request-promise');

// Service used to make all API calls. Must be instantiated with a version and consumer creds.
// Functions always return a promise, and the response will be parsed as JSON except for getFile() and getRaw().
module.exports = (function(version, settings) {

  // Private Members
  var apiBase = "https://api.context.io/"
  var oauth
  var options

  // Public class CallService
  return new class {
    constructor() {

      if(!version) {
        throw new Error("Context.IO CallService must be instantiated with a context.io api version.")
      }

      if(!settings || !(settings.secret && settings.key)) {
        throw new Error("Context.IO CallService must be instantiated with oauth attributes 'key' and 'secret'.")
      }

      apiBase = apiBase + version + '/'

      oauth = {
        consumer_key: settings.key,
        consumer_secret: settings.secret
      }

      options = {
        oauth: oauth,
        "User-Agent": 'C.IO Node Client'
      }
    }

    //Main get funciton. Params are added as querystring params.
    get(url, params) {
      options.url = apiBase + url
      options.qs = params

      return request(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //File get, returns headers and the body.
    getFile(url, params) {
      options.url = apiBase + url
      options.qs = params
      options.resolveWithFullResponse = true

      return request(options).then(function(res) {
        return { headers: res.headers, body: res.body }
      })
    }

    //Return raw response, no JSON parsing.
    getRaw(url, params) {
      options.url = apiBase + url
      options.qs = params

      return request(options).then(function(body) {
        return body
      })
    }

    //Post. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    post(url, body, params) {
      options.url = apiBase + url
      options.method = 'POST'
      options.qs = params
      options.form = body

      return request(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //Put. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    put(url, body, params) {
      options.url = apiBase + url
      options.method = 'PUT'
      options.qs = params
      options.form = body

      return request(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //Delete. Params are added as querystring params.
    delete(url, params) {
      options.url = apiBase + url
      options.method = 'DELETE'
      options.qs = params

      return request(options).then(function(body) {
        return JSON.parse(body)
      })
    }

  }()

})
