"use strict"

var callService = require('../call-service')

//lite endpoints.
module.exports = (function(settings) {

  //Private Members
  var _callService

  //Public functions
  return new class {

    constructor() {
      if(!settings || !(settings.secret && settings.key)) {
        throw new Error("Oauth attribues 'secret' and 'key' are both required")
      }

      //Instantiate our callService
      _callService = new callService('lite', settings)
    }

    //Users
    users(user_id) {
      var resource = user_id ? 'users/' + encodeURIComponent(user_id) + '/' : 'users/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource),

        //Connect Tokens
        connect_tokens(token) {
          resource += token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        },

        //Email Accounts
        email_accounts(label) {
          resource += label ? 'email_accounts/' + encodeURIComponent(label) + '/' : 'email_accounts/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource),

            //Folders
            folders(folder) {
              resource += folder ? 'folders/' + encodeURIComponent(folder) + '/' : 'folders/'

              return {
                get: _callService.get.bind(this, resource),
                post: _callService.post.bind(this, resource),

                //Messages
                messages(message_id) {
                  resource += message_id ? 'messages/' + encodeURIComponent(message_id) + '/' : 'messages/'

                  return {
                    get: _callService.get.bind(this, resource),
                    put: _callService.put.bind(this, resource),

                    //Attachements
                    attachements(attachment_id) {
                      resource += attachment_id ? 'attachements/' + encodeURIComponent(attachements) + '/' : 'messages/'

                      return {
                        get: _callService.get.bind(this, resource)
                      }
                    },

                    //Body
                    body() {
                      resource += 'body/'

                      return {
                        get: _callService.get.bind(this, resource)
                      }
                    },

                    //Flags
                    flags() {
                      resource += 'flags/'

                      return {
                        get: _callService.get.bind(this, resource)
                      }
                    },

                    //Headers
                    headers() {
                      resource += 'headers/'

                      return {
                        get: _callService.get.bind(this, resource)
                      }
                    },

                    //Raw
                    raw() {
                      resource += 'raw/'

                      return {
                        get: _callService.get.bind(this, resource)
                      }
                    },

                    //Read
                    read() {
                      resource += 'read/'

                      return {
                        post: _callService.post.bind(this, resource),
                        delete: _callService.delete.bind(this, resource)
                      }
                    },
                  }
                }
              }
            }
          }
        },

        //Webhooks
        webhooks(webhook_id) {
          resource += webhook_id ? 'webhooks/' + encodeURIComponent(webhook_id) + '/' : 'webhooks/'

          return {
            get: _callService.get.bind(this, resource),
            post: _callService.post.bind(this, resource),
            delete: _callService.delete.bind(this, resource)
          }
        }
      }
    }

    //Connect Tokens
    connect_tokens(token) {
      var resource = token ? 'connect_tokens/' + encodeURIComponent(token) + '/' : 'connect_tokens/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

    //Discovery
    discovery() {
      return {
        get: _callService.get.bind(this, 'discovery/')
      }
    }

    //OAuth Providers
    oauth_providers(key) {
      var resource = key ? 'oauth_providers/' + encodeURIComponent(key) + '/' : 'oauth_providers/'

      return {
        get: _callService.get.bind(this, resource),
        post: _callService.post.bind(this, resource),
        delete: _callService.delete.bind(this, resource)
      }
    }

  }()

})
