'use strict'

var libraryVersion = require(__dirname + '/../package.json').version
var request = require('request-promise')
var bluebird = require('bluebird')

// Service used to make all API calls. Must be instantiated with a version and consumer creds.
module.exports = function (version, settings) {
  if (!version) {
    throw new Error('Context.IO CallService must be instantiated with a context.io api version.')
  }

  if (!settings || !(settings.secret && settings.key)) {
    throw new Error("Context.IO CallService must be instantiated with oauth attributes 'key' and 'secret'.")
  }

  var apiBase = 'https://api.context.io/' + version + '/'

  var oauth = {
    consumer_key: settings.key,
    consumer_secret: settings.secret
  }

  // Debugging settings
  // Returns a promise that resolves to the data being passed to request-promise
  if (settings.debug === true) {
    request = function (data) {
      return bluebird.resolve(JSON.stringify(data))
    }
  }

  return {
    // Boilerplate helper
    sendRequest(options) {
      // Check to see if this is a full resource url
      if (options.url.indexOf(apiBase) === -1) {
        options.url = apiBase + options.url
      }

      options.oauth = oauth
      options.headers = {'User-Agent': 'Context.IO Node Client v' + libraryVersion}
      return request(options)
    },

    // Main get funciton. Params are added as querystring params.
    get(url, params) {
      var options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(function (body) {
        return JSON.parse(body)
      })
    },

    // File get, returns headers and the body.
    getFile(url, params) {
      var options = {
        url: url,
        qs: params,
        resolveWithFullResponse: true,
        encoding: null
      }

      return this.sendRequest(options).then(function (res) {
        var filename = res.headers['content-disposition'].split('=')[1].slice(1, -1)

        return {
          filename: filename,
          headers: res.headers,
          body: res.body
        }
      })
    },

    // Return raw response, no parsing.
    getRaw(url, params) {
      var options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(function (body) {
        return body
      })
    },

    // Post. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    post(url, body, params) {
      var options = {
        url: url,
        method: 'POST',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(function (body) {
        return JSON.parse(body)
      })
    },

    // Put. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    put(url, body, params) {
      var options = {
        url: url,
        method: 'PUT',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(function (body) {
        return JSON.parse(body)
      })
    },

    // Delete. Params are added as querystring params.
    delete(url, params) {
      var options = {
        url: url,
        method: 'DELETE',
        qs: params
      }

      return this.sendRequest(options).then(function (body) {
        return JSON.parse(body)
      })
    }

  }
}
