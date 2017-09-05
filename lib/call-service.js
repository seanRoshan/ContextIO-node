// http lib, assigned with let for debugging override
let request = require('request-promise')

// used for debugging
const bluebird = require('bluebird')

// lib version is added to the user-agent
const libraryVersion = require(__dirname + '/../package.json').version

// Service used to make all API calls. Must be instantiated with a version and consumer creds.
const CallService = (version, settings) => {
  if (!version) {
    throw new Error('Context.IO CallService must be instantiated with a context.io api version.')
  }

  if (!settings || !(settings.secret && settings.key)) {
    throw new Error("Context.IO CallService must be instantiated with oauth attributes 'key' and 'secret'.")
  }

  const apiBase = 'https://api.context.io/' + version + '/'

  const oauth = {
    consumer_key: settings.key,
    consumer_secret: settings.secret
  }

  // Debugging settings
  // Returns a promise that resolves to the data being passed to request-promise
  if (settings.debug === true) {
    request = (data) => {
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
      options.headers = {'User-Agent': `Context.IO Node Client v${libraryVersion}`}

      return request(options)
    },

    // Main get funciton. Params are added as querystring params.
    get(url, params) {
      const options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(body => {
        return JSON.parse(body)
      })
    },

    // File get, returns headers and the body.
    getFile(url, params) {
      const options = {
        url: url,
        qs: params,
        resolveWithFullResponse: true,
        encoding: null
      }

      return this.sendRequest(options).then(res => {
        const filename = res.headers['content-disposition'].split('=')[1].slice(1, -1)

        return {
          filename: filename,
          headers: res.headers,
          body: res.body
        }
      })
    },

    // Return raw response, no parsing.
    getRaw(url, params) {
      const options = {
        url: url,
        qs: params
      }

      return this.sendRequest(options).then(body => {
        return body
      })
    },

    // Post. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    post(url, body, params) {
      const options = {
        url: url,
        method: 'POST',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(body => {
        return JSON.parse(body)
      })
    },

    // Put. Params are added as querystring params. Body is sent as application/x-www-form-urlencoded
    put(url, body, params) {
      const options = {
        url: url,
        method: 'PUT',
        qs: params,
        form: body
      }

      return this.sendRequest(options).then(body => {
        return JSON.parse(body)
      })
    },

    // Delete. Params are added as querystring params.
    delete(url, params) {
      const options = {
        url: url,
        method: 'DELETE',
        qs: params
      }

      return this.sendRequest(options).then(body => {
        return JSON.parse(body)
      })
    }
  }
}

module.exports = CallService
