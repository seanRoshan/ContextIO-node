"use strict";
var request = require('request-promise')
var bluebird = require('bluebird')

// Service used to make all API calls. Must be instantiated with a version and consumer creds.
module.exports = (function(version, settings) {

  // Private Members
  var apiBase = "https://api.context.io/"
  var oauth

  // Public Constructor
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

      //Super secret testing mock function
      //Returns a promise that resolves to the data being passed to request-promise
      if(settings.testing === true) {

        request = function (data) {
          return bluebird.resolve(JSON.stringify(data))
        }
      }

    }

    sendRequest(options) {
      options.url = apiBase + options.url
      options.oauth = oauth
      options["User-Agent"] = 'Context.IO Node Client v0.6.0'
      return request(options)
    }

    //HTTP Functions always return a promise, and the response will be parsed as JSON except for getFile() and getRaw().

    //Main get funciton. Params are added as querystring params.
    get(url, params) {
      var options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //File get, returns headers and the body.
    getFile(url, params) {
      var options = {
        url: url,
        qs: params,
        resolveWithFullResponse: true
      }

      return this.sendRequest(options).then(function(res) {
        return { headers: res.headers, body: res.body }
      })
    }

    //Return raw response, no parsing.
    getRaw(url, params) {
      var options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(function(body) {
        return body
      })
    }

    //Post. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    post(url, body, params) {
      var options = {
        url: url,
        method: 'POST',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //Put. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    put(url, body, params) {
      var options = {
        url: url,
        method: 'PUT',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(function(body) {
        return JSON.parse(body)
      })
    }

    //Delete. Params are added as querystring params.
    delete(url, params) {
      var options = {
        url: url,
        method: 'DELETE',
        qs: params
      }
      
      return this.sendRequest(options).then(function(body) {
        return JSON.parse(body)
      })
    }

  }

})
